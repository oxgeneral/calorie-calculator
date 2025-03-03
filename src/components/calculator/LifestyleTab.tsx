"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { CalculatorData } from '@/types/calculator';

interface LifestyleTabProps {
  data: CalculatorData;
}

const LifestyleTab: React.FC<LifestyleTabProps> = ({ data }) => {
  const {
    gender,
    waterPerDay,
    tefData,
    totalTEF,
    dietType,
    feedingWindow,
    carbTimingPreference,
    weightGoal
  } = data;

  // Определение рекомендуемого временного окна для типа диеты
  const getFeedingWindowTime = () => {
    if (weightGoal === 'loss') {
      if (dietType === "if") {
        return gender === "male" ? "12:00 - 20:00" : "11:00 - 19:00";
      } else {
        return gender === "male" ? "10:00 - 18:00" : "9:00 - 19:00";
      }
    } else {
      // Для набора массы - более широкое окно питания
      return gender === "male" ? "8:00 - 22:00" : "8:00 - 20:00";
    }
  };
  
  // Визуальное отображение окна питания (ширина и положение)
  const getFeedingWindowStyle = () => {
    if (weightGoal === 'loss') {
      if (dietType === "if") {
        return { left: "50%", width: "33%" };
      } else {
        return { 
          left: gender === "male" ? "33%" : "29%", 
          width: gender === "male" ? "42%" : "50%" 
        };
      }
    } else {
      // Для набора массы - более широкое окно
      return { 
        left: gender === "male" ? "25%" : "25%", 
        width: gender === "male" ? "60%" : "55%" 
      };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Термический эффект пищи (TEF)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={tefData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              dataKey="value"
              labelLine={false}
              label={({name, value}) => `${name}: ${value} ккал`}
            >
              {tefData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-2 text-center">
          <p className="font-medium">Общий эффект: {totalTEF} ккал/день</p>
          <p className="text-sm text-gray-600">Дополнительный расход энергии на переваривание пищи</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Оптимизация образа жизни для {gender === 'female' ? 'женщин' : 'мужчин'} ({weightGoal === 'loss' ? 'снижение веса' : 'набор массы'})</h3>
        <div className="space-y-4">
          <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
            <div className="font-medium">Хронобиология питания</div>
            <div className="text-sm mt-1">
              Окно питания: <strong>
                {weightGoal === 'loss' 
                 ? (dietType === "if" 
                    ? "8 часов (16:8)" 
                    : (gender === "male" ? "8-10" : "10-12") + " часов")
                 : (gender === "male" ? "12-14" : "10-12") + " часов"}
              </strong>
            </div>
            <div className="text-sm text-gray-600">
              {weightGoal === 'loss'
                ? (dietType === "if" 
                   ? "Интервальное голодание помогает улучшить чувствительность к инсулину и способствует аутофагии" 
                   : "Может повысить эффективность метаболизма на 5-15%")
                : "Более широкое окно питания обеспечивает достаточное количество энергии для роста мышц"}
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-700">Рекомендуемое окно:</p>
              <div className="w-full bg-gray-200 h-6 mt-1 rounded-md relative">
                <div className="absolute inset-0 flex items-center justify-between px-2 text-xs">
                  <span>6:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>24:00</span>
                </div>
                <div 
                  className="absolute h-full bg-blue-300 rounded-md" 
                  style={getFeedingWindowStyle()}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                  {getFeedingWindowTime()}
                </div>
              </div>
            </div>
            
            {weightGoal === 'loss' && dietType === "carb-backloading" && (
              <div className="mt-2 text-sm bg-yellow-50 p-2 rounded-md">
                <p className="font-medium">Углеводная загрузка вечером:</p>
                <p>Сосредоточьте 70-80% углеводов во второй половине окна питания (после 16:00)</p>
              </div>
            )}
            
            {weightGoal === 'gain' && (
              <div className="mt-2 text-sm bg-green-50 p-2 rounded-md">
                <p className="font-medium">Оптимальное распределение приемов пищи:</p>
                <p>4-6 приемов пищи в день, включая приемы до и после тренировки, а также прием белка перед сном</p>
              </div>
            )}
          </div>
          
          <div className="p-3 bg-green-50 rounded-md border border-green-200">
            <div className="font-medium">Гидратация</div>
            <div className="text-sm mt-1">Рекомендуемое потребление воды: <strong>{weightGoal === 'gain' ? (waterPerDay + 0.5) : waterPerDay} л/день</strong></div>
            <div className="text-sm text-gray-600">
              {weightGoal === 'loss'
                ? "Может увеличить термогенез на 24-30% в течение часа после потребления"
                : "Важно для транспорта питательных веществ, синтеза белка и восстановления"}
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-700">Рекомендуемый график питья:</p>
              {weightGoal === 'loss' ? (
                <div>
                  <div className="grid grid-cols-4 gap-1 mt-1">
                    <div className="p-1 bg-blue-100 rounded text-xs text-center">500мл при пробуждении</div>
                    <div className="p-1 bg-blue-100 rounded text-xs text-center">500мл до обеда</div>
                    <div className="p-1 bg-blue-100 rounded text-xs text-center">500мл после обеда</div>
                    <div className="p-1 bg-blue-100 rounded text-xs text-center">500мл вечером</div>
                  </div>
                  <div className="grid grid-cols-4 gap-1 mt-1">
                    <div className="p-1 bg-blue-100 rounded text-xs text-center">300мл до завтрака</div>
                    <div className="p-1 bg-blue-100 rounded text-xs text-center">300мл между приемами пищи</div>
                    <div className="p-1 bg-blue-100 rounded text-xs text-center">300мл перед тренировкой</div>
                    <div className="p-1 bg-blue-100 rounded text-xs text-center">300мл после тренировки</div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-4 gap-1 mt-1">
                    <div className="p-1 bg-blue-100 rounded text-xs text-center">500мл при пробуждении</div>
                    <div className="p-1 bg-blue-100 rounded text-xs text-center">500мл до обеда</div>
                    <div className="p-1 bg-blue-100 rounded text-xs text-center">500мл после обеда</div>
                    <div className="p-1 bg-blue-100 rounded text-xs text-center">500мл вечером</div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 mt-1">
                    <div className="p-1 bg-blue-100 rounded text-xs text-center">400мл с каждым приемом пищи</div>
                    <div className="p-1 bg-blue-100 rounded text-xs text-center">800мл во время тренировки</div>
                    <div className="p-1 bg-blue-100 rounded text-xs text-center">500мл после тренировки</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-3 bg-purple-50 rounded-md border border-purple-200">
            <div className="font-medium">Качество сна</div>
            <div className="text-sm mt-1">Рекомендуемая продолжительность: <strong>{weightGoal === 'gain' ? '8-10' : '7-9'} часов</strong></div>
            <div className="text-sm text-gray-600">
              {weightGoal === 'loss'
                ? (gender === 'female'
                   ? 'Недостаток сна может нарушить гормональный баланс и усилить тягу к углеводам на 30-45%'
                   : 'Недостаток сна может увеличить потерю мышц на 60-70% и снизить уровень тестостерона')
                : 'Во время сна происходит синтез белка и секреция гормона роста. Недостаток сна на 20-30% снижает анаболический ответ.'
              }
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-700">Влияние сна на гормоны:</p>
              <div className="grid grid-cols-2 gap-1 mt-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  <span className="text-xs">↑ {gender === 'female' ? 'Прогестерон, серотонин' : 'Тестостерон, гормон роста'}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                  <span className="text-xs">↓ Кортизол, грелин</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  <span className="text-xs">↑ Лептин, адипонектин</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                  <span className="text-xs">↓ Инсулинорезистентность</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 col-span-1 md:col-span-2">
        <h3 className="text-lg font-medium mb-3">Психологические аспекты {weightGoal === 'loss' ? 'похудения' : 'набора массы'} для {gender === 'female' ? 'женщин' : 'мужчин'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-amber-50 rounded-md border border-amber-200">
            <div className="font-medium">Когнитивные стратегии</div>
            <ul className="list-disc pl-5 mt-1 text-sm">
              {weightGoal === 'loss' ? (
                gender === 'female' ? (
                  <>
                    <li>Реалистичные цели (не более 0.5-0.7% от веса тела в неделю)</li>
                    <li>Фокус на здоровье и самочувствие, а не только на числе на весах</li>
                    <li>Практика позитивного отношения к телу и принятия себя</li>
                    <li>Отслеживание нескольких показателей: энергия, настроение, сон</li>
                  </>
                ) : (
                  <>
                    <li>Реалистичные цели (не более 1% от веса тела в неделю)</li>
                    <li>Фокус на процессе, а не только результате</li>
                    <li>Развитие внутренней, а не внешней мотивации</li>
                    <li>Отслеживание прогресса в разных метриках (не только вес)</li>
                  </>
                )
              ) : (
                gender === 'female' ? (
                  <>
                    <li>Реалистичные ожидания (0.2-0.5кг мышц в месяц)</li>
                    <li>Фокус на прогрессе в силовых показателях, а не только весе</li>
                    <li>Мониторинг изменений телосложения, а не только веса</li>
                    <li>Развитие уверенности через прогрессирующие тренировки</li>
                  </>
                ) : (
                  <>
                    <li>Реалистичные ожидания (0.5-1кг мышц в месяц)</li>
                    <li>Фокус на силовой прогресс и объемные показатели</li>
                    <li>Ведение дневника тренировок для видимого прогресса</li>
                    <li>Оценка изменений тела через фото, а не только вес</li>
                  </>
                )
              )}
            </ul>
          </div>
          
          <div className="p-3 bg-amber-50 rounded-md border border-amber-200">
            <div className="font-medium">Стратегии управления стрессом</div>
            <ul className="list-disc pl-5 mt-1 text-sm">
              {weightGoal === 'loss' ? (
                gender === 'female' ? (
                  <>
                    <li>Практика осознанного питания для снижения эмоционального переедания</li>
                    <li>Техники глубокого дыхания (4-7-8 метод)</li>
                    <li>Йога и медитация для снижения уровня кортизола</li>
                    <li>Социальная поддержка от единомышленников</li>
                  </>
                ) : (
                  <>
                    <li>Практика осознанности и медитации (5-10 мин/день)</li>
                    <li>Техники глубокого дыхания (4-7-8 метод)</li>
                    <li>Регулярная физическая активность</li>
                    <li>Достаточный сон (7-9 часов/ночь)</li>
                  </>
                )
              ) : (
                <>
                  <li>Оптимизация восстановления между тренировками</li>
                  <li>Техники глубокой релаксации для снижения кортизола</li>
                  <li>Планирование периодов низкой интенсивности тренировок</li>
                  <li>Оптимизация сна (8-10 часов) для максимального анаболизма</li>
                </>
              )}
            </ul>
          </div>
          
          <div className="p-3 bg-amber-50 rounded-md border border-amber-200">
            <div className="font-medium">{weightGoal === 'loss' ? 'Устойчивое изменение пищевого поведения' : 'Психологические аспекты гипертрофии'}</div>
            <ul className="list-disc pl-5 mt-1 text-sm">
              {weightGoal === 'loss' ? (
                <>
                  <li>Постепенные изменения вместо радикальных</li>
                  <li>Осознанное питание (без отвлечений)</li>
                  <li>Планирование приемов пищи заранее</li>
                  <li>Баланс между строгостью и гибкостью (80/20 принцип)</li>
                  {gender === 'female' && <li>Учет гормональных изменений в течение цикла</li>}
                </>
              ) : (
                <>
                  <li>Развитие ритуалов пре-тренировочной подготовки</li>
                  <li>Визуализация роста мышц во время тренировки</li>
                  <li>Фокус на мышечно-нервной связи при выполнении упражнений</li>
                  <li>Позитивное восприятие увеличения веса как прогресса</li>
                  {gender === 'female' && <li>Работа над стереотипами о "женственности" и мышечной массе</li>}
                </>
              )}
            </ul>
          </div>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-md border border-blue-200 mt-4">
          <h3 className="text-lg font-medium mb-2">Научно обоснованные добавки для {gender === 'female' ? 'женщин' : 'мужчин'} ({weightGoal === 'loss' ? 'снижение веса' : 'набор массы'}):</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <ul className="list-disc pl-5 space-y-1">
                {weightGoal === 'loss' ? (
                  gender === 'female' ? (
                    <>
                      <li><strong>Железо:</strong> 18мг/день (при низком уровне ферритина)</li>
                      <li><strong>Омега-3:</strong> 1.5-3г EPA+DHA в день для контроля воспаления</li>
                      <li><strong>Витамин D:</strong> 2000-5000 МЕ/день при дефиците</li>
                      <li><strong>Магний:</strong> 300-400 мг/день (глицинат или цитрат)</li>
                      <li><strong>Витамин B6:</strong> 50-100 мг/день для гормонального баланса</li>
                      <li><strong>Кальций:</strong> 1000-1200 мг/день для здоровья костей</li>
                    </>
                  ) : (
                    <>
                      <li><strong>Креатин моногидрат:</strong> 5г/день</li>
                      <li><strong>Кофеин:</strong> 3-6 мг/кг веса тела (300-600 мг/день)</li>
                      <li><strong>Омега-3 жирные кислоты:</strong> 2-4г EPA+DHA в день</li>
                      <li><strong>Витамин D:</strong> 2000-5000 МЕ/день при дефиците</li>
                      <li><strong>Магний:</strong> 200-400 мг/день (глицинат или цитрат)</li>
                      <li><strong>L-карнитин:</strong> 2-4г/день (особенно для вегетарианцев)</li>
                    </>
                  )
                ) : (
                  gender === 'female' ? (
                    <>
                      <li><strong>Креатин моногидрат:</strong> 3-5г/день (особенно эффективен для женщин)</li>
                      <li><strong>Протеин:</strong> 25-30г сывороточного после тренировки, 20-30г казеина перед сном</li>
                      <li><strong>Железо:</strong> 18-27мг/день (при низком уровне ферритина)</li>
                      <li><strong>Витамин D3:</strong> 2000-5000 МЕ/день с K2 (100-200мкг)</li>
                      <li><strong>ZMA:</strong> Цинк (15-30мг) + Магний (300-400мг) + B6 вечером</li>
                      <li><strong>Омега-3:</strong> 2-3г EPA+DHA для оптимизации гормонального фона</li>
                    </>
                  ) : (
                    <>
                      <li><strong>Креатин моногидрат:</strong> 5г/день (без загрузочной фазы)</li>
                      <li><strong>Бета-аланин:</strong> 3-5г/день для увеличения работоспособности</li>
                      <li><strong>Протеин:</strong> 30-40г сывороточного после тренировки, 30-40г казеина перед сном</li>
                      <li><strong>Цитруллин малат:</strong> 6-8г перед тренировкой</li>
                      <li><strong>ZMA:</strong> Цинк (30мг) + Магний (450мг) + B6 перед сном</li>
                      <li><strong>Витамин D3:</strong> 2000-5000 МЕ/день с K2 (100-200мкг)</li>
                    </>
                  )
                )}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">{weightGoal === 'loss' ? 'Добавки второго уровня' : 'Дополнительные эргогенные добавки'}:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {weightGoal === 'loss' ? (
                  <>
                    <li><strong>Зеленый чай:</strong> 500-1000 мг экстракта для усиления метаболизма</li>
                    <li><strong>Протеиновый порошок:</strong> 20-30 г в качестве удобного источника белка</li>
                    <li><strong>Пробиотики:</strong> 10-20 млрд КОЕ для здоровья микробиома</li>
                    <li><strong>Глюкоманнан:</strong> 1-3 г перед едой для контроля аппетита</li>
                    <li><strong>5-HTP:</strong> 50-100 мг для контроля тяги к углеводам (по назначению)</li>
                    <li><strong>Альфа-липоевая кислота:</strong> 600-1200 мг/день для метаболизма глюкозы</li>
                  </>
                ) : (
                  <>
                    <li><strong>L-цитруллин:</strong> 6-8г перед тренировкой для усиления насоса</li>
                    <li><strong>EAA/BCAA:</strong> 5-10г во время тренировки при тренировке натощак</li>
                    <li><strong>HMB:</strong> 3г/день для начинающих атлетов</li>
                    <li><strong>Бета-экдистерон:</strong> 500мг/день для экспериментирующих</li>
                    <li><strong>Эссенциальные аминокислоты:</strong> 10-15г до/во время тренировки</li>
                    <li><strong>Трибулус:</strong> 500-1500мг/день для поддержки гормонального фона</li>
                  </>
                )}
              </ul>
              
              <h4 className="font-medium mt-3 mb-1">Добавки для восстановления:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {weightGoal === 'loss' ? (
                  <>
                    <li><strong>Куркумин:</strong> 500-1000 мг с пиперином для уменьшения воспаления</li>
                    <li><strong>Таурин:</strong> 1-2 г для восстановления после тренировок</li>
                    <li><strong>L-глютамин:</strong> 5-10 г для иммунитета и восстановления</li>
                  </>
                ) : (
                  <>
                    <li><strong>Куркумин:</strong> 1000-2000 мг с пиперином для уменьшения воспаления</li>
                    <li><strong>L-глютамин:</strong> 10-15 г/день для восстановления и иммунитета</li>
                    <li><strong>Ашваганда:</strong> 300-500 мг для снижения кортизола</li>
                    <li><strong>Таурин:</strong> 2-3 г/день для снижения мышечных болей</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifestyleTab; 