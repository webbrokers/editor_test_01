# Loyalty Admin Panel

Панель администрирования для построения и хранения сценариев лояльности на основе узлов (React Flow). Проект создан на Next.js 16 с поддержкой светлой/тёмной тем, Tailwind CSS 4 и Zustand.

## Возможности
- Конструктор кампаний: узлы кампании, аудитории, фильтров, действий и рекламных блоков.
- Drag-and-drop с привязкой к сетке, мультивыделение, мини-карта, управление через панель свойств.
- Шаблоны графов для быстрого старта, авто-сохранение в `localStorage`.
- Переключение светлой/тёмной темы (по умолчанию — светлая).
- Разделы: кампании (список/удаление/переход в редактор), аналитика и настройки (заглушки).

## Запуск
```bash
npm install
npm run dev
```
Открывайте http://localhost:3000

## Структура
- `app/` — страницы и лэйауты (App Router)
  - `page.tsx` — лендинг
  - `campaigns/`, `editor/[id]/`, `analytics/`, `settings/`
- `components/` — UI (Header, Sidebar, ThemeToggle, PropertiesPanel, узлы)
- `hooks/` — Zustand-хранилище редактора, хук темы
- `utils/storage.ts` — работа с `localStorage`
- `types/campaign.ts` — типы узлов/кампаний

## Стек
Next.js 16, React 19, TypeScript, Tailwind CSS 4, React Flow (@xyflow/react), Zustand, Lucide React.

## Тесты
- `npm test` — Jest + React Testing Library (jsdom)
- `npm run test:e2e` — Playwright (e2e-шаблон, требует запущенный dev-сервер)

## Дополнительно
- Кодировка UTF-8, все тексты на русском.
- Рекомендуемые расширения VS Code: ESLint, Tailwind CSS IntelliSense, Prettier.
