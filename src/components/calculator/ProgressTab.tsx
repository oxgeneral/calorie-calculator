"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import type { CalculatorData } from '@/types/calculator';

// Значения по умолчанию для полей ввода
const DEFAULT_VALUES = {
  currentWeight: 97.3,
  targetWeight: 90,
};

interface ProgressTabProps {
  data: CalculatorData;
}

const ProgressTab: React.FC<ProgressTabProps> = ({ data }) => {
  const {
    gender,
    currentWeight,
    targetWeight,
    optimalDeficitPercentage,
    totalMuscleLossOptimal,
    totalMuscleLossFast,
    trajectoryData,
    muscleLossData,
    weeksToGoalWithRefeed,
    improvedWeeksToGoal,
    weightToLose,
    weightGoal
  } = data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3">
            {weightGoal === 'loss' ? 'Прогноз снижения веса' : 'Прогноз набора веса'}
          </h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trajectoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" tick={{fontSize: 11}} />
                <YAxis 
                  domain={[
                    (targetWeight ?? DEFAULT_VALUES.targetWeight) - 1, 
                    (currentWeight ?? DEFAULT_VALUES.currentWeight) + 1
                  ]} 
                  tick={{fontSize: 11}} 
                />
                <Tooltip />
                <Legend wrapperStyle={{fontSize: 11}} />
                <Line 
                  type="monotone" 
                  dataKey="scientific" 
                  name="Научный подход с рефидами" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="fast" 
                  name={weightGoal === 'loss' ? 'Быстрый подход (-1000 ккал)' : 'Быстрый подход (+1000 ккал)'}
                  stroke="#f87171" 
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs sm:text-sm text-gray-600 mt-2">
            * График учитывает адаптивный термогенез, периодизацию диеты и диетические перерывы
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">
            {weightGoal === 'loss' ? 'Состав потери веса' : 'Состав набора веса'}
          </h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={muscleLossData} stackOffset="expand" layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value: number) => `${(value*100).toFixed(0)}%`} tick={{fontSize: 11}} />
                <YAxis type="category" dataKey="name" width={100} tick={{fontSize: 11}} />
                <Tooltip formatter={(value: number) => `${value.toFixed(1)} кг`} />
                <Legend wrapperStyle={{fontSize: 11}} />
                <Bar dataKey="fat" name="Жировая ткань" stackId="a" fill="#10b981" />
                <Bar dataKey="muscle" name="Мышечная ткань" stackId="a" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs sm:text-sm text-gray-600 mt-2">
            * На основе научных данных о сохранении мышечной массы при разных дефицитах калорий
          </div>
        </div>
      </div>
      
      <div className="mt-2 p-3 sm:p-4 bg-blue-50 rounded-md border border-blue-200">
        <h3 className="text-lg font-medium mb-2">Научное обоснование прогноза для {gender === 'female' ? 'женщин' : 'мужчин'}:</h3>
        <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-sm sm:text-base">
          {gender === 'female' ? (
            <>
              <li><strong>Более низкая скорость метаболизма:</strong> Женский организм имеет на 5-10% более низкий TDEE при одинаковом весе и росте с мужчинами</li>
              <li><strong>Гормональные колебания:</strong> Менструальный цикл может влиять на удержание воды, что приводит к "плато" на весах, не связанным с жиросжиганием</li>
              <li><strong>Потеря мышечной массы:</strong> При дефиците {optimalDeficitPercentage.toFixed(0)}% от TDEE около {totalMuscleLossOptimal.toFixed(1)} кг от потери веса приходится на мышцы</li>
              <li><strong>Адаптивный термогенез:</strong> Женский организм более чувствителен к метаболическим адаптациям, поэтому важны рефиды и диетические перерывы</li>
              <li><strong>Хронобиология:</strong> Временно-ограниченное питание с более поздним окном (11:00-19:00) может сократить время достижения цели с {weeksToGoalWithRefeed} до {improvedWeeksToGoal} недель</li>
            </>
          ) : (
            <>
              <li><strong>Адаптивный термогенез:</strong> Исследования показывают, что метаболизм снижается на 10-15% при потере 10% массы тела</li>
              <li><strong>Потеря мышечной массы:</strong> При дефиците {optimalDeficitPercentage.toFixed(0)}% от TDEE около {totalMuscleLossOptimal.toFixed(1)} кг от потери веса приходится на мышцы</li>
              <li><strong>Рефиды:</strong> Периодическое повышение калорийности до поддерживающего уровня помогает поддерживать метаболизм и уровень гормонов</li>
              <li><strong>Диетические перерывы:</strong> 7-дневные перерывы каждые 6 недель восстанавливают уровень лептина и снижают метаболическую адаптацию на 30-50%</li>
              <li><strong>Хронобиология:</strong> Временно-ограниченное питание может сократить время достижения цели с {weeksToGoalWithRefeed} до {improvedWeeksToGoal} недель</li>
            </>
          )}
        </ul>
      </div>

      <div className="mt-2 p-3 sm:p-4 bg-amber-50 rounded-md border border-amber-200">
        <h3 className="text-lg font-medium mb-2">Научные факты о {weightGoal === 'loss' ? 'долгосрочном поддержании веса' : 'наборе мышечной массы'}:</h3>
        <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-sm sm:text-base">
          {weightGoal === 'loss' ? (
            // Факты о поддержании веса
            <>
              <li><strong>Самоконтроль и мониторинг:</strong> Люди, поддерживающие вес более 5 лет, взвешиваются минимум 1 раз в неделю и ведут дневник питания</li>
              <li><strong>Физическая активность:</strong> 90% успешных случаев поддержания веса связаны с 3-5 часами умеренной активности в неделю</li>
              <li><strong>Регулярный завтрак:</strong> 78% людей, поддерживающих потерю веса, завтракают каждый день</li>
              <li><strong>Гибкость диеты:</strong> Жесткие ограничения повышают риск срывов на 60%, тогда как гибкая модель повышает успех на 39%</li>
              <li><strong>Гендерные различия:</strong> {gender === 'female' ? 'Для женщин ключевым фактором успеха является социальная поддержка' : 'Для мужчин важнейшим фактором является постановка конкретных достижимых целей'}</li>
            </>
          ) : (
            // Факты о наборе мышечной массы
            <>
              <li><strong>Темпы роста мышц:</strong> Новички могут набирать до 1-1.5% массы тела в месяц, опытные атлеты - всего 0.25-0.5%</li>
              <li><strong>Белок и синтез мышц:</strong> Распределение 20-40г белка по 4-5 приемам пищи стимулирует синтез на 25% эффективнее</li>
              <li><strong>Влияние сна:</strong> Недостаток сна (менее 6 часов) снижает синтез мышечного белка на 18-25% и повышает катаболизм</li>
              <li><strong>Прогрессивная перегрузка:</strong> Увеличение нагрузки на 2.5-5% каждые 1-2 недели оптимально стимулирует гипертрофию</li>
              <li><strong>Гендерные различия:</strong> {gender === 'female' ? 'Женщины могут тренироваться с большей частотой благодаря лучшему восстановлению и имеют преимущество в темпах роста нижней части тела' : 'Мужчины имеют преимущество в росте верхней части тела благодаря большей концентрации андрогенных рецепторов'}</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProgressTab; 