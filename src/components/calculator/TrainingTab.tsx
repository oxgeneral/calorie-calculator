"use client";

import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { CalculatorData } from '@/types/calculator';

interface TrainingTabProps {
  data: CalculatorData;
}

const TrainingTab: React.FC<TrainingTabProps> = ({ data }) => {
  const { gender } = data;
  
  // Данные для радарной диаграммы тренировок с учетом пола
  const trainingData = gender === 'female'
    ? [
        { name: 'Силовые', value: 30, fullMark: 100 },  // Меньше силовых для женщин
        { name: 'HIIT', value: 25, fullMark: 100 },     // Меньше HIIT
        { name: 'LISS', value: 25, fullMark: 100 },     // Больше LISS для женщин
        { name: 'Гибкость', value: 15, fullMark: 100 }, // Больше гибкости для женщин
        { name: 'Восстановление', value: 5, fullMark: 100 }
      ]
    : [
        { name: 'Силовые', value: 35, fullMark: 100 },
        { name: 'HIIT', value: 30, fullMark: 100 },
        { name: 'LISS', value: 20, fullMark: 100 },
        { name: 'Гибкость', value: 10, fullMark: 100 },
        { name: 'Восстановление', value: 5, fullMark: 100 }
      ];

  // Используем разные планы тренировок для мужчин и женщин
  const renderTrainingPlan = () => {
    if (gender === 'female') {
      return (
        <div className="space-y-3">
          <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
            <div className="font-medium">Понедельник: Силовая (нижняя часть тела)</div>
            <div className="text-sm text-gray-600 mt-1">
              3-4 упражнения для нижней части тела, 3-4 подхода по 8-15 повторений<br/>
              Интенсивность: 65-80% от 1ПМ, время восстановления: 60-90 сек
            </div>
          </div>
          
          <div className="p-2 bg-purple-50 rounded-md border border-purple-200">
            <div className="font-medium">Вторник: Гибкость и восстановление</div>
            <div className="text-sm text-gray-600 mt-1">
              Йога или пилатес 40-50 минут<br/>
              Фокус на развитие гибкости бедер и поясницы
            </div>
          </div>
          
          <div className="p-2 bg-green-50 rounded-md border border-green-200">
            <div className="font-medium">Среда: HIIT</div>
            <div className="text-sm text-gray-600 mt-1">
              20-25 мин интервальной тренировки (15-20 сек работы, 40-60 сек отдыха)<br/>
              Рекомендации: круговая тренировка с весом тела или легкими гантелями
            </div>
          </div>
          
          <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
            <div className="font-medium">Четверг: Силовая (верхняя часть тела)</div>
            <div className="text-sm text-gray-600 mt-1">
              3-4 упражнения для верхней части тела, 3-4 подхода по 8-15 повторений<br/>
              Интенсивность: 65-80% от 1ПМ, время восстановления: 60-90 сек
            </div>
          </div>
          
          <div className="p-2 bg-amber-50 rounded-md border border-amber-200">
            <div className="font-medium">Пятница: LISS</div>
            <div className="text-sm text-gray-600 mt-1">
              40-50 мин низкоинтенсивной кардио-активности (ходьба, эллипсоид)<br/>
              Интенсивность: 50-65% от максимального пульса
            </div>
          </div>
          
          <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
            <div className="font-medium">Суббота: Функциональная силовая</div>
            <div className="text-sm text-gray-600 mt-1">
              Комплексная тренировка с акцентом на ягодицы и кор<br/>
              3-4 упражнения, 3 подхода, средняя интенсивность
            </div>
          </div>
          
          <div className="p-2 bg-purple-50 rounded-md border border-purple-200">
            <div className="font-medium">Воскресенье: Активное восстановление</div>
            <div className="text-sm text-gray-600 mt-1">
              Легкая ходьба или стретчинг<br/>
              Фокус на восстановление и снятие напряжения
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-3">
        <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
          <div className="font-medium">Понедельник: Силовая (верх тела)</div>
          <div className="text-sm text-gray-600 mt-1">
            3-4 упражнения для верхней части тела, 3-4 подхода по 6-12 повторений<br/>
            Интенсивность: 70-85% от 1ПМ, время восстановления: 1-2 мин
          </div>
        </div>
        
        <div className="p-2 bg-green-50 rounded-md border border-green-200">
          <div className="font-medium">Вторник: HIIT</div>
          <div className="text-sm text-gray-600 mt-1">
            20-30 мин интервальной тренировки (20-30 сек работы, 60-90 сек отдыха)<br/>
            Рекомендации: велотренажер, гребля, спринты или кроссфит-элементы
          </div>
        </div>
        
        <div className="p-2 bg-purple-50 rounded-md border border-purple-200">
          <div className="font-medium">Среда: Активное восстановление</div>
          <div className="text-sm text-gray-600 mt-1">
            20-30 мин легкой активности (ходьба, йога, стретчинг)<br/>
            Фокус на гибкость и восстановление мышц
          </div>
        </div>
        
        <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
          <div className="font-medium">Четверг: Силовая (низ тела)</div>
          <div className="text-sm text-gray-600 mt-1">
            3-4 упражнения для нижней части тела, 3-4 подхода по 6-12 повторений<br/>
            Интенсивность: 70-85% от 1ПМ, время восстановления: 2-3 мин
          </div>
        </div>
        
        <div className="p-2 bg-green-50 rounded-md border border-green-200">
          <div className="font-medium">Пятница: HIIT</div>
          <div className="text-sm text-gray-600 mt-1">
            20-30 мин интервальной тренировки (20-30 сек работы, 60-90 сек отдыха)<br/>
            Рекомендации: функциональные упражнения с весом тела или легкими весами
          </div>
        </div>
        
        <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
          <div className="font-medium">Суббота: Силовая (общая)</div>
          <div className="text-sm text-gray-600 mt-1">
            Полнотелая тренировка с акцентом на многосуставные движения<br/>
            3-5 упражнений, 3 подхода, фокус на технику и прогрессию весов
          </div>
        </div>
        
        <div className="p-2 bg-amber-50 rounded-md border border-amber-200">
          <div className="font-medium">Воскресенье: LISS</div>
          <div className="text-sm text-gray-600 mt-1">
            40-60 мин низкоинтенсивной кардио-активности (ходьба, велосипед)<br/>
            Интенсивность: 50-65% от максимального пульса, разговорный темп
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Оптимальная структура тренировок</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart outerRadius={90} data={trainingData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Оптимальное распределение" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-600 mt-2 text-center">
          * Научно оптимальное распределение тренировочных модальностей для {gender === 'female' ? 'женщин' : 'мужчин'} (% от общего объема)
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Недельный план тренировок</h3>
        {renderTrainingPlan()}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200 col-span-1 md:col-span-2">
        <h3 className="text-lg font-medium mb-2">Научные принципы периодизации тренировок для {gender === 'female' ? 'женщин' : 'мужчин'}:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <ul className="list-disc pl-5 space-y-1">
              {gender === 'female' ? (
                <>
                  <li>Прогрессия нагрузки: увеличение на 2-3% каждые 1-2 недели</li>
                  <li>Волновая периодизация: учет фаз менструального цикла</li>
                  <li>Фаза фолликулярная (день 1-14): повышение интенсивности</li>
                  <li>Фаза лютеиновая (день 15-28): акцент на объем и восстановление</li>
                  <li>Недельный объем: 8-12 рабочих подходов на основные группы мышц</li>
                </>
              ) : (
                <>
                  <li>Прогрессия нагрузки: увеличение на 2.5-5% каждые 1-2 недели</li>
                  <li>Волновая периодизация: чередование недель высокой (85% 1ПМ) и средней (70% 1ПМ) интенсивности</li>
                  <li>Недельный объем: 10-15 рабочих подходов на основные группы мышц</li>
                  <li>EPOC эффект: HIIT тренировки повышают расход калорий на 6-15% в течение 24 часов</li>
                  <li>Разнообразие стимулов: смена упражнений каждые 3-4 недели для предотвращения адаптации</li>
                </>
              )}
            </ul>
          </div>
          <div>
            <p className="text-sm mb-2">
              {gender === 'female' 
                ? "Научные исследования показывают, что женщины лучше адаптируются к тренировкам с большим количеством повторений (8-15), по сравнению с мужчинами. Также женщины обычно быстрее восстанавливаются между подходами и могут выполнять больше объема тренировок."
                : "Научные исследования демонстрируют, что оптимальная программа тренировок при похудении должна включать как силовые тренировки, так и кардио разной интенсивности. Силовые тренировки критически важны для сохранения мышечной массы в условиях калорийного дефицита."
              }
            </p>
            <p className="text-sm">
              {gender === 'female'
                ? "Женский организм более чувствителен к колебаниям гормонов, поэтому периодизация тренировок с учетом менструального цикла может значительно повысить эффективность и снизить риск перетренированности."
                : "Высокоинтенсивные интервальные тренировки (HIIT) значительно повышают расход энергии после тренировки и улучшают чувствительность к инсулину, в то время как низкоинтенсивные продолжительные тренировки (LISS) минимально влияют на аппетит и помогают в активном восстановлении."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingTab; 