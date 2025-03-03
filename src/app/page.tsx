"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserSettingsTab from '@/components/calculator/UserSettingsTab';
import CategorySelection from '@/components/story/CategorySelection';
import { ActivityLevel, CalculatorData, DietType, Gender } from '@/types/calculator';

// Начальные данные для калькулятора
const initialData: CalculatorData = {
  // Базовые параметры
  gender: 'male',
  currentWeight: 97.3,
  targetWeight: 90,
  height: 189,
  age: 32,
  bodyFatPercentage: 29.0,
  activityLevel: 'moderate',
  dietType: 'standard',
  
  // Методы установки значений - будут определены в useState
  setGender: () => {},
  setCurrentWeight: () => {},
  setTargetWeight: () => {},
  setHeight: () => {},
  setAge: () => {},
  setBodyFatPercentage: () => {},
  setActivityLevel: () => {},
  setDietType: () => {},
  
  // Рассчитанные значения (будут обновлены после расчетов)
  bmr: 0,
  tdee: 0,
  optimalDeficitPercentage: 0,
  optimalDeficit: 0,
  optimalIntake: 0,
  
  // Макронутриенты
  proteinPerKg: 0,
  dailyProteinGrams: 0,
  proteinCalories: 0,
  dailyFatGrams: 0,
  fatCalories: 0,
  dailyCarbGrams: 0,
  carbCalories: 0,
  
  // Термический эффект пищи
  totalTEF: 0,
  proteinTEF: 0,
  carbTEF: 0,
  fatTEF: 0,
  
  // Рекомендации
  waterPerDay: 0,
  recommendedFiber: 0,
  refeedDay: 0,
  
  // Прогноз и расчеты
  weightToLose: 0,
  scientificCaloriesPerKg: 0,
  deficitPercentageOptimal: 0,
  deficitPercentageFast: 0,
  muscleLossPercentageOptimal: 0,
  muscleLossPercentageFast: 0,
  totalMuscleLossOptimal: 0,
  totalMuscleLossFast: 0,
  weeklyOptimalDeficitWithRefeed: 0, 
  daysToGoalWithRefeed: 0,
  weeksToGoalWithRefeed: 0,
  dietBreakWeeks: 0,
  totalWeeksWithBreaks: 0,
  chronobiologyImprovement: 0,
  improvedWeeksToGoal: 0,
  
  // Данные для графиков
  macroData: [],
  muscleLossData: [],
  trajectoryData: [],
  tefData: [],
  
  // Параметры для типов диеты
  lowCarbDays: 0,
  modCarbDays: 0,
  carbTimingPreference: '',
  feedingWindow: 0,
  lowCarbCarbGrams: 0,
  modCarbCarbGrams: 0,
};

const categories = [
  {
    id: 'recommendations',
    title: 'Основные рекомендации',
    description: 'Научно обоснованные советы для снижения веса',
    icon: '📋',
    color: '#4CAF50'
  },
  {
    id: 'forecast',
    title: 'Прогноз снижения веса',
    description: 'График снижения веса и прогнозы',
    icon: '📉',
    color: '#2196F3'
  },
  {
    id: 'macronutrients',
    title: 'Макронутриенты',
    description: 'Белки, жиры и углеводы в вашем рационе',
    icon: '🥗',
    color: '#FF9800'
  },
  {
    id: 'training',
    title: 'Тренировки',
    description: 'Физическая активность и тренировки',
    icon: '💪',
    color: '#F44336'
  },
  {
    id: 'lifestyle',
    title: 'Образ жизни',
    description: 'Сон, стресс и другие факторы',
    icon: '🌙',
    color: '#9C27B0'
  }
];

export default function Home() {
  const [setupComplete, setSetupComplete] = useState(false);
  const [calculatorData, setCalculatorData] = useState<CalculatorData>({
    ...initialData,
    setGender: (gender: Gender) => setCalculatorData(prev => ({ ...prev, gender })),
    setCurrentWeight: (currentWeight: number | null) => setCalculatorData(prev => ({ ...prev, currentWeight })),
    setTargetWeight: (targetWeight: number | null) => setCalculatorData(prev => ({ ...prev, targetWeight })),
    setHeight: (height: number | null) => setCalculatorData(prev => ({ ...prev, height })),
    setAge: (age: number | null) => setCalculatorData(prev => ({ ...prev, age })),
    setBodyFatPercentage: (bodyFatPercentage: number | null) => setCalculatorData(prev => ({ ...prev, bodyFatPercentage })),
    setActivityLevel: (activityLevel: ActivityLevel) => setCalculatorData(prev => ({ ...prev, activityLevel })),
    setDietType: (dietType: DietType) => setCalculatorData(prev => ({ ...prev, dietType })),
  });

  useEffect(() => {
    // Вычисление всех значений на основе базовых параметров
    if (calculatorData.currentWeight !== null && 
        calculatorData.targetWeight !== null && 
        calculatorData.height !== null && 
        calculatorData.age !== null && 
        calculatorData.bodyFatPercentage !== null) {
          
      // Тут сохраняем вычисления из ScientificCalorieCalculator
      // Для примера я опустил детализацию вычислений, которые будут сохранены 
      // в полной реализации из существующего компонента
    }
  }, [
    calculatorData.gender,
    calculatorData.currentWeight,
    calculatorData.targetWeight,
    calculatorData.height,
    calculatorData.age,
    calculatorData.bodyFatPercentage,
    calculatorData.activityLevel,
    calculatorData.dietType
  ]);

  // Функция для завершения настройки и перехода к выбору категорий
  const completeSetup = () => {
    setSetupComplete(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {!setupComplete ? (
        // Страница настроек
        <div className="p-4 pb-16">
          <h1 className="text-2xl font-bold mb-6 text-center">Худей научно</h1>
          <p className="text-center mb-8 text-white/70">
            Введите ваши параметры для персонализированных рекомендаций
          </p>
          <UserSettingsTab data={calculatorData} />
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={completeSetup}
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Сохранить и продолжить
            </button>
          </div>
        </div>
      ) : (
        // Страница выбора категорий
        <CategorySelection categories={categories} />
      )}
    </div>
  );
} 