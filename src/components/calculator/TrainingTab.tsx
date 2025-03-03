"use client";

import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { CalculatorData } from '@/types/calculator';

interface TrainingTabProps {
  data: CalculatorData;
}

const TrainingTab: React.FC<TrainingTabProps> = ({ data }) => {
  const { gender, weightGoal } = data;
  
  // Данные для радарной диаграммы тренировок с учетом пола и цели
  const trainingData = weightGoal === 'loss' 
    ? (gender === 'female'
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
        ])
    : (gender === 'female'
      ? [
          { name: 'Силовые', value: 55, fullMark: 100 },  // Больше силовых для набора массы
          { name: 'HIIT', value: 10, fullMark: 100 },     // Меньше HIIT при наборе массы
          { name: 'LISS', value: 15, fullMark: 100 },     // Меньше LISS при наборе
          { name: 'Гибкость', value: 10, fullMark: 100 }, 
          { name: 'Восстановление', value: 10, fullMark: 100 } // Больше восстановления
        ]
      : [
          { name: 'Силовые', value: 65, fullMark: 100 },  // Еще больше силовых для мужчин
          { name: 'HIIT', value: 10, fullMark: 100 },     
          { name: 'LISS', value: 10, fullMark: 100 },     
          { name: 'Гибкость', value: 5, fullMark: 100 },  
          { name: 'Восстановление', value: 10, fullMark: 100 } 
        ]);

  // Используем разные планы тренировок для мужчин и женщин и разных целей
  const renderTrainingPlan = () => {
    if (weightGoal === 'loss') {
      // План для снижения веса
      if (gender === 'female') {
        return (
          // Существующий план для женщин при снижении веса
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
      } else {
        // Существующий план для мужчин при снижении веса
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
                25-30 мин интервальной тренировки (30 сек работы, 30-45 сек отдыха)<br/>
                Рекомендации: спринты на беговой дорожке, велотренажер, сочетание с весом тела
              </div>
            </div>
            
            <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
              <div className="font-medium">Среда: Силовая (нижняя часть тела)</div>
              <div className="text-sm text-gray-600 mt-1">
                4-5 упражнений для нижней части тела, 3-4 подхода по 6-12 повторений<br/>
                Интенсивность: 70-85% от 1ПМ, время восстановления: 90-120 сек
              </div>
            </div>
            
            <div className="p-2 bg-amber-50 rounded-md border border-amber-200">
              <div className="font-medium">Четверг: LISS</div>
              <div className="text-sm text-gray-600 mt-1">
                30-40 мин низкоинтенсивной кардио-активности<br/>
                Интенсивность: 50-65% от максимального пульса
              </div>
            </div>
            
            <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
              <div className="font-medium">Пятница: Силовая (все тело)</div>
              <div className="text-sm text-gray-600 mt-1">
                Комплексная тренировка на все тело, включающая основные группы мышц<br/>
                3-4 подхода на группу мышц, 8-15 повторений
              </div>
            </div>
            
            <div className="p-2 bg-green-50 rounded-md border border-green-200">
              <div className="font-medium">Суббота: HIIT</div>
              <div className="text-sm text-gray-600 mt-1">
                20-25 мин высокоинтенсивной интервальной тренировки<br/>
                Короткие, интенсивные интервалы (15-20 сек работы, 40-60 сек отдыха)
              </div>
            </div>
            
            <div className="p-2 bg-purple-50 rounded-md border border-purple-200">
              <div className="font-medium">Воскресенье: Активное восстановление</div>
              <div className="text-sm text-gray-600 mt-1">
                Легкая активность, стретчинг, массаж или плавание<br/>
                Фокус на восстановление и подготовку к следующей неделе
              </div>
            </div>
          </div>
        );
      }
    } else {
      // План для набора массы
      if (gender === 'female') {
        return (
          <div className="space-y-3">
            <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
              <div className="font-medium">Понедельник: Силовая (нижняя часть тела)</div>
              <div className="text-sm text-gray-600 mt-1">
                4-5 упражнений для нижней части тела, 3-4 подхода по 6-10 повторений<br/>
                Интенсивность: 75-85% от 1ПМ, время восстановления: 2-3 мин
              </div>
            </div>
            
            <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
              <div className="font-medium">Вторник: Силовая (верхняя часть тела - толкающие)</div>
              <div className="text-sm text-gray-600 mt-1">
                4-5 упражнений для груди и трицепсов, 3-4 подхода по 6-10 повторений<br/>
                Интенсивность: 75-85% от 1ПМ, время восстановления: 2-3 мин
              </div>
            </div>
            
            <div className="p-2 bg-purple-50 rounded-md border border-purple-200">
              <div className="font-medium">Среда: Активное восстановление</div>
              <div className="text-sm text-gray-600 mt-1">
                Легкая кардио-активность (20-30 мин) и стретчинг<br/>
                Фокус на восстановление мышц и снижение напряжения
              </div>
            </div>
            
            <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
              <div className="font-medium">Четверг: Силовая (верхняя часть тела - тянущие)</div>
              <div className="text-sm text-gray-600 mt-1">
                4-5 упражнений для спины и бицепсов, 3-4 подхода по 6-10 повторений<br/>
                Интенсивность: 75-85% от 1ПМ, время восстановления: 2-3 мин
              </div>
            </div>
            
            <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
              <div className="font-medium">Пятница: Силовая (ягодицы и плечи)</div>
              <div className="text-sm text-gray-600 mt-1">
                4-5 специализированных упражнений, 3-4 подхода по 8-12 повторений<br/>
                Акцент на качественную технику и прогрессивную нагрузку
              </div>
            </div>
            
            <div className="p-2 bg-amber-50 rounded-md border border-amber-200">
              <div className="font-medium">Суббота: LISS + легкая силовая</div>
              <div className="text-sm text-gray-600 mt-1">
                20-30 мин низкоинтенсивной кардио-активности<br/>
                Плюс легкие силовые упражнения для отстающих групп мышц
              </div>
            </div>
            
            <div className="p-2 bg-purple-50 rounded-md border border-purple-200">
              <div className="font-medium">Воскресенье: Полное восстановление</div>
              <div className="text-sm text-gray-600 mt-1">
                Пассивный отдых, стретчинг или йога<br/>
                Фокус на качественный сон и подготовку к следующей неделе
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="space-y-3">
            <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
              <div className="font-medium">Понедельник: Силовая (грудь и трицепсы)</div>
              <div className="text-sm text-gray-600 mt-1">
                5-6 упражнений для груди и трицепсов, 4-5 подходов по 6-8 повторений<br/>
                Интенсивность: 80-90% от 1ПМ, время восстановления: 2-3 мин
              </div>
            </div>
            
            <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
              <div className="font-medium">Вторник: Силовая (спина и бицепсы)</div>
              <div className="text-sm text-gray-600 mt-1">
                5-6 упражнений для спины и бицепсов, 4-5 подходов по 6-8 повторений<br/>
                Интенсивность: 80-90% от 1ПМ, время восстановления: 2-3 мин
              </div>
            </div>
            
            <div className="p-2 bg-purple-50 rounded-md border border-purple-200">
              <div className="font-medium">Среда: Активное восстановление</div>
              <div className="text-sm text-gray-600 mt-1">
                Легкая кардио-активность (20 мин) и стретчинг<br/>
                Фокус на восстановление мышц верхней части тела
              </div>
            </div>
            
            <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
              <div className="font-medium">Четверг: Силовая (ноги и плечи)</div>
              <div className="text-sm text-gray-600 mt-1">
                6-7 упражнений для ног и плеч, 4-5 подходов по 6-8 повторений<br/>
                Интенсивность: 80-90% от 1ПМ, время восстановления: 2-3 мин
              </div>
            </div>
            
            <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
              <div className="font-medium">Пятница: Силовая (руки и кор)</div>
              <div className="text-sm text-gray-600 mt-1">
                5-6 упражнений для рук и пресса, 3-4 подхода по 8-12 повторений<br/>
                Акцент на проработку мелких групп мышц и стабилизаторов
              </div>
            </div>
            
            <div className="p-2 bg-green-50 rounded-md border border-green-200">
              <div className="font-medium">Суббота: Силовая (тяжелые базовые упражнения)</div>
              <div className="text-sm text-gray-600 mt-1">
                3-4 компаундных упражнения, 5 подходов по 3-5 повторений<br/>
                Максимальная интенсивность для стимуляции гормонального отклика
              </div>
            </div>
            
            <div className="p-2 bg-purple-50 rounded-md border border-purple-200">
              <div className="font-medium">Воскресенье: Полное восстановление</div>
              <div className="text-sm text-gray-600 mt-1">
                Пассивный отдых, массаж, сауна<br/>
                Фокус на качественный сон и питание для восстановления
              </div>
            </div>
          </div>
        );
      }
    }
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
                : weightGoal === 'loss' 
                  ? "Научные исследования демонстрируют, что оптимальная программа тренировок при похудении должна включать как силовые тренировки, так и кардио разной интенсивности. Силовые тренировки критически важны для сохранения мышечной массы в условиях калорийного дефицита."
                  : "Научные исследования демонстрируют, что оптимальная программа тренировок для набора мышечной массы должна делать акцент на силовые тренировки с постепенной прогрессией нагрузки. Добавление умеренных кардиотренировок помогает улучшить восстановление и минимизировать накопление жира."
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