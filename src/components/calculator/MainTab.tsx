"use client";

import React from 'react';

// Импортируем типы из основного компонента
import type { CalculatorData } from '@/types/calculator';

interface MainTabProps {
  data: CalculatorData;
}

const MainTab: React.FC<MainTabProps> = ({ data }) => {
  const {
    gender,
    currentWeight,
    targetWeight,
    dietType,
    bmr, tdee,
    optimalDeficitPercentage, optimalDeficit, optimalIntake,
    proteinPerKg, dailyProteinGrams,
    waterPerDay, recommendedFiber,
    refeedDay,
    totalWeeksWithBreaks,
    feedingWindow, lowCarbDays, modCarbDays, 
    carbTimingPreference, lowCarbCarbGrams, modCarbCarbGrams,
    dailyCarbGrams
  } = data;

  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-1 gap-4">
        {/* Основные рекомендации калорий */}
        <div className="p-4 rounded-lg bg-white/10 flex flex-col items-center justify-center">
          <h3 className="text-lg font-medium mb-2 text-white">Оптимальный ежедневный прием</h3>
          <div className="text-4xl font-bold text-white">{optimalIntake.toFixed(0)} ккал</div>
          <div className="text-white/70 text-sm mt-1">Дефицит: {optimalDeficit.toFixed(0)} ккал ({optimalDeficitPercentage}%)</div>
        </div>
        
        {/* TDEE и BMR */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-white/10 flex flex-col items-center justify-center">
            <div className="text-sm font-medium text-white/70 mb-1">TDEE</div>
            <div className="text-2xl font-bold text-white">{tdee.toFixed(0)}</div>
            <div className="text-xs text-white/70">ккал/день</div>
          </div>
          <div className="p-3 rounded-lg bg-white/10 flex flex-col items-center justify-center">
            <div className="text-sm font-medium text-white/70 mb-1">BMR</div>
            <div className="text-2xl font-bold text-white">{bmr.toFixed(0)}</div>
            <div className="text-xs text-white/70">ккал/день</div>
          </div>
        </div>
      </div>
      
      {/* Сравнение подходов к снижению веса */}
      <div className="p-4 rounded-lg bg-white/10">
        <h3 className="text-lg font-medium mb-3 text-white text-center">Сравнение подходов</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-center p-2 bg-white/5 rounded">
              <div className="text-sm font-medium text-white/70">Научный подход</div>
              <div className="text-lg font-bold text-white">{deficitPercentageOptimal}% дефицит</div>
            </div>
            <div className="text-center p-2 bg-white/5 rounded">
              <div className="text-xs text-white/70">Потеря мышц</div>
              <div className="text-sm font-medium text-green-400">{totalMuscleLossOptimal.toFixed(1)} кг ({muscleLossPercentageOptimal}%)</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-center p-2 bg-white/5 rounded">
              <div className="text-sm font-medium text-white/70">Быстрый подход</div>
              <div className="text-lg font-bold text-white">{deficitPercentageFast}% дефицит</div>
            </div>
            <div className="text-center p-2 bg-white/5 rounded">
              <div className="text-xs text-white/70">Потеря мышц</div>
              <div className="text-sm font-medium text-red-400">{totalMuscleLossFast.toFixed(1)} кг ({muscleLossPercentageFast}%)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTab; 