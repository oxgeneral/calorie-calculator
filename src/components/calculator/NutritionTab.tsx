"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { CalculatorData } from '@/types/calculator';

interface NutritionTabProps {
  data: CalculatorData;
}

const NutritionTab: React.FC<NutritionTabProps> = ({ data }) => {
  const {
    gender,
    dietType,
    dailyProteinGrams,
    dailyFatGrams,
    dailyCarbGrams,
    proteinCalories,
    fatCalories,
    carbCalories,
    optimalIntake,
    recommendedFiber,
    macroData,
    lowCarbCarbGrams,
    modCarbCarbGrams
  } = data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Оптимальное распределение макронутриентов</h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={macroData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis 
                  yAxisId="left" 
                  orientation="left" 
                  tick={{fontSize: 11}}
                  label={{ value: 'Граммы', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }} 
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  tick={{fontSize: 11}}
                  label={{ value: 'Калории', angle: 90, position: 'insideRight', style: { fontSize: '12px' } }} 
                />
                <Tooltip formatter={(value, name, props) => [value, props.payload.name]} />
                <Legend wrapperStyle={{fontSize: 12}} />
                <Bar yAxisId="left" dataKey="grams" name="Граммы" fill="#3b82f6" />
                <Bar yAxisId="right" dataKey="calories" name="Калории" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Оптимальное соотношение макронутриентов</h3>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
              <div className="font-medium">Белки: {dailyProteinGrams} г ({proteinCalories} ккал)</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${Math.round(proteinCalories/optimalIntake*100)}%` }}></div>
              </div>
              <div className="text-xs sm:text-sm mt-1">{Math.round(proteinCalories/optimalIntake*100)}% от общей калорийности</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                {dietType === 'if' || dietType === 'cyclic'
                  ? `Научная рекомендация: ${gender === 'female' ? '2.2-2.4' : '2.0-2.2'} г/кг для ${dietType === 'if' ? 'интервального голодания' : 'циклического питания'}`
                  : `Научная рекомендация: ${gender === 'female' ? '1.8-2.0' : '1.8-2.0'} г/кг для сохранения мышечной массы`
                }
              </div>
            </div>
            
            <div className="p-3 bg-green-50 rounded-md border border-green-200">
              <div className="font-medium">Жиры: {dailyFatGrams} г ({fatCalories} ккал)</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${Math.round(fatCalories/optimalIntake*100)}%` }}></div>
              </div>
              <div className="text-xs sm:text-sm mt-1">{Math.round(fatCalories/optimalIntake*100)}% от общей калорийности</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                {dietType === 'cyclic'
                  ? `Для циклического питания: ${gender === 'female' ? '35-60%' : '30-65%'} (зависит от дня)`
                  : (dietType === 'if'
                    ? `Для интервального голодания: ${gender === 'female' ? '35-40%' : '30-35%'} для гормонального баланса`
                    : `Научная рекомендация: ${gender === 'female' ? '30-35%' : '25-30%'} для гормонального баланса`
                  )
                }
              </div>
            </div>
            
            <div className="p-3 bg-purple-50 rounded-md border border-purple-200">
              <div className="font-medium">Углеводы: {dailyCarbGrams} г ({carbCalories} ккал)</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${Math.round(carbCalories/optimalIntake*100)}%` }}></div>
              </div>
              <div className="text-xs sm:text-sm mt-1">{Math.round(carbCalories/optimalIntake*100)}% от общей калорийности</div>
              
              {dietType === 'cyclic' && (
                <div className="bg-indigo-50 p-2 mt-2 rounded-md">
                  <p className="text-xs sm:text-sm font-medium">Распределение по циклу:</p>
                  <p className="text-xs sm:text-sm">Низкоуглеводные дни: ~{lowCarbCarbGrams} г</p>
                  <p className="text-xs sm:text-sm">Умеренные дни: ~{modCarbCarbGrams} г</p>
                </div>
              )}
              
              {dietType === 'carb-backloading' && (
                <div className="bg-indigo-50 p-2 mt-2 rounded-md">
                  <p className="text-xs sm:text-sm font-medium">Распределение по времени:</p>
                  <p className="text-xs sm:text-sm">До 16:00: ~{Math.round(dailyCarbGrams * 0.3)} г (30%)</p>
                  <p className="text-xs sm:text-sm">После 16:00: ~{Math.round(dailyCarbGrams * 0.7)} г (70%)</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-3 sm:p-4 bg-amber-50 rounded-md border border-amber-200">
        <h3 className="text-lg font-medium mb-2">Научные рекомендации по питанию с учетом типа диеты:</h3>
        <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-xs sm:text-sm">
          {dietType === 'standard' && (
            <>
              {gender === 'female' ? (
                <>
                  <li><strong>Распределение питания:</strong> 4-5 небольших приемов пищи равномерно распределенных в течение дня в окне 8-10 часов</li>
                  <li><strong>Циклическое питание:</strong> Распределение углеводов в соответствии с менструальным циклом (больше углеводов в фолликулярной фазе)</li>
                  <li><strong>Железо:</strong> Повышенное внимание к продуктам, богатым железом, особенно в первой фазе цикла</li>
                </>
              ) : (
                <>
                  <li><strong>Распределение приемов пищи:</strong> 3-5 приемов пищи равномерно распределенных в течение дня в окне 8-10 часов</li>
                  <li><strong>Белок:</strong> Распределите равномерно по всем приемам пищи (минимум 25-30 г за прием)</li>
                  <li><strong>Рефид день:</strong> Увеличьте в основном углеводы, сохраняя потребление белка на высоком уровне</li>
                </>
              )}
            </>
          )}
          
          {dietType === 'cyclic' && (
            <>
              <li><strong>Низкоуглеводные дни (5 дней):</strong> Ограничьте углеводы до {lowCarbCarbGrams} г в день, сосредоточив их вокруг тренировок</li>
              <li><strong>Умеренно-углеводные дни (2 дня):</strong> Увеличьте углеводы до {modCarbCarbGrams} г в дни отдыха или наиболее интенсивных тренировок</li>
              <li><strong>Распределение белка:</strong> Равномерно распределяйте не менее {Math.round(dailyProteinGrams/5)} г белка по 5 приемам пищи</li>
              <li><strong>Периодичность:</strong> Размещайте высокоуглеводные дни после самых интенсивных тренировок</li>
            </>
          )}
          
          {dietType === 'carb-backloading' && (
            <>
              <li><strong>Первая половина дня:</strong> Минимизируйте углеводы, сосредоточьтесь на белках и жирах</li>
              <li><strong>После тренировки/вечером:</strong> Потребляйте 70-80% дневной нормы углеводов ({Math.round(dailyCarbGrams * 0.75)} г)</li>
              <li><strong>Оптимальное время:</strong> Планируйте тренировки на вторую половину дня (16:00-18:00)</li>
              <li><strong>Выбор углеводов:</strong> После тренировки предпочитайте быстрые углеводы, в другое время - медленные</li>
            </>
          )}
          
          {dietType === 'if' && (
            <>
              <li><strong>Окно питания:</strong> Ограничьте все приемы пищи периодом в 8 часов (например, 12:00-20:00)</li>
              <li><strong>Распределение калорий:</strong> 2-3 крупных приема пищи вместо 5-6 мелких</li>
              <li><strong>Белок:</strong> Увеличьте потребление белка до {dailyProteinGrams} г/день для сохранения мышечной массы</li>
              <li><strong>Нутриенты:</strong> Обеспечьте полноценный набор витаминов и минералов в меньшем объеме пищи</li>
              <li><strong>Гидратация:</strong> Поддерживайте водный баланс и в период голодания (разрешены несладкие напитки)</li>
            </>
          )}
          
          <li><strong>Клетчатка:</strong> Включите минимум {recommendedFiber}г клетчатки ежедневно для здоровья микробиома</li>
          <li><strong>Омега-3:</strong> Особое внимание жирным кислотам омега-3 для уменьшения воспаления и поддержания гормонального здоровья</li>
        </ul>
      </div>
      
      <div className="p-3 sm:p-4 bg-blue-50 rounded-md border border-blue-200">
        <h3 className="text-lg font-medium mb-2">Оптимальные источники нутриентов для {gender === 'female' ? 'женщин' : 'мужчин'}:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          <div>
            <h4 className="font-medium mb-2 text-sm sm:text-base">Белки</h4>
            <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-1">
              <li>Нежирные источники белка: куриная грудка, индейка</li>
              <li>Рыба: лосось, тунец, треска</li>
              <li>Яйца (целые для женщин / белки для мужчин при необходимости)</li>
              <li>Обезжиренные молочные продукты</li>
              <li>Растительные белки: тофу, чечевица, киноа</li>
              <li>Протеиновые добавки (сывороточный, казеиновый)</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2 text-sm sm:text-base">Жиры</h4>
            <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-1">
              <li>Оливковое масло, масло авокадо</li>
              <li>Авокадо</li>
              <li>Орехи и семена (миндаль, грецкие орехи, льняное семя)</li>
              <li>Жирная рыба (лосось, сардины, скумбрия)</li>
              {gender === 'female' && <li>Темный шоколад (более 70% какао) в умеренных количествах</li>}
              <li>Яичные желтки</li>
              <li>Кокосовое масло (ограниченно)</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2 text-sm sm:text-base">Углеводы</h4>
            <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-1">
              <li>Овсянка, киноа, коричневый рис</li>
              <li>Сладкий картофель, картофель</li>
              <li>Бобовые (фасоль, чечевица, нут)</li>
              <li>Фрукты (ягоды, яблоки, груши)</li>
              <li>Овощи (все виды)</li>
              <li>Цельнозерновой хлеб и макароны</li>
              
              {dietType === 'carb-backloading' && (
                <li><strong>Вечерние углеводы:</strong> белый рис, картофель, бананы после тренировки</li>
              )}
            </ul>
          </div>
          
          {gender === 'female' && (
            <div className="md:col-span-3 mt-2">
              <h4 className="font-medium mb-2 text-sm sm:text-base">Специфические рекомендации для женщин</h4>
              <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm">
                <li><strong>Во время фолликулярной фазы (дни 1-14):</strong> Повышенное потребление железа через красное мясо, шпинат, обогащенные злаки</li>
                <li><strong>Во время лютеиновой фазы (дни 15-28):</strong> Повышенное потребление магния через тёмную зелень, орехи, семена</li>
                <li><strong>Контроль воспалений:</strong> Куркума, имбирь, ягоды, жирная рыба могут помочь уменьшить ПМС-симптомы</li>
                <li><strong>Витамин B6:</strong> Бананы, нут, курица, тунец помогают регулировать гормональный баланс и настроение</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritionTab; 