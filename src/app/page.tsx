"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserSettingsTab from '@/components/calculator/UserSettingsTab';
import CategorySelection from '@/components/story/CategorySelection';
import { ActivityLevel, CalculatorData, DietType, Gender } from '@/types/calculator';
import ScientificCalorieCalculator from '@/components/ScientificCalorieCalculator';

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
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">
        Личный научный диетолог
      </h1>
      <div className="max-w-5xl mx-auto">
        <ScientificCalorieCalculator />
      </div>
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>Основано на современных научных исследованиях в области питания и метаболизма</p>
        <p className="mt-2">© {new Date().getFullYear()} Личный научный диетолог</p>
      </footer>
    </div>
  );
} 