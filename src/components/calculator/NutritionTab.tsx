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
    modCarbCarbGrams,
    weightGoal
  } = data;

  // Текст рекомендаций в зависимости от цели (похудение или набор массы)
  const proteinRecommendation = weightGoal === 'loss'
    ? (dietType === 'if' || dietType === 'cyclic'
        ? `Научная рекомендация: ${gender === 'female' ? '2.2-2.4' : '2.0-2.2'} г/кг для ${dietType === 'if' ? 'интервального голодания' : 'циклического питания'}`
        : `Научная рекомендация: ${gender === 'female' ? '1.8-2.0' : '1.8-2.0'} г/кг для сохранения мышечной массы`)
    : `Научная рекомендация: ${gender === 'female' ? '2.0-2.2' : '2.2-2.4'} г/кг для оптимального роста мышц`;

  const fatRecommendation = weightGoal === 'loss'
    ? (dietType === 'cyclic'
        ? `Для циклического питания: ${gender === 'female' ? '35-60%' : '30-65%'} (зависит от дня)`
        : (dietType === 'if'
           ? `Для интервального голодания: ${gender === 'female' ? '35-40%' : '30-35%'} для гормонального баланса`
           : `Научная рекомендация: ${gender === 'female' ? '30-35%' : '25-30%'} для гормонального баланса`))
    : `Для набора массы: ${gender === 'female' ? '25-30%' : '25-30%'} от общей калорийности`;

  return (
    <div className="space-y-6">
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={macroData}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{fontSize: 11}} />
            <YAxis yAxisId="left" orientation="left" label={{ value: 'Граммы', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' }, offset: 0 }} tick={{fontSize: 11}} />
            <YAxis yAxisId="right" orientation="right" label={{ value: '%', angle: 90, position: 'insideRight', style: { textAnchor: 'middle' }, offset: 0 }} tick={{fontSize: 11}} />
            <Tooltip formatter={(value) => [`${value}`, ""]} />
            <Legend wrapperStyle={{fontSize: 11}} />
            <Bar yAxisId="left" dataKey="grams" name="Граммы" fill="#3b82f6" />
            <Bar yAxisId="right" dataKey="percent" name="% от калорий" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
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
              {proteinRecommendation}
            </div>
          </div>
          
          <div className="p-3 bg-green-50 rounded-md border border-green-200">
            <div className="font-medium">Жиры: {dailyFatGrams} г ({fatCalories} ккал)</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${Math.round(fatCalories/optimalIntake*100)}%` }}></div>
            </div>
            <div className="text-xs sm:text-sm mt-1">{Math.round(fatCalories/optimalIntake*100)}% от общей калорийности</div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">
              {fatRecommendation}
            </div>
          </div>
          
          <div className="p-3 bg-purple-50 rounded-md border border-purple-200">
            <div className="font-medium">Углеводы: {dailyCarbGrams} г ({carbCalories} ккал)</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${Math.round(carbCalories/optimalIntake*100)}%` }}></div>
            </div>
            <div className="text-xs sm:text-sm mt-1">{Math.round(carbCalories/optimalIntake*100)}% от общей калорийности</div>
            
            {weightGoal === 'loss' && dietType === 'cyclic' && (
              <div className="bg-indigo-50 p-2 mt-2 rounded-md">
                <p className="text-xs sm:text-sm font-medium">Распределение по циклу:</p>
                <p className="text-xs sm:text-sm">Низкоуглеводные дни: ~{lowCarbCarbGrams} г</p>
                <p className="text-xs sm:text-sm">Умеренные дни: ~{modCarbCarbGrams} г</p>
              </div>
            )}
            
            {weightGoal === 'loss' && dietType === 'carb-backloading' && (
              <div className="bg-indigo-50 p-2 mt-2 rounded-md">
                <p className="text-xs sm:text-sm font-medium">Распределение по времени:</p>
                <p className="text-xs sm:text-sm">До 16:00: ~{Math.round(dailyCarbGrams * 0.3)} г (30%)</p>
                <p className="text-xs sm:text-sm">После 16:00: ~{Math.round(dailyCarbGrams * 0.7)} г (70%)</p>
              </div>
            )}
            
            {weightGoal === 'gain' && (
              <div className="bg-indigo-50 p-2 mt-2 rounded-md">
                <p className="text-xs sm:text-sm font-medium">Распределение для роста мышц:</p>
                <p className="text-xs sm:text-sm">Перед тренировкой: ~{Math.round(dailyCarbGrams * 0.25)} г (25%)</p>
                <p className="text-xs sm:text-sm">После тренировки: ~{Math.round(dailyCarbGrams * 0.35)} г (35%)</p>
                <p className="text-xs sm:text-sm">Остальные приемы пищи: ~{Math.round(dailyCarbGrams * 0.4)} г (40%)</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 rounded-lg bg-white/10">
        <h3 className="text-lg font-medium mb-3 text-white text-center">Научные рекомендации</h3>
        <ul className="space-y-3 text-white/80">
          <li className="flex items-start">
            <span className="text-green-400 mr-2">•</span> 
            <span>Белок: <strong>{dailyProteinGrams/optimalIntake*100}%</strong> от общей калорийности</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span> 
            <span>Жиры: минимум <strong>{gender === 'male' ? '0.5' : '0.4'} г/кг</strong> веса для гормонального здоровья</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-400 mr-2">•</span> 
            <span>Распределение белка: <strong>4-5 приемов</strong> в день для максимального анаболизма</span>
          </li>
          {dietType === "cyclic" && (
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span> 
              <span>Цикличность: <strong>{lowCarbCarbGrams}г</strong> углеводов в {lowCarbCarbGrams} дней</span>
            </li>
          )}
        </ul>
      </div>
      
      <div className="p-3 sm:p-4 bg-amber-50 rounded-md border border-amber-200">
        <h3 className="text-lg font-medium mb-2">Научные рекомендации по питанию с учетом {weightGoal === 'loss' ? 'типа диеты' : 'цели набора массы'}:</h3>
        <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-xs sm:text-sm">
          {weightGoal === 'loss' && dietType === 'standard' && (
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
          
          {weightGoal === 'loss' && dietType === 'cyclic' && (
            <>
              <li><strong>Низкоуглеводные дни (5 дней):</strong> Ограничьте углеводы до {lowCarbCarbGrams} г в день, сосредоточив их вокруг тренировок</li>
              <li><strong>Умеренно-углеводные дни (2 дня):</strong> Увеличьте углеводы до {modCarbCarbGrams} г в дни отдыха или наиболее интенсивных тренировок</li>
              <li><strong>Распределение белка:</strong> Равномерно распределяйте не менее {Math.round(dailyProteinGrams/5)} г белка по 5 приемам пищи</li>
              <li><strong>Периодичность:</strong> Размещайте высокоуглеводные дни после самых интенсивных тренировок</li>
            </>
          )}
          
          {weightGoal === 'loss' && dietType === 'carb-backloading' && (
            <>
              <li><strong>Первая половина дня:</strong> Минимизируйте углеводы, сосредоточьтесь на белках и жирах</li>
              <li><strong>После тренировки/вечером:</strong> Потребляйте 70-80% дневной нормы углеводов ({Math.round(dailyCarbGrams * 0.75)} г)</li>
              <li><strong>Оптимальное время:</strong> Планируйте тренировки на вторую половину дня (16:00-18:00)</li>
              <li><strong>Выбор углеводов:</strong> После тренировки предпочитайте быстрые углеводы, в другое время - медленные</li>
            </>
          )}
          
          {weightGoal === 'loss' && dietType === 'if' && (
            <>
              <li><strong>Окно питания:</strong> Ограничьте все приемы пищи периодом в 8 часов (например, 12:00-20:00)</li>
              <li><strong>Распределение калорий:</strong> 2-3 крупных приема пищи вместо 5-6 мелких</li>
              <li><strong>Белок:</strong> Увеличьте потребление белка до {dailyProteinGrams} г/день для сохранения мышечной массы</li>
              <li><strong>Нутриенты:</strong> Обеспечьте полноценный набор витаминов и минералов в меньшем объеме пищи</li>
              <li><strong>Гидратация:</strong> Поддерживайте водный баланс и в период голодания (разрешены несладкие напитки)</li>
            </>
          )}
          
          {weightGoal === 'gain' && (
            <>
              <li><strong>Профицит калорий:</strong> Поддерживайте умеренный профицит в 300-500 ккал/день для оптимального роста мышц без лишнего жира</li>
              <li><strong>Распределение приемов пищи:</strong> 4-6 приемов пищи в течение дня для непрерывного поступления нутриентов</li>
              <li><strong>Тайминг белка:</strong> Потребляйте не менее {Math.round(dailyProteinGrams/5)} г белка каждые 3-4 часа</li>
              <li><strong>Предтренировочное питание:</strong> Употребляйте 25-35 г белка и 40-50 г углеводов за 1-2 часа до тренировки</li>
              <li><strong>Посттренировочное питание:</strong> 30-40 г белка и 40-60 г быстрых углеводов в течение 30-60 минут после тренировки</li>
              <li><strong>Ночной прием пищи:</strong> 30-40 г медленного белка (казеин, творог) перед сном для ночного анаболизма</li>
              <li><strong>Углеводы:</strong> Распределите большую часть углеводов вокруг тренировок и утреннего приема пищи</li>
              <li><strong>Гидратация:</strong> Потребляйте не менее 3-4 литров воды в день для оптимального анаболизма</li>
            </>
          )}
          
          <li><strong>Клетчатка:</strong> Включите минимум {recommendedFiber}г клетчатки ежедневно для здоровья микробиома</li>
          <li><strong>Омега-3:</strong> Особое внимание жирным кислотам омега-3 для уменьшения воспаления и поддержания гормонального здоровья</li>
        </ul>
      </div>
      
      <div className="p-3 sm:p-4 bg-blue-50 rounded-md border border-blue-200">
        <h3 className="text-lg font-medium mb-2">Оптимальные источники нутриентов для {gender === 'female' ? 'женщин' : 'мужчин'} ({weightGoal === 'loss' ? 'снижение веса' : 'набор массы'}):</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          <div>
            <h4 className="font-medium mb-2 text-sm sm:text-base">Белки</h4>
            <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-1">
              {weightGoal === 'loss' ? (
                <>
                  <li>Нежирные источники белка: куриная грудка, индейка</li>
                  <li>Рыба: лосось, тунец, треска</li>
                  <li>Яйца (целые для женщин / белки для мужчин при необходимости)</li>
                  <li>Обезжиренные молочные продукты</li>
                  <li>Растительные белки: тофу, чечевица, киноа</li>
                  <li>Протеиновые добавки (сывороточный, казеиновый)</li>
                </>
              ) : (
                <>
                  <li>Полноценные источники белка: говядина, куриная грудка, индейка</li>
                  <li>Жирная и белая рыба: лосось, тунец, треска</li>
                  <li>Яйца целиком (2-3 в день)</li>
                  <li>Молочные продукты: творог, греческий йогурт, сыр</li>
                  <li>Растительные белки в сочетаниях: нут+рис, фасоль+кукуруза</li>
                  <li>Протеиновые добавки: сывороточный протеин (после тренировки), казеиновый (перед сном)</li>
                </>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2 text-sm sm:text-base">Жиры</h4>
            <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-1">
              {weightGoal === 'loss' ? (
                <>
                  <li>Оливковое масло, масло авокадо</li>
                  <li>Авокадо</li>
                  <li>Орехи и семена (миндаль, грецкие орехи, льняное семя)</li>
                  <li>Жирная рыба (лосось, сардины, скумбрия)</li>
                  {gender === 'female' && <li>Темный шоколад (более 70% какао) в умеренных количествах</li>}
                  <li>Яичные желтки</li>
                  <li>Кокосовое масло (ограниченно)</li>
                </>
              ) : (
                <>
                  <li>Оливковое и авокадо масла (для готовки и заправок)</li>
                  <li>Авокадо (1/2-1 шт. в день)</li>
                  <li>Орехи и семена (миндаль, бразильские, кешью, семена чиа)</li>
                  <li>Жирная рыба (2-3 раза в неделю)</li>
                  <li>Яичные желтки (до 2-3 в день)</li>
                  <li>Натуральное масло (сливочное, топленое) в умеренных количествах</li>
                  <li>Кокосовое масло и MCT масло для дополнительной энергии</li>
                </>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2 text-sm sm:text-base">Углеводы</h4>
            <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-1">
              {weightGoal === 'loss' ? (
                <>
                  <li>Овсянка, киноа, коричневый рис</li>
                  <li>Сладкий картофель, картофель</li>
                  <li>Бобовые (фасоль, чечевица, нут)</li>
                  <li>Фрукты (ягоды, яблоки, груши)</li>
                  <li>Овощи (все виды)</li>
                  <li>Цельнозерновой хлеб и макароны</li>
                  
                  {dietType === 'carb-backloading' && (
                    <li><strong>Вечерние углеводы:</strong> белый рис, картофель, бананы после тренировки</li>
                  )}
                </>
              ) : (
                <>
                  <li><strong>До тренировки:</strong> овсянка, цельнозерновой хлеб, фрукты</li>
                  <li><strong>После тренировки:</strong> белый рис, паста, картофель, бананы, сухофрукты</li>
                  <li><strong>Весь день:</strong> киноа, коричневый рис, сладкий картофель</li>
                  <li>Крахмалистые овощи (картофель, кукуруза) для дополнительной энергии</li>
                  <li>Фрукты (бананы, ананасы, манго) для быстрой энергии и витаминов</li>
                  <li>Овощи (все виды) как источник микронутриентов и клетчатки</li>
                  <li>Углеводные добавки (мальтодекстрин, циклические декстрины) для периода вокруг тренировки</li>
                </>
              )}
            </ul>
          </div>
          
          {gender === 'female' && (
            <div className="md:col-span-3 mt-2">
              <h4 className="font-medium mb-2 text-sm sm:text-base">Специфические рекомендации для женщин</h4>
              <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm">
                {weightGoal === 'loss' ? (
                  <>
                    <li><strong>Во время фолликулярной фазы (дни 1-14):</strong> Повышенное потребление железа через красное мясо, шпинат, обогащенные злаки</li>
                    <li><strong>Во время лютеиновой фазы (дни 15-28):</strong> Повышенное потребление магния через тёмную зелень, орехи, семена</li>
                    <li><strong>Контроль воспалений:</strong> Куркума, имбирь, ягоды, жирная рыба могут помочь уменьшить ПМС-симптомы</li>
                    <li><strong>Витамин B6:</strong> Бананы, нут, курица, тунец помогают регулировать гормональный баланс и настроение</li>
                  </>
                ) : (
                  <>
                    <li><strong>Во время фолликулярной фазы (дни 1-14):</strong> Повышенное потребление углеводов и общего количества калорий, идеальное время для интенсивных тренировок</li>
                    <li><strong>Во время лютеиновой фазы (дни 15-28):</strong> Больше белка и жиров, меньше углеводов, фокус на восстановительных тренировках</li>
                    <li><strong>Баланс гормонов:</strong> Повышенное потребление цинка, магния, омега-3 и витамина D для поддержки гормонального фона</li>
                    <li><strong>Железо:</strong> Особое внимание железосодержащим продуктам (красное мясо, печень, шпинат) для поддержания энергии</li>
                    <li><strong>Креатин:</strong> Рассмотрите добавку 3-5г/день, особенно эффективен для женщин при наборе мышечной массы</li>
                  </>
                )}
              </ul>
            </div>
          )}

          {weightGoal === 'gain' && (
            <div className="md:col-span-3 mt-2 bg-indigo-50 p-3 rounded-md">
              <h4 className="font-medium mb-2 text-sm sm:text-base">Дополнительные рекомендации для набора массы</h4>
              <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm">
                <li><strong>Прогрессивное увеличение калорий:</strong> Начните с профицита 300 ккал, каждые 2-3 недели увеличивайте на 100-150 ккал при замедлении прогресса</li>
                <li><strong>Креатин моногидрат:</strong> 5г ежедневно независимо от дня тренировки для увеличения силы и объема мышц</li>
                <li><strong>Углеводное окно:</strong> Наибольшее потребление углеводов в течение 4 часов после тренировки</li>
                <li><strong>Регулярные измерения:</strong> Отслеживайте не только вес, но и обхваты мышц для оценки прогресса</li>
                <li><strong>Качество калорий:</strong> 80% питания должны составлять цельные, необработанные продукты</li>
                <li><strong>Витамин D и Цинк:</strong> Важны для оптимальной продукции тестостерона и анаболизма</li>
                <li><strong>Периодизация питания:</strong> Циклы набора массы (4-8 недель) с короткими периодами поддержания (1-2 недели)</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritionTab; 