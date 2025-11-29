'use client';

import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-lg glass flex items-center justify-center">
        <span className="text-xl">🌓</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:scale-110 transition-all duration-300 group"
      aria-label="Переключить тему"
      title={theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}
    >
      <span className="text-xl transition-transform duration-300 group-hover:rotate-180">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
