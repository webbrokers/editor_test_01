# Loyalty Admin Panel

Панель администрирования для построения и хранения сценариев лояльности на основе узлов (React Flow). Проект создан на Next.js 16 с поддержкой светлой/тёмной тем, Tailwind CSS 4 и Zustand.

## Возможности
- Конструктор кампаний: узлы кампании, аудитории, фильтров, действий и рекламных блоков.
- Drag-and-drop с привязкой к сетке, мультивыделение, мини-карта, управление через панель свойств.
- Шаблоны графов для быстрого старта, авто-сохранение в `localStorage`.
- Переключение светлой/тёмной темы (по умолчанию — светлая).
- Разделы: кампании (список/удаление/переход в редактор), аналитика и настройки (заглушки).

## Запуск

### Локальная разработка
```bash
npm install
npm run dev
```
Открывайте http://localhost:3000

### Сборка для GitHub Pages
```bash
npm install
npm run build
```
Статические файлы будут в папке `out/`. Загрузите содержимое этой папки в корень ветки `gh-pages` вашего репозитория или настройте GitHub Actions для автоматического деплоя.

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

## Деплой на GitHub Pages

Проект настроен для статического экспорта и готов к деплою на GitHub Pages.

### Автоматический деплой через GitHub Actions

1. Создайте файл `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. В настройках репозитория GitHub включите GitHub Pages:
   - Settings → Pages
   - Source: GitHub Actions

### Ручной деплой

1. Выполните сборку: `npm run build`
2. Скопируйте содержимое папки `out/` в корень ветки `gh-pages`
3. Или используйте GitHub CLI: `gh-pages -d out`

**Важно:** Если репозиторий не в корне GitHub (например, `username/repo-name`), раскомментируйте в `next.config.ts`:
```typescript
basePath: '/repo-name',
trailingSlash: true,
```

## Дополнительно
- Кодировка UTF-8, все тексты на русском.
- Рекомендуемые расширения VS Code: ESLint, Tailwind CSS IntelliSense, Prettier.
