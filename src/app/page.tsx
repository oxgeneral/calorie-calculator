import ScientificCalorieCalculator from '@/components/ScientificCalorieCalculator';

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">
        Научный калькулятор калорий для снижения веса
      </h1>
      <div className="max-w-5xl mx-auto">
        <ScientificCalorieCalculator />
      </div>
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>Основано на современных научных исследованиях в области питания и метаболизма</p>
        <p className="mt-2">© {new Date().getFullYear()} Калькулятор калорий</p>
      </footer>
    </div>
  );
} 