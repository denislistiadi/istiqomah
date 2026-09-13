import { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { NavTab } from '@/components/layout/BottomNav';
import { HomePage } from '@/pages/HomePage';
import { QuranPage } from '@/pages/QuranPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { ensureInitialDbData } from '@/lib/db';
import { useTheme } from '@/hooks/useTheme';
import { scrollToTop } from '@/lib/scroll';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  // Initialize theme listener
  useTheme();

  useEffect(() => {
    ensureInitialDbData();
  }, []);

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    scrollToTop('smooth');
  };

  useEffect(() => {
    scrollToTop('smooth');
  }, [activeTab]);

  return (
    <AppShell activeTab={activeTab} onTabChange={handleTabChange}>
      {activeTab === 'home' && (
        <HomePage onOpenSettings={() => handleTabChange('settings')} />
      )}
      {activeTab === 'quran' && <QuranPage />}
      {activeTab === 'analytics' && <AnalyticsPage />}
      {activeTab === 'settings' && <SettingsPage />}
    </AppShell>
  );
}

export default App;
