export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Аналитика</h1>
      <p className="text-foreground/60 mb-8">
        Раздел в разработке. Скоро здесь появятся отчёты по конверсиям и
        удержанию.
      </p>

      <div className="glass rounded-2xl p-16 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">📈</span>
        </div>
        <h3 className="text-xl font-bold mb-2">Готовим дашборды и метрики</h3>
        <p className="text-foreground/60">
          Здесь появится прогресс-бар, графики и сводки по вашим кампаниям.
        </p>
      </div>
    </div>
  );
}
