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
    dailyCarbGrams,
    weightGoal
  } = data;

  // Текстовые представления в зависимости от цели
  const goalType = weightGoal === 'loss' ? 'снижения' : 'увеличения';
  const deficitType = weightGoal === 'loss' ? 'Дефицит' : 'Профицит';
  const deficitTitle = weightGoal === 'loss' ? 'Оптимальный дефицит' : 'Оптимальный профицит';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Научные показатели</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>Базовый метаболизм (BMR):</div>
          <div className="font-bold">{bmr} ккал</div>
          
          <div title="С учетом адаптивного термогенеза">Общий расход энергии (TDEE):</div>
          <div className="font-bold">{tdee} ккал</div>
          
          <div>{deficitTitle}:</div>
          <div className="font-bold">{Math.abs(optimalDeficit)} ккал ({Math.abs(optimalDeficitPercentage).toFixed(0)}% от TDEE)</div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Научно оптимальный план питания</h3>
        <div className="grid grid-cols-1 gap-3">
          <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
            <div className="font-medium">Рекомендуемое ежедневное потребление:</div>
            <div className="font-bold text-lg">{optimalIntake} ккал/день</div>
            <div className="text-sm text-gray-600 mt-1">{deficitTitle} {Math.abs(optimalDeficit)} ккал ({Math.abs(optimalDeficitPercentage).toFixed(0)}% от TDEE)</div>
          </div>
          
          {dietType === "cyclic" && (
            <div className="p-3 bg-indigo-50 rounded-md border border-indigo-200">
              <div className="font-medium">Циклическое питание:</div>
              <div className="font-bold text-lg">{lowCarbDays} дней низкоуглеводных, {modCarbDays} дней умеренных</div>
              <div className="text-sm text-gray-600 mt-1">
                Низкоуглеводные дни: ~{lowCarbCarbGrams}г углеводов, умеренные дни: ~{modCarbCarbGrams}г углеводов
              </div>
            </div>
          )}
          
          {dietType === "carb-backloading" && (
            <div className="p-3 bg-indigo-50 rounded-md border border-indigo-200">
              <div className="font-medium">Углеводная загрузка вечером:</div>
              <div className="font-bold text-lg">{Math.round(dailyCarbGrams * 0.7)} г углеводов после 16:00</div>
              <div className="text-sm text-gray-600 mt-1">
                Распределение: 30% углеводов до тренировки, 70% после (вечером)
              </div>
            </div>
          )}
          
          {dietType === "if" && (
            <div className="p-3 bg-indigo-50 rounded-md border border-indigo-200">
              <div className="font-medium">Интервальное голодание 16:8:</div>
              <div className="font-bold text-lg">Окно питания {feedingWindow} часов</div>
              <div className="text-sm text-gray-600 mt-1">
                Рекомендуемое время: {gender === 'male' ? "12:00-20:00" : "10:00-18:00"}
              </div>
            </div>
          )}
          
          {weightGoal === 'loss' ? (
            <div className="p-3 bg-green-50 rounded-md border border-green-200">
              <div className="font-medium">День повышенной калорийности (рефид):</div>
              <div className="font-bold text-lg">{refeedDay} ккал/день</div>
              <div className="text-sm text-gray-600 mt-1">1 день в неделю для поддержания метаболизма</div>
            </div>
          ) : (
            <div className="p-3 bg-green-50 rounded-md border border-green-200">
              <div className="font-medium">День пониженной калорийности:</div>
              <div className="font-bold text-lg">{tdee} ккал/день</div>
              <div className="text-sm text-gray-600 mt-1">1 день в неделю для предотвращения излишнего накопления жира</div>
            </div>
          )}
          
          <div className="p-3 bg-purple-50 rounded-md border border-purple-200">
            <div className="font-medium">Ожидаемое время достижения цели:</div>
            <div className="font-bold text-lg">{totalWeeksWithBreaks} недель</div>
            <div className="text-sm text-gray-600 mt-1">С учетом {weightGoal === 'loss' ? 'диетических перерывов' : 'фаз циклирования'} каждые {weightGoal === 'loss' ? '6' : '8'} недель</div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-amber-50 rounded-md border border-amber-200 col-span-1 md:col-span-2">
        <h3 className="text-lg font-medium mb-2">Научные рекомендации с учетом пола и цели {goalType} веса:</h3>
        <ul className="list-disc pl-5 space-y-1">
          {weightGoal === 'loss' ? (
            // Рекомендации для похудения
            <>
              <li>Поддерживайте высокое потребление белка — <strong>{dailyProteinGrams} г/день</strong> ({proteinPerKg} г на кг веса) для сохранения мышечной массы</li>
              
              {dietType === "standard" && (
                <li>Используйте стратегию <strong>рефидов</strong> (1 день в неделю с повышенной калорийностью до {refeedDay} ккал) для предотвращения метаболических адаптаций</li>
              )}
              
              {dietType === "cyclic" && (
                <li><strong>Циклическое питание:</strong> {lowCarbDays} дней с низким содержанием углеводов ({lowCarbCarbGrams}г) и {modCarbDays} дня с умеренными углеводами ({modCarbCarbGrams}г)</li>
              )}
              
              {dietType === "carb-backloading" && (
                <li><strong>Углеводная загрузка:</strong> Потребляйте 70-80% дневной нормы углеводов ({Math.round(dailyCarbGrams * 0.75)}г) в вечернее время, предпочтительно после тренировки</li>
              )}
              
              {dietType === "if" && (
                <li><strong>Интервальное голодание:</strong> Ограничьте приемы пищи окном в {feedingWindow} часов (например, с {gender === "male" ? "12:00 до 20:00" : "11:00 до 19:00"})</li>
              )}
              
              <li>Делайте <strong>диетические перерывы</strong> на 7 дней каждые {gender === "male" ? "6" : "4"} недель для восстановления гормонального баланса</li>
              <li>Потребляйте минимум <strong>{recommendedFiber} г клетчатки</strong> в день и <strong>{waterPerDay} л воды</strong> для оптимального здоровья микробиома</li>
              
              {dietType !== "if" && (
                <li>Сократите окно питания до <strong>{gender === "male" ? "8-10" : "10-12"} часов</strong> в день для улучшения метаболизма на 5-15%</li>
              )}
              
              {gender === "female" && (
                <li><strong>Цикличность питания:</strong> Увеличивайте калорийность на 100-200 ккал в лютеиновой фазе цикла (вторая половина)</li>
              )}
            </>
          ) : (
            // Рекомендации для набора массы
            <>
              <li>Поддерживайте высокое потребление белка — <strong>{dailyProteinGrams} г/день</strong> ({proteinPerKg} г на кг веса) для максимального роста мышечной массы</li>
              
              {dietType === "standard" && (
                <li>Используйте стратегию <strong>циклирования калорийности</strong> (1 день в неделю с пониженной калорийностью до {tdee} ккал) для минимизации накопления жира</li>
              )}
              
              {dietType === "cyclic" && (
                <li><strong>Циклическое питание:</strong> {lowCarbDays} дней с высокими белками и умеренными жирами, {modCarbDays} дней с высокими углеводами для загрузки мышц</li>
              )}
              
              {dietType === "carb-backloading" && (
                <li><strong>Углеводная загрузка:</strong> Сосредоточьте 70-80% дневной нормы углеводов ({Math.round(dailyCarbGrams * 0.75)}г) после тренировки для максимального анаболизма</li>
              )}
              
              {dietType === "if" && (
                <li><strong>Питание в анаболическом окне:</strong> Сконцентрируйте питание в {feedingWindow} часов, с упором на временной период вокруг тренировки</li>
              )}
              
              <li>Проводите <strong>фазы поддержания</strong> продолжительностью 7-10 дней каждые 8 недель для оптимизации соотношения мышцы/жир</li>
              <li>Потребляйте минимум <strong>{recommendedFiber} г клетчатки</strong> в день и <strong>{waterPerDay} л воды</strong> для оптимальной усвояемости нутриентов</li>
              
              <li>Планируйте тренировки в середине временного окна питания для максимальной продуктивности и восстановления</li>
              
              {gender === "female" && (
                <li><strong>Стратегия по циклу:</strong> Усильте тренировочную нагрузку и потребление углеводов в фолликулярной фазе цикла для максимальной гипертрофии</li>
              )}
              
              <li>Обеспечьте достаточное количество сна (7-9 часов) для максимальной секреции гормона роста и восстановления</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MainTab; 