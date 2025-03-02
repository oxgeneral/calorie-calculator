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
    carbTimingPreference
  } = data;

  // Определение рекомендуемого временного окна для типа диеты
  const getFeedingWindowTime = () => {
    if (dietType === "if") {
      return gender === "male" ? "12:00 - 20:00" : "11:00 - 19:00";
    } else {
      return gender === "male" ? "10:00 - 18:00" : "9:00 - 19:00";
    }
  };
  
  // Визуальное отображение окна питания (ширина и положение)
  const getFeedingWindowStyle = () => {
    if (dietType === "if") {
      return { left: "50%", width: "33%" };
    } else {
      return { 
        left: gender === "male" ? "33%" : "29%", 
        width: gender === "male" ? "42%" : "50%" 
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
        <h3 className="text-lg font-medium mb-3">Оптимизация образа жизни для {gender === 'female' ? 'женщин' : 'мужчин'}</h3>
        <div className="space-y-4">
          <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
            <div className="font-medium">Хронобиология питания</div>
            <div className="text-sm mt-1">
              Окно питания: <strong>
                {dietType === "if" 
                  ? "8 часов (16:8)" 
                  : (gender === "male" ? "8-10" : "10-12") + " часов"}
              </strong>
            </div>
            <div className="text-sm text-gray-600">
              {dietType === "if" 
                ? "Интервальное голодание помогает улучшить чувствительность к инсулину и способствует аутофагии" 
                : "Может повысить эффективность метаболизма на 5-15%"}
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
            
            {dietType === "carb-backloading" && (
              <div className="mt-2 text-sm bg-yellow-50 p-2 rounded-md">
                <p className="font-medium">Углеводная загрузка вечером:</p>
                <p>Сосредоточьте 70-80% углеводов во второй половине окна питания (после 16:00)</p>
              </div>
            )}
          </div>
          
          <div className="p-3 bg-green-50 rounded-md border border-green-200">
            <div className="font-medium">Гидратация</div>
            <div className="text-sm mt-1">Рекомендуемое потребление воды: <strong>{waterPerDay} л/день</strong></div>
            <div className="text-sm text-gray-600">Может увеличить термогенез на 24-30% в течение часа после потребления</div>
            <div className="mt-2">
              <p className="text-sm text-gray-700">Рекомендуемый график питья:</p>
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
          </div>
          
          <div className="p-3 bg-purple-50 rounded-md border border-purple-200">
            <div className="font-medium">Качество сна</div>
            <div className="text-sm mt-1">Рекомендуемая продолжительность: <strong>7-9 часов</strong></div>
            <div className="text-sm text-gray-600">
              {gender === 'female'
                ? 'Недостаток сна может нарушить гормональный баланс и усилить тягу к углеводам на 30-45%'
                : 'Недостаток сна может увеличить потерю мышц на 60-70% и снизить уровень тестостерона'
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
        <h3 className="text-lg font-medium mb-3">Психологические аспекты похудения для {gender === 'female' ? 'женщин' : 'мужчин'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-amber-50 rounded-md border border-amber-200">
            <div className="font-medium">Когнитивные стратегии</div>
            <ul className="list-disc pl-5 mt-1 text-sm">
              {gender === 'female' ? (
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
              )}
            </ul>
          </div>
          
          <div className="p-3 bg-amber-50 rounded-md border border-amber-200">
            <div className="font-medium">Стратегии управления стрессом</div>
            <ul className="list-disc pl-5 mt-1 text-sm">
              {gender === 'female' ? (
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
              )}
            </ul>
          </div>
          
          <div className="p-3 bg-amber-50 rounded-md border border-amber-200">
            <div className="font-medium">Устойчивое изменение пищевого поведения</div>
            <ul className="list-disc pl-5 mt-1 text-sm">
              <li>Постепенные изменения вместо радикальных</li>
              <li>Осознанное питание (без отвлечений)</li>
              <li>Планирование приемов пищи заранее</li>
              <li>Баланс между строгостью и гибкостью (80/20 принцип)</li>
              {gender === 'female' && <li>Учет гормональных изменений в течение цикла</li>}
            </ul>
          </div>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-md border border-blue-200 mt-4">
          <h3 className="text-lg font-medium mb-2">Научно обоснованные добавки для {gender === 'female' ? 'женщин' : 'мужчин'}:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <ul className="list-disc pl-5 space-y-1">
                {gender === 'female' ? (
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
                )}
              </ul>
            </div>
            <div>
              <p className="text-sm mb-2">Сила доказательной базы:</p>
              <ul className="list-none space-y-1 text-sm">
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                  <span><strong>Сильная</strong>: {gender === 'female' ? 'омега-3, магний, витамин D' : 'креатин, кофеин, белковые добавки'}</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span><strong>Средняя</strong>: {gender === 'female' ? 'витамин B6, железо, кальций' : 'омега-3, витамин D, магний'}</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
                  <span><strong>Умеренная</strong>: {gender === 'female' ? 'пробиотики, витамин C' : 'L-карнитин, пробиотики'}</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span><strong>Слабая</strong>: большинство других добавок для похудения</span>
                </li>
              </ul>
              
              {gender === 'female' && (
                <div className="mt-4 p-2 bg-purple-50 rounded border border-purple-200">
                  <p className="text-sm font-medium">Особые рекомендации для женщин:</p>
                  <p className="text-xs mt-1">Избегайте приема железа вместе с кальцием или кофеином. Принимайте железо с витамином C для лучшего усвоения.</p>
                  <p className="text-xs mt-1">Проконсультируйтесь с врачом перед приемом добавок, особенно при наличии заболеваний щитовидной железы.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifestyleTab; 