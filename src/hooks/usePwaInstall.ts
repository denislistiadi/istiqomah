import { useState, useEffect, useCallback } from 'react';

const SNOOZE_KEY = 'istiqomah_pwa_prompt_dismissed_until';
const SNOOZE_DURATION_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isIos, setIsIos] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  // Check standalone mode and device OS
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
        document.referrer.includes('android-app://');
      setIsStandalone(Boolean(isStandaloneMode));
      if (isStandaloneMode) {
        setIsInstalled(true);
      }
    };

    checkStandalone();

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !(window as unknown as { MSStream?: boolean }).MSStream;
    setIsIos(isIosDevice);

    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleModeChange = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches);
      if (e.matches) setIsInstalled(true);
    };

    mediaQuery.addEventListener('change', handleModeChange);
    return () => mediaQuery.removeEventListener('change', handleModeChange);
  }, []);

  // Listen to beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const isSnoozed = useCallback((): boolean => {
    try {
      const dismissedUntil = localStorage.getItem(SNOOZE_KEY);
      if (!dismissedUntil) return false;
      return Date.now() < parseInt(dismissedUntil, 10);
    } catch {
      return false;
    }
  }, []);

  const snooze = useCallback(() => {
    try {
      localStorage.setItem(SNOOZE_KEY, (Date.now() + SNOOZE_DURATION_MS).toString());
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const promptInstall = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unsupported'> => {
    if (!deferredPrompt) {
      return 'unsupported';
    }

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      return choiceResult.outcome;
    } catch {
      return 'dismissed';
    }
  }, [deferredPrompt]);

  return {
    deferredPrompt,
    isInstallable: Boolean(deferredPrompt) || (isIos && !isStandalone),
    isStandalone,
    isIos,
    isInstalled,
    isSnoozed,
    snooze,
    promptInstall,
  };
}
