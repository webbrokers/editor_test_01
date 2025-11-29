import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../components/ThemeToggle';

describe('ThemeToggle', () => {
  it('переключает тему и атрибут data-theme', () => {
    render(<ThemeToggle />);

    // после маунта тема должна быть light по умолчанию
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    const button = screen.getByRole('button', { name: /переключить тему/i });
    fireEvent.click(button);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
