"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import type { CalculatorData } from '@/types/calculator';

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
    weightToLose
  } = data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Прогноз снижения веса</h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trajectoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" tick={{fontSize: 11}} />
                <YAxis domain={[targetWeight - 1, currentWeight + 1]} tick={{fontSize: 11}} />
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
                  name="Быстрый подход (-1000 ккал)" 
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
          <h3 className="text-lg font-medium mb-3">Состав потери веса</h3>
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
      
      <div className="mt-2 p-3 sm:p-4 bg-purple-50 rounded-md border border-purple-200">
        <h3 className="text-lg font-medium mb-2">Стратегия долгосрочного поддержания веса:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium mb-2 text-sm sm:text-base">Фаза перехода (2-4 недели)</h4>
            <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-1">
              <li>Постепенное увеличение калорий на 100 ккал каждую неделю</li>
              <li>Продолжение силовых тренировок на прежнем уровне</li>
              <li>Мониторинг веса: допустимы колебания ±1 кг</li>
              <li>Постепенное расширение окна питания при необходимости</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2 text-sm sm:text-base">Фаза поддержания (минимум 6 месяцев)</h4>
            <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-1">
              <li>Ежедневное потребление на уровне нового TDEE</li>
              <li>Отслеживание еженедельного среднего веса</li>
              <li>Корректировка калорий при изменении веса {'>'} 2 кг</li>
              <li>{gender === 'female' ? 'Учет фаз цикла при оценке веса и приеме пищи' : 'Периодизация тренировок и питания'}</li>
              <li>Поддержание высокого потребления белка ({gender === 'female' ? '1.6' : '1.8'} г/кг)</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2 text-sm sm:text-base">Долгосрочный успех (годы)</h4>
            <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-1">
              <li>Формирование устойчивых привычек в питании</li>
              <li>Регулярная физическая активность 4-5 раз в неделю</li>
              <li>Еженедельные "гибкие" приемы пищи вместо строгих ограничений</li>
              <li>Регулярный сон 7-9 часов</li>
              <li>Управление стрессом через медитацию, дыхательные техники</li>
              <li>Социальная поддержка и новая самоидентификация</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-2 p-3 sm:p-4 bg-green-50 rounded-md border border-green-200">
        <h3 className="text-lg font-medium mb-2">Научные факты о долгосрочном снижении веса:</h3>
        <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-xs sm:text-sm">
          <li><strong>Данные регистра успешного снижения веса:</strong> Люди, которые успешно поддерживают вес более 5 лет, имеют схожие привычки, независимо от пола</li>
          <li><strong>Самоконтроль:</strong> 75% успешно похудевших взвешиваются минимум раз в неделю</li>
          <li><strong>Физическая активность:</strong> В среднем 60-90 минут умеренной активности ежедневно для долгосрочного поддержания веса</li>
          <li><strong>Завтрак:</strong> 78% успешно похудевших регулярно завтракают 7 дней в неделю</li>
          <li><strong>Строгость диеты:</strong> Умеренная в будни, более гибкая в выходные (модель "80/20")</li>
          {gender === 'female' && <li><strong>Для женщин важнее:</strong> Социальная поддержка и управление эмоциональным питанием играют ключевую роль</li>}
          {gender === 'male' && <li><strong>Для мужчин важнее:</strong> Конкретные цели и регулярная оценка прогресса повышают вероятность успеха</li>}
        </ul>
      </div>
    </div>
  );
};

export default ProgressTab; 