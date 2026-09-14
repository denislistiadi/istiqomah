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
import { useTheme } from '@/hooks/useTheme';
import { scrollToTop } from '@/lib/scroll';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isApiKeyPromptOpen, setIsApiKeyPromptOpen] = useState(false);
  const settings = useLiveQuery(() => db.settings.get('main'));

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
        {activeTab === 'settings' && <SettingsPage />}
      </AppShell>

      {/* Initial API Key Prompt Modal */}
      <ApiKeyPromptModal
        isOpen={isApiKeyPromptOpen}
        onClose={handleCloseApiKeyPrompt}
        onGoToSettings={handleGoToSettingsFromPrompt}
      />
    </>
  );
}

export default App;

