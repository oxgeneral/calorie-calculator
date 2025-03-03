import React from 'react';
import MainTab from '@/components/calculator/MainTab';
import ProgressTab from '@/components/calculator/ProgressTab';
import NutritionTab from '@/components/calculator/NutritionTab';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Вспомогательный компонент для сторис
const StoryCard: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <div className="flex flex-col items-center h-full">
      <h2 className="text-xl font-bold mb-6 text-center">{title}</h2>
      <div className="w-full flex-1 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

// Функция для получения вымышленных данных (для демонстрации)
const generateMockData = () => {
  // Вымышленные данные для калькулятора
  const mockData = {
    gender: 'male' as const,
    currentWeight: 97.3,
    targetWeight: 90,
    height: 189,
    age: 32,
    bodyFatPercentage: 29.0,
    activityLevel: 'moderate' as const,
    dietType: 'standard' as const,
    
    // Рассчитанные значения
    bmr: 2100,
    tdee: 2900,
    optimalDeficitPercentage: 20,
    optimalDeficit: 580,
    optimalIntake: 2320,
    
    // Макронутриенты
    proteinPerKg: 2.2,
    dailyProteinGrams: 214,
    proteinCalories: 856,
    dailyFatGrams: 77,
    fatCalories: 693,
    dailyCarbGrams: 193,
    carbCalories: 771,
    
    // Термический эффект пищи
    totalTEF: 174,
    proteinTEF: 86,
    carbTEF: 77,
    fatTEF: 11,
    
    // Рекомендации
    waterPerDay: 3.9,
    recommendedFiber: 38,
    refeedDay: 1400,
    
    // Прогноз и расчеты
    weightToLose: 7.3,
    scientificCaloriesPerKg: 7700,
    deficitPercentageOptimal: 20,
    deficitPercentageFast: 30,
    muscleLossPercentageOptimal: 10,
    muscleLossPercentageFast: 30,
    totalMuscleLossOptimal: 0.73,
    totalMuscleLossFast: 2.19,
    weeklyOptimalDeficitWithRefeed: 3480,
    daysToGoalWithRefeed: 158,
    weeksToGoalWithRefeed: 22.6,
    dietBreakWeeks: 2,
    totalWeeksWithBreaks: 24.6,
    chronobiologyImprovement: 15,
    improvedWeeksToGoal: 19.2,
    
    // Данные для графиков
    macroData: [
      { name: 'Белки', grams: 214, calories: 856, percent: 37 },
      { name: 'Жиры', grams: 77, calories: 693, percent: 30 },
      { name: 'Углеводы', grams: 193, calories: 771, percent: 33 },
    ],
    muscleLossData: [
      { name: 'Научный подход', fat: 6.57, muscle: 0.73 },
      { name: 'Быстрая диета', fat: 5.11, muscle: 2.19 },
    ],
    trajectoryData: [
      { week: '0', scientific: 97.3, fast: 97.3 },
      { week: '4', scientific: 95.1, fast: 94.0 },
      { week: '8', scientific: 92.9, fast: 90.7 },
      { week: '12', scientific: 90.7, fast: 87.4 },
      { week: '16', scientific: 88.5, fast: 84.1 },
      { week: '20', scientific: 86.3, fast: 80.8 },
      { week: '24', scientific: 84.1, fast: 77.5 },
    ],
    tefData: [
      { name: 'Белки', value: 86, color: '#8884d8' },
      { name: 'Углеводы', value: 77, color: '#82ca9d' },
      { name: 'Жиры', value: 11, color: '#ffc658' },
    ],
    
    // Параметры для типов диеты
    lowCarbDays: 5,
    modCarbDays: 2,
    carbTimingPreference: 'Вечером',
    feedingWindow: 8,
    lowCarbCarbGrams: 96,
    modCarbCarbGrams: 386,
    
    // Методы для обновления данных (заглушки)
    setGender: () => {},
    setCurrentWeight: () => {},
    setTargetWeight: () => {},
    setHeight: () => {},
    setAge: () => {},
    setBodyFatPercentage: () => {},
    setActivityLevel: () => {},
    setDietType: () => {},
  };
  
  return mockData;
};

