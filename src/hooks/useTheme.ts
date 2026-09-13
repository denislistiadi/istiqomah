import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';

export function useTheme() {
  const settings = useLiveQuery(() => db.settings.get('main'));
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    const currentThemeSetting = settings?.theme || 'dark';

    let resolvedTheme: 'dark' | 'light' = 'dark';

    if (currentThemeSetting === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      resolvedTheme = prefersDark ? 'dark' : 'light';
    } else {
      resolvedTheme = currentThemeSetting;
    }

    setActiveTheme(resolvedTheme);

    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [settings?.theme]);

  const setTheme = async (theme: 'dark' | 'light' | 'system') => {
    await db.settings.update('main', { theme });
  };

  return {
    themeSetting: settings?.theme || 'dark',
    activeTheme,
    setTheme,
  };
}
