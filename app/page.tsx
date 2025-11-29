import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Фоновые градиенты */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Основной контент */}
      <div className="relative z-10">
        {/* Навигация */}
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-glow">
                <span className="text-xl font-bold">LP</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Loyalty Program
              </span>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                Документация
              </button>
              <button className="px-6 py-2 text-sm font-semibold bg-gradient-to-r from-primary to-secondary rounded-lg hover:opacity-90 transition-all hover:scale-105 transform">
                Войти
              </button>
            </div>
          </div>
        </nav>

        {/* Герой секция */}
        <main className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full glass text-sm font-medium text-primary">
                🚀 Новая версия 2.0
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Управление
              </span>
              <br />
              <span className="text-foreground">программой лояльности</span>
            </h1>

            <p className="text-xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Создавайте сложные сценарии программы лояльности с помощью визуального редактора.
              Интуитивно понятный интерфейс для максимальной эффективности.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="group px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold text-lg hover:scale-105 transform transition-all shadow-lg shadow-primary/50 hover:shadow-primary/70">
                Начать работу
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="px-8 py-4 glass rounded-xl font-semibold text-lg hover:scale-105 transform transition-all">
                Посмотреть демо
              </button>
            </div>

            {/* Карточки возможностей */}
            <div className="grid md:grid-cols-3 gap-6 mt-20">
              <div className="glass p-8 rounded-2xl hover:scale-105 transition-transform cursor-pointer group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:animate-glow">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Визуальный редактор</h3>
                <p className="text-foreground/60 leading-relaxed">
                  Создавайте сценарии с помощью drag-and-drop интерфейса без программирования
                </p>
              </div>

              <div className="glass p-8 rounded-2xl hover:scale-105 transition-transform cursor-pointer group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4 group-hover:animate-glow">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Быстрая настройка</h3>
                <p className="text-foreground/60 leading-relaxed">
                  Запустите программу лояльности за минуты с готовыми шаблонами
                </p>
              </div>

              <div className="glass p-8 rounded-2xl hover:scale-105 transition-transform cursor-pointer group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4 group-hover:animate-glow">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Аналитика</h3>
                <p className="text-foreground/60 leading-relaxed">
                  Отслеживайте эффективность программы в реальном времени
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Футер */}
        <footer className="container mx-auto px-6 py-12 mt-20 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground/50 text-sm">
              © 2025 Loyalty Program. Все права защищены.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-foreground/50 hover:text-foreground transition-colors text-sm">
                О проекте
              </a>
              <a href="#" className="text-foreground/50 hover:text-foreground transition-colors text-sm">
                Поддержка
              </a>
              <a href="#" className="text-foreground/50 hover:text-foreground transition-colors text-sm">
                Контакты
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
