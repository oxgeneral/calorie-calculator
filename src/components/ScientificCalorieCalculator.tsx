"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// Импортируем отдельные вкладки
import UserSettingsTab from './calculator/UserSettingsTab';
import MainTab from './calculator/MainTab';
import ProgressTab from './calculator/ProgressTab';
import NutritionTab from './calculator/NutritionTab';
import TrainingTab from './calculator/TrainingTab';
import LifestyleTab from './calculator/LifestyleTab';

// Импортируем типы
import type { ActivityLevel, DietType, CalculatorData, Gender } from '@/types/calculator';

const ScientificCalorieCalculator = () => {
  // Состояние для отслеживания, находимся ли мы на шаге настройки или на шаге результатов
  const [currentStep, setCurrentStep] = useState<'settings' | 'results'>('settings');
  
  // Исходные данные с возможностью настройки
  const [gender, setGender] = useState<Gender>('male');
  const [currentWeight, setCurrentWeight] = useState(97.3);
  const [targetWeight, setTargetWeight] = useState(90);
  const [height, setHeight] = useState(189); // рост в см
  const [age, setAge] = useState(32);
  const [bodyFatPercentage, setBodyFatPercentage] = useState(29.0); // % жира в теле
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [dietType, setDietType] = useState<DietType>("standard");
  
  // Добавляем переменные состояния для учета типа диеты
  const [lowCarbDays, setLowCarbDays] = useState(0);
  const [modCarbDays, setModCarbDays] = useState(7);
  const [carbTimingPreference, setCarbTimingPreference] = useState("distributed");
  const [feedingWindow, setFeedingWindow] = useState(gender === 'male' ? 10 : 12);
  const [lowCarbCarbGrams, setLowCarbCarbGrams] = useState(0);
  const [modCarbCarbGrams, setModCarbCarbGrams] = useState(0);
  
  // Рассчитываемые значения BMR и TDEE
  const [bmr, setBmr] = useState(1862);
  const [tdee, setTdee] = useState(2648);
  
  // Функция для переключения на шаг с результатами
  const goToResults = () => {
    // Проверяем валидность введенных данных
    if (
      currentWeight > 0 && 
      targetWeight > 0 && 
      height > 0 && 
      age > 0 && 
      bodyFatPercentage > 0 && 
      currentWeight > targetWeight // вес должен снижаться
    ) {
      setCurrentStep('results');
    } else {
      // В реальном приложении здесь можно добавить вывод сообщения об ошибке
      alert('Пожалуйста, заполните все поля корректно. Текущий вес должен быть больше целевого.');
    }
  };
  
  // Функция для возврата к настройкам
  const goToSettings = () => {
    setCurrentStep('settings');
  };
  
  // Пересчитываем BMR и TDEE при изменении основных параметров
  useEffect(() => {
    // Рассчитываем BMR в зависимости от пола и состава тела
    let calculatedBmr;
    
    // Если известен процент жира, используем формулу Кэтч-МакАрдл
    const leanBodyMass = currentWeight * (1 - bodyFatPercentage / 100);
    calculatedBmr = Math.round(370 + (21.6 * leanBodyMass));
    
    // Проверяем, не слишком ли низкое значение и применяем корректировку на основе пола
    const bmrByMifflinStJeor = gender === 'male' 
      ? (10 * currentWeight) + (6.25 * height) - (5 * age) + 5
      : (10 * currentWeight) + (6.25 * height) - (5 * age) - 161;
      
    // Используем более высокое значение из двух формул для надежности
    calculatedBmr = Math.max(calculatedBmr, Math.round(bmrByMifflinStJeor));
    
    setBmr(calculatedBmr);
    
    // Коэффициенты активности
    const activityMultipliers: Record<ActivityLevel, number> = {
      sedentary: 1.2,      // Сидячий образ жизни
      light: 1.375,        // Легкая активность 1-3 раза в неделю
      moderate: 1.55,      // Умеренная активность 3-5 раз в неделю
      active: 1.725,       // Активный образ жизни 6-7 раз в неделю
      veryActive: 1.9      // Очень активный (спортсмены, физическая работа)
    };
    
    // Рассчитываем TDEE с учетом активности
    const baseActivityTdee = Math.round(calculatedBmr * activityMultipliers[activityLevel]);
    
    // Учитываем адаптивный термогенез (женщины более чувствительны к снижению метаболизма)
    const adaptiveThermogenesisRate = gender === 'female' ? 0.05 : 0.045;
    const adaptiveThermogenesis = Math.round(baseActivityTdee * adaptiveThermogenesisRate);
    const calculatedTdee = baseActivityTdee - adaptiveThermogenesis;
    
    setTdee(calculatedTdee);
  }, [currentWeight, height, age, activityLevel, targetWeight, bodyFatPercentage, gender]);
  
  // Научно обоснованные расчеты с учетом пола
  // Женщинам рекомендуется меньший дефицит для предотвращения гормональных нарушений
  const optimalDeficitPercentage = gender === 'female' ? 20 : 23;
  const optimalDeficit = Math.round(tdee * (optimalDeficitPercentage / 100));
  const optimalIntake = tdee - optimalDeficit;
  
  // Макронутриенты - корректировка с учетом пола и типа диеты
  // Мужчинам и женщинам требуется разное количество белка для сохранения мышечной массы
  let proteinPerKg = gender === "male" ? 2.0 : 2.2;
  let fatPercentage = gender === "male" ? 30 : 35;
  let carbPercentage = 100 - fatPercentage - (proteinPerKg * currentWeight * 4 / optimalIntake * 100);
  
  if (dietType === "cyclic") {
    // Для циклического питания
    proteinPerKg = gender === "male" ? 2.2 : 2.4; // Повышенный белок
    fatPercentage = gender === "male" ? 30 : 35;
    carbPercentage = gender === "male" ? 100 - 30 - 40 : 100 - 35 - 35;
  } 
  else if (dietType === "carb-backloading") {
    proteinPerKg = gender === "male" ? 2.0 : 2.2;
    fatPercentage = gender === "male" ? 30 : 35;
    carbPercentage = gender === "male" ? 100 - 30 - 40 : 100 - 35 - 35;
  }
  else if (dietType === "if") {
    proteinPerKg = gender === "male" ? 2.2 : 2.4; // Повышенный белок при IF
    fatPercentage = gender === "male" ? 35 : 40; // Больше жиров при IF
    carbPercentage = gender === "male" ? 100 - 35 - 40 : 100 - 40 - 40;
  }
  
  // Добавляем useEffect для корректировки значений в зависимости от типа диеты
  useEffect(() => {
    // Корректировка распределения макронутриентов по типу диеты
    switch(dietType) {
      case "cyclic":
        // Для циклического питания используем средние значения за неделю
        // 5 дней с низким содержанием углеводов, 2 дня с умеренным
        setLowCarbDays(5);
        setModCarbDays(2);
        
        // Рассчитываем значения для низкоуглеводных и умеренных дней при циклическом питании
        if (optimalIntake > 0 && currentWeight > 0 && proteinPerKg > 0) {
          const lowCarbDailyProteinGrams = Math.round(currentWeight * proteinPerKg);
          const lowCarbProteinCalories = lowCarbDailyProteinGrams * 4;
          const lowCarbFatPercentage = gender === "male" ? 65 : 60;
          const lowCarbFatCalories = Math.round(optimalIntake * (lowCarbFatPercentage / 100));
          const lowCarbCarbohydrateCalories = optimalIntake - lowCarbProteinCalories - lowCarbFatCalories;
          const lowCarbGrams = Math.round(lowCarbCarbohydrateCalories / 4);
          
          const modCarbDailyProteinGrams = Math.round(currentWeight * proteinPerKg);
          const modCarbProteinCalories = modCarbDailyProteinGrams * 4;
          const modCarbFatPercentage = gender === "male" ? 30 : 35;
          const modCarbFatCalories = Math.round(optimalIntake * (modCarbFatPercentage / 100));
          const modCarbCarbohydrateCalories = optimalIntake - modCarbProteinCalories - modCarbFatCalories;
          const modCarbGrams = Math.round(modCarbCarbohydrateCalories / 4);
          
          // Обновляем состояния после всех вычислений
          setLowCarbCarbGrams(lowCarbGrams < 0 ? 0 : lowCarbGrams);
          setModCarbCarbGrams(modCarbGrams < 0 ? 0 : modCarbGrams);
        }
        break;
      case "carb-backloading":
        // Без изменения TDEE, но с рекомендацией потреблять углеводы вечером
        setCarbTimingPreference("evening");
        break;
      case "if":
        // Интервальное голодание - сужает окно питания
        setFeedingWindow(8); // 8 часов вместо 10-12
        break;
      default:
        // Стандартный научный подход
        setLowCarbDays(0);
        setModCarbDays(7);
        setCarbTimingPreference("distributed");
        setFeedingWindow(gender === "male" ? 10 : 12);
    }
  }, [dietType, gender, optimalIntake, currentWeight, proteinPerKg]);
  
  const dailyProteinGrams = Math.round(currentWeight * proteinPerKg);
  const proteinCalories = dailyProteinGrams * 4;
  
  const fatCalories = Math.round(optimalIntake * (fatPercentage / 100));
  const dailyFatGrams = Math.round(fatCalories / 9);
  
  const carbCalories = optimalIntake - proteinCalories - fatCalories;
  const dailyCarbGrams = Math.round(carbCalories / 4);
  
  // Термический эффект пищи (TEF)
  const proteinTEF = Math.round(dailyProteinGrams * 4 * 0.25); // 25% от калорий белка
  const carbTEF = Math.round(dailyCarbGrams * 4 * 0.08); // 8% от калорий углеводов
  const fatTEF = Math.round(dailyFatGrams * 9 * 0.02); // 2% от калорий жиров
  const totalTEF = proteinTEF + carbTEF + fatTEF;
  
  // Рекомендации по хронобиологии и образу жизни
  // Мужчинам и женщинам требуется разное количество воды
  const waterPerDay = gender === 'female'
    ? Math.round((currentWeight * 0.03) * 10) / 10  // 30 мл на кг для женщин
    : Math.round((currentWeight * 0.033) * 10) / 10; // 33 мл на кг для мужчин
    
  const recommendedFiber = Math.round(optimalIntake / 1000 * 14); // 14г клетчатки на 1000 ккал
  
  // Рефиды
  const refeedDay = tdee;
  
  // Расчеты для графиков
  const weightToLose = currentWeight - targetWeight;
  const scientificCaloriesPerKg = 8800;
  
  const deficitPercentageOptimal = (optimalDeficit / tdee) * 100;
  const deficitPercentageFast = 37.8; // из расчетов
  
  // Потеря мышц - разная для мужчин и женщин
  const muscleLossPercentageOptimal = gender === 'female' ? 25 : 20; // Из расчетов
  const muscleLossPercentageFast = gender === 'female' ? 35 : 30; // Из расчетов
  
  const totalMuscleLossOptimal = (weightToLose * (muscleLossPercentageOptimal / 100));
  const totalMuscleLossFast = (weightToLose * (muscleLossPercentageFast / 100));
  
  // График прогресса с рефидами
  const weeklyOptimalDeficitWithRefeed = (optimalDeficit * 6 + 0) / 7;
  const daysToGoalWithRefeed = Math.round((weightToLose * scientificCaloriesPerKg) / weeklyOptimalDeficitWithRefeed);
  const weeksToGoalWithRefeed = Math.round(daysToGoalWithRefeed / 7);
  
  // Диетические перерывы
  const dietBreakWeeks = Math.floor(weeksToGoalWithRefeed / 6);
  const totalWeeksWithBreaks = weeksToGoalWithRefeed + dietBreakWeeks;
  
  // Улучшение с хронобиологией
  const chronobiologyImprovement = 0.1; // 10% улучшение
  const improvedWeeksToGoal = Math.round(weeksToGoalWithRefeed / (1 + chronobiologyImprovement));
  
  const generateTrajectoryData = () => {
    const weeks = totalWeeksWithBreaks + 2;
    const weeklyLossOptimal = (weeklyOptimalDeficitWithRefeed * 7) / scientificCaloriesPerKg;
    const weeklyLossFast = (1000 * 7) / scientificCaloriesPerKg;
    
    const data = [];
    let currentOptimalWeight = currentWeight;
    let currentFastWeight = currentWeight;
    
    for (let week = 0; week <= weeks; week++) {
      // Учитываем диетические перерывы каждые 6 недель
      if (week > 0 && week % 6 === 0) {
        // В неделю диетического перерыва вес не меняется
      } else {
        currentOptimalWeight = Math.max(targetWeight, currentOptimalWeight - weeklyLossOptimal);
        currentFastWeight = Math.max(targetWeight, currentFastWeight - weeklyLossFast);
      }
      
      data.push({
        week: `Неделя ${week}`,
        scientific: parseFloat(currentOptimalWeight.toFixed(1)),
        fast: parseFloat(currentFastWeight.toFixed(1))
      });
    }
    
    return data;
  };
  
  const macroData = [
    { name: 'Белки', grams: dailyProteinGrams, calories: proteinCalories, percent: Math.round(proteinCalories/optimalIntake*100) },
    { name: 'Жиры', grams: dailyFatGrams, calories: fatCalories, percent: Math.round(fatCalories/optimalIntake*100) },
    { name: 'Углеводы', grams: dailyCarbGrams, calories: carbCalories, percent: Math.round(carbCalories/optimalIntake*100) }
  ];
  
  const muscleLossData = [
    { name: 'Научный подход', fat: weightToLose - totalMuscleLossOptimal, muscle: totalMuscleLossOptimal },
    { name: 'Быстрый подход', fat: weightToLose - totalMuscleLossFast, muscle: totalMuscleLossFast }
  ];
  
  const trajectoryData = generateTrajectoryData();
  
  const tefData = [
    { name: 'Белки', value: proteinTEF, color: '#3b82f6' },
    { name: 'Углеводы', value: carbTEF, color: '#10b981' },
    { name: 'Жиры', value: fatTEF, color: '#f59e0b' }
  ];

  // Собираем все данные в один объект для передачи в компоненты-вкладки
  const calculatorData: CalculatorData = {
    gender, setGender,
    currentWeight, setCurrentWeight,
    targetWeight, setTargetWeight,
    height, setHeight,
    age, setAge,
    bodyFatPercentage, setBodyFatPercentage,
    activityLevel, setActivityLevel,
    dietType, setDietType,
    bmr, tdee,
    optimalDeficitPercentage, optimalDeficit, optimalIntake,
    proteinPerKg, dailyProteinGrams, proteinCalories,
    dailyFatGrams, fatCalories,
    dailyCarbGrams, carbCalories,
    totalTEF, proteinTEF, carbTEF, fatTEF,
    waterPerDay, recommendedFiber,
    refeedDay,
    weightToLose, scientificCaloriesPerKg,
    deficitPercentageOptimal, deficitPercentageFast,
    muscleLossPercentageOptimal, muscleLossPercentageFast,
    totalMuscleLossOptimal, totalMuscleLossFast,
    weeklyOptimalDeficitWithRefeed,
    daysToGoalWithRefeed, weeksToGoalWithRefeed,
    dietBreakWeeks, totalWeeksWithBreaks,
    chronobiologyImprovement, improvedWeeksToGoal,
    macroData, muscleLossData, trajectoryData, tefData,
    // Добавляем новые переменные для типов диеты
    lowCarbDays, modCarbDays, 
    carbTimingPreference, feedingWindow,
    lowCarbCarbGrams, modCarbCarbGrams
  };
  
  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-6 px-4 sm:px-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl text-center">Научно обоснованный калькулятор калорий для похудения</CardTitle>
          <CardDescription className="text-center">
            Расчеты основаны на современных научных исследованиях в области диетологии и метаболизма
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 'settings' ? (
            // Страница настройки параметров пользователя
            <div className="space-y-6">
              <UserSettingsTab data={calculatorData} />
              <div className="flex justify-center mt-6">
                <Button size="lg" onClick={goToResults} className="w-full md:w-auto">
                  Рассчитать план питания
                </Button>
              </div>
            </div>
          ) : (
            // Страница с результатами и вкладками
            <div className="space-y-4">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <Button variant="outline" onClick={goToSettings} className="mb-2 sm:mb-0">
                  Назад к настройкам
                </Button>
                <div className="text-sm md:text-base">
                  <span className="font-semibold">{gender === 'male' ? 'Мужчина' : 'Женщина'}</span>, {age} лет, {currentWeight} кг → {targetWeight} кг
                </div>
              </div>
              
              <Tabs defaultValue="main">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-4">
                  <TabsTrigger value="main">Основные рекомендации</TabsTrigger>
                  <TabsTrigger value="progress">Прогноз снижения веса</TabsTrigger>
                  <TabsTrigger value="nutrition">Макронутриенты</TabsTrigger>
                  <TabsTrigger value="training">Тренировки</TabsTrigger>
                  <TabsTrigger value="lifestyle">Образ жизни</TabsTrigger>
                </TabsList>
              
                <TabsContent value="main">
                  <MainTab data={calculatorData} />
                </TabsContent>
                
                <TabsContent value="progress">
                  <ProgressTab data={calculatorData} />
                </TabsContent>
                
                <TabsContent value="nutrition">
                  <NutritionTab data={calculatorData} />
                </TabsContent>
                
                <TabsContent value="training">
                  <TrainingTab data={calculatorData} />
                </TabsContent>
                
                <TabsContent value="lifestyle">
                  <LifestyleTab data={calculatorData} />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScientificCalorieCalculator; 