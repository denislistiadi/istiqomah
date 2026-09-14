import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, ensureInitialDbData } from '@/lib/db';
import { AppShell } from '@/components/layout/AppShell';
import { NavTab } from '@/components/layout/BottomNav';
import { HomePage } from '@/pages/HomePage';
import { QuranPage } from '@/pages/QuranPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { ApiKeyPromptModal } from '@/components/home/ApiKeyPromptModal';
import { PwaInstallModal } from '@/components/ui/PwaInstallModal';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { useTheme } from '@/hooks/useTheme';
import { scrollToTop } from '@/lib/scroll';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isApiKeyPromptOpen, setIsApiKeyPromptOpen] = useState(false);
  const [isPwaModalOpen, setIsPwaModalOpen] = useState(false);
  const settings = useLiveQuery(() => db.settings.get('main'));

  const {
    isInstallable,
    isStandalone,
    isIos,
    isInstalled,
    isSnoozed,
    snooze,
    promptInstall,
  } = usePwaInstall();

  // Initialize theme listener
  useTheme();

  useEffect(() => {
    ensureInitialDbData();
  }, []);

  // Show API Key prompt on initial load if not configured and not dismissed in this session
  useEffect(() => {
    if (settings && !settings.encryptedApiKey) {
      const isDismissed = sessionStorage.getItem('istiqomah_dismissed_api_prompt');
      if (!isDismissed) {
        const timer = setTimeout(() => {
          setIsApiKeyPromptOpen(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [settings]);

  // Auto-prompt PWA installation if installable, not standalone, and not snoozed
  useEffect(() => {
    if (isStandalone || isInstalled) return;
    if (isSnoozed()) return;
    if (isApiKeyPromptOpen) return;

    const timer = setTimeout(() => {
      if (!isSnoozed() && !isStandalone && (isInstallable || isIos)) {
        setIsPwaModalOpen(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isStandalone, isInstalled, isInstallable, isIos, isSnoozed, isApiKeyPromptOpen]);

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    scrollToTop('smooth');
  };

  const handleCloseApiKeyPrompt = () => {
    sessionStorage.setItem('istiqomah_dismissed_api_prompt', 'true');
    setIsApiKeyPromptOpen(false);
  };

  const handleGoToSettingsFromPrompt = () => {
    handleCloseApiKeyPrompt();
    handleTabChange('settings');
  };

  const handleClosePwaModal = () => {
    snooze();
    setIsPwaModalOpen(false);
  };

  const handleInstallPwa = async () => {
    const result = await promptInstall();
    if (result === 'accepted' || result === 'dismissed') {
      setIsPwaModalOpen(false);
    }
  };

  useEffect(() => {
    scrollToTop('smooth');
  }, [activeTab]);

  return (
    <>
      <AppShell activeTab={activeTab} onTabChange={handleTabChange}>
        {activeTab === 'home' && (
          <HomePage onOpenSettings={() => handleTabChange('settings')} />
        )}
        {activeTab === 'quran' && <QuranPage />}
        {activeTab === 'analytics' && <AnalyticsPage />}
        {activeTab === 'settings' && (
          <SettingsPage
            onOpenInstallModal={() => setIsPwaModalOpen(true)}
            isInstalled={isInstalled}
            isStandalone={isStandalone}
          />
        )}
      </AppShell>

      {/* Initial API Key Prompt Modal */}
      <ApiKeyPromptModal
        isOpen={isApiKeyPromptOpen}
        onClose={handleCloseApiKeyPrompt}
        onGoToSettings={handleGoToSettingsFromPrompt}
      />

      {/* PWA Install Modal */}
      <PwaInstallModal
        isOpen={isPwaModalOpen}
        onClose={handleClosePwaModal}
        onInstall={handleInstallPwa}
        isIos={isIos}
        isInstalled={isInstalled}
      />
    </>
  );
}

export default App;