// Генерация сторис для каждой категории
export const generateStories = (categoryId: string) => {
  const mockData = generateMockData();
  
  // Общие сторис для всех категорий
  const commonStories = [
    {
      id: 'intro',
      content: (
        <StoryCard title="Научный подход к снижению веса">
          <div className="text-center space-y-4">
            <p className="text-lg">
              Добро пожаловать в раздел "{getCategoryTitle(categoryId)}"
            </p>
            <p className="text-gray-300">
              Листайте вправо, чтобы узнать больше
            </p>
          </div>
        </StoryCard>
      ),
    },
  ];
  
  // Специфичные сторис в зависимости от категории
  let categoryStories: any[] = [];
  
  switch (categoryId) {
    case 'recommendations':
      categoryStories = [
        {
          id: 'calories',
          content: (
            <StoryCard title="Ваш оптимальный дефицит калорий">
              <div className="space-y-6 w-full text-center">
                <MainTab data={mockData} />
              </div>
            </StoryCard>
          ),
        },
        {
          id: 'water',
          content: (
            <StoryCard title="Рекомендации по воде и клетчатке">
              <div className="space-y-6 text-center">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="text-lg mb-2">Вода</h3>
                  <p className="text-3xl font-bold">{mockData.waterPerDay} литра</p>
                  <p className="text-sm text-gray-300 mt-1">в день</p>
                </div>
                
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="text-lg mb-2">Клетчатка</h3>
                  <p className="text-3xl font-bold">{mockData.recommendedFiber} грамм</p>
                  <p className="text-sm text-gray-300 mt-1">в день</p>
                </div>
                
                <p className="text-sm text-gray-300 mt-6">
                  Достаточное количество воды и клетчатки критически важно для здорового снижения веса
                </p>
              </div>
            </StoryCard>
          ),
        },
      ];
      break;
      
    case 'forecast':
      categoryStories = [
        {
          id: 'progress',
          content: (
            <StoryCard title="Прогноз снижения веса">
              <div className="space-y-6 w-full">
                <ProgressTab data={mockData} />
              </div>
            </StoryCard>
          ),
        },
        {
          id: 'timeline',
          content: (
            <StoryCard title="Сроки достижения цели">
              <div className="space-y-6 text-center">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="text-lg mb-2">Научный подход</h3>
                  <p className="text-3xl font-bold">{mockData.weeksToGoalWithRefeed.toFixed(1)} недель</p>
                  <p className="text-sm text-gray-300 mt-1">с минимальной потерей мышц</p>
                </div>
                
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="text-lg mb-2">Быстрый подход</h3>
                  <p className="text-3xl font-bold">{(mockData.weeksToGoalWithRefeed * 0.7).toFixed(1)} недель</p>
                  <p className="text-sm text-gray-300 mt-1">с риском потери мышц</p>
                </div>
                
                <p className="text-sm text-gray-300 mt-6">
                  Научный подход обеспечивает устойчивое снижение веса без эффекта йо-йо
                </p>
              </div>
            </StoryCard>
          ),
        },
      ];
      break;
      
    case 'macronutrients':
      categoryStories = [
        {
          id: 'macros',
          content: (
            <StoryCard title="Ваши макронутриенты">
              <div className="space-y-6 w-full">
                <NutritionTab data={mockData} />
              </div>
            </StoryCard>
          ),
        },
        {
          id: 'protein',
          content: (
            <StoryCard title="Важность белка">
              <div className="space-y-6 text-center">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="text-lg mb-2">Рекомендуемый белок</h3>
                  <p className="text-3xl font-bold">{mockData.dailyProteinGrams} грамм</p>
                  <p className="text-sm text-gray-300 mt-1">{mockData.proteinPerKg} г на кг веса</p>
                </div>
                
                <p className="text-sm text-gray-300 mt-6">
                  Высокое потребление белка защищает мышцы во время дефицита калорий 
                  и повышает термический эффект пищи
                </p>
              </div>
            </StoryCard>
          ),
        },
      ];
      break;
      
    case 'training':
      categoryStories = [
        {
          id: 'strength',
          content: (
            <StoryCard title="Силовые тренировки">
              <div className="space-y-6 text-center">
                <div className="p-4 bg-white/10 rounded-lg">
                  <p className="text-lg mb-4">
                    Силовые тренировки критически важны для сохранения мышечной массы 
                    в период снижения веса
                  </p>
                  
                  <ul className="text-left space-y-2 text-gray-300">
                    <li>• 2-3 тренировки в неделю</li>
                    <li>• Фокус на многосуставных упражнениях</li>
                    <li>• 3-4 подхода по 8-12 повторений</li>
                    <li>• Прогрессивная нагрузка</li>
                  </ul>
                </div>
              </div>
            </StoryCard>
          ),
        },
        {
          id: 'cardio',
          content: (
            <StoryCard title="Кардио тренировки">
              <div className="space-y-6 text-center">
                <div className="p-4 bg-white/10 rounded-lg">
                  <p className="text-lg mb-4">
                    Сочетание HIIT и длительных кардио тренировок дает 
                    оптимальные результаты:
                  </p>
                  
                  <ul className="text-left space-y-2 text-gray-300">
                    <li>• 1-2 HIIT тренировки (15-20 минут)</li>
                    <li>• 1-2 длительных кардио (30-45 минут)</li>
                    <li>• Минимум 7500 шагов в день</li>
                    <li>• 150+ минут активности в неделю</li>
                  </ul>
                </div>
              </div>
            </StoryCard>
          ),
        },
      ];
      break;
      
    case 'lifestyle':
      categoryStories = [
        {
          id: 'sleep',
          content: (
            <StoryCard title="Сон и снижение веса">
              <div className="space-y-6 text-center">
                <div className="p-4 bg-white/10 rounded-lg">
                  <p className="text-lg mb-4">
                    Недостаток сна серьезно мешает снижению веса:
                  </p>
                  
                  <ul className="text-left space-y-2 text-gray-300">
                    <li>• 7-9 часов сна ежедневно</li>
                    <li>• Регулярный режим сна</li>
                    <li>• Отсутствие экранов за 1 час до сна</li>
                    <li>• Темная и прохладная спальня</li>
                  </ul>
                </div>
                
                <p className="text-sm text-gray-300 mt-4">
                  Исследования показывают, что недосып на 55% снижает потерю жира 
                  и на 60% увеличивает потерю мышц
                </p>
              </div>
            </StoryCard>
          ),
        },
        {
          id: 'stress',
          content: (
            <StoryCard title="Управление стрессом">
              <div className="space-y-6 text-center">
                <div className="p-4 bg-white/10 rounded-lg">
                  <p className="text-lg mb-4">
                    Хронический стресс препятствует снижению веса:
                  </p>
                  
                  <ul className="text-left space-y-2 text-gray-300">
                    <li>• Регулярная медитация</li>
                    <li>• Глубокое дыхание</li>
                    <li>• Время на природе</li>
                    <li>• Ограничение информационного потока</li>
                    <li>• Социальная поддержка</li>
                  </ul>
                </div>
              </div>
            </StoryCard>
          ),
        },
      ];
      break;
      
    default:
      return [];
  }
  
  return [...commonStories, ...categoryStories];
};

// Вспомогательная функция для получения названия категории
function getCategoryTitle(categoryId: string): string {
  switch (categoryId) {
    case 'recommendations':
      return 'Основные рекомендации';
    case 'forecast':
      return 'Прогноз снижения веса';
    case 'macronutrients':
      return 'Макронутриенты';
    case 'training':
      return 'Тренировки';
    case 'lifestyle':
      return 'Образ жизни';
    default:
      return 'Неизвестная категория';
  }
} 