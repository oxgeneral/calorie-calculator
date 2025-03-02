import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ScientificCalorieCalculator = () => {
  // Исходные данные с возможностью настройки
  const [currentWeight, setCurrentWeight] = useState(97.3);
  const [targetWeight, setTargetWeight] = useState(90);
  const [height, setHeight] = useState(189); // рост в см
  const [age, setAge] = useState(32);
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [dietType, setDietType] = useState("standard");
  
  // Рассчитываемые значения BMR и TDEE
  const [bmr, setBmr] = useState(1862);
  const [tdee, setTdee] = useState(2648);
  
  // Пересчитываем BMR и TDEE при изменении основных параметров
  useEffect(() => {
    // Разные методы расчета в зависимости от пола
    let calculatedBmr;
    
    if (gender === "male") {
      // Для мужчин используем Кэтч-МакАрдл или Миффлина-Сан Жеора
      // Кэтч-МакАрдл (если известен % жира)
      const bodyFatPercentage = 29.0; // из данных пользователя
      const leanBodyMass = currentWeight * (1 - bodyFatPercentage / 100);
      calculatedBmr = Math.round(370 + (21.6 * leanBodyMass));
      
      // Альтернативно: формула Миффлина-Сан Жеора
      const mifflinBmr = Math.round(10 * currentWeight + 6.25 * height - 5 * age + 5);
      
      // Используем наименьшее значение для консервативной оценки
      calculatedBmr = Math.min(calculatedBmr, mifflinBmr);
    } else {
      // Для женщин другие коэффициенты
      // Кэтч-МакАрдл с учетом более высокого % жира у женщин
      const bodyFatPercentage = Math.max(29.0, 33.0); // минимум 33% для женщин
      const leanBodyMass = currentWeight * (1 - bodyFatPercentage / 100);
      calculatedBmr = Math.round(370 + (21.6 * leanBodyMass));
      
      // Миффлин-Сан Жеор для женщин
      const mifflinBmr = Math.round(10 * currentWeight + 6.25 * height - 5 * age - 161); // для женщин -161 вместо +5
      
      // Консервативная оценка
      calculatedBmr = Math.min(calculatedBmr, mifflinBmr);
    }
    
    // Коэффициенты активности - различаются для мужчин и женщин
    const activityMultipliers = {
      male: {
        sedentary: 1.2,      // Сидячий образ жизни
        light: 1.375,        // Легкая активность 1-3 раза в неделю
        moderate: 1.55,      // Умеренная активность 3-5 раз в неделю
        active: 1.725,       // Активный образ жизни 6-7 раз в неделю
        veryActive: 1.9      // Очень активный (спортсмены, физическая работа)
      },
      female: {
        sedentary: 1.1,      // Женщины имеют немного более низкие множители
        light: 1.35,
        moderate: 1.5,
        active: 1.65,
        veryActive: 1.8
      }
    };
    
    // Выбираем соответствующий множитель в зависимости от пола
    const genderSpecificMultipliers = activityMultipliers[gender];
    
    // Рассчитываем TDEE с учетом активности и пола
    const baseActivityTdee = Math.round(calculatedBmr * genderSpecificMultipliers[activityLevel]);
    
    // Адаптивный термогенез различается у мужчин и женщин
    // Исследования показывают, что у женщин адаптация сильнее
    const adaptiveThermogenesisRate = gender === "male" ? 0.045 : 0.06;
    const adaptiveThermogenesis = Math.round(baseActivityTdee * adaptiveThermogenesisRate);
    
    const calculatedTdee = baseActivityTdee - adaptiveThermogenesis;
    
    setBmr(calculatedBmr);
    setTdee(calculatedTdee);
  }, [currentWeight, height, age, gender, activityLevel, targetWeight]);
  
  // Научно обоснованные расчеты с учетом пола
  const optimalDeficitPercentage = gender === "male" ? 23 : 20; // Для женщин более низкий дефицит
  const optimalDeficit = Math.round(tdee * (optimalDeficitPercentage / 100));
  const optimalIntake = tdee - optimalDeficit;
  
  // Макронутриенты (с учетом пола)
  const proteinPerKg = gender === "male" ? 2.0 : 2.2; // Женщинам нужно больше белка для сохранения мышц
  const dailyProteinGrams = Math.round(currentWeight * proteinPerKg);
  const proteinCalories = dailyProteinGrams * 4;
  
  const fatPercentage = gender === "male" ? 30 : 35; // Женщинам нужно больше жиров для гормонального здоровья
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
  const waterPerDay = Math.round((currentWeight * 0.033) * 10) / 10; // 33 мл на кг веса
  const recommendedFiber = Math.round(optimalIntake / 1000 * 14); // 14г клетчатки на 1000 ккал
  
  // Рефиды
  const refeedDay = tdee;
  
  // Расчеты для графиков
  const weightToLose = currentWeight - targetWeight;
  const scientificCaloriesPerKg = 8800;
  
  const deficitPercentageOptimal = (optimalDeficit / tdee) * 100;
  const deficitPercentageFast = 37.8; // из расчетов
  
  // Потеря мышц
  const muscleLossPercentageOptimal = 20; // Из расчетов
  const muscleLossPercentageFast = 30; // Из расчетов
  
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
  
  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Научно обоснованный калькулятор калорий для похудения</CardTitle>
          <CardDescription>
            Расчеты основаны на современных научных исследованиях в области диетологии и метаболизма
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="main">
            <TabsList className="grid w-full grid-cols-5 mb-4">
              <TabsTrigger value="main">Основные рекомендации</TabsTrigger>
              <TabsTrigger value="progress">Прогноз снижения веса</TabsTrigger>
              <TabsTrigger value="nutrition">Макронутриенты</TabsTrigger>
              <TabsTrigger value="training">Тренировки</TabsTrigger>
              <TabsTrigger value="lifestyle">Образ жизни</TabsTrigger>
            </TabsList>
          
            <TabsContent value="main">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Персональные параметры</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 items-center gap-2">
                      <Label htmlFor="current-weight">Текущий вес (кг):</Label>
                      <Input
                        id="current-weight"
                        type="number"
                        value={currentWeight}
                        onChange={(e) => setCurrentWeight(parseFloat(e.target.value) || 0)}
                        className="col-span-2"
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 items-center gap-2">
                      <Label htmlFor="target-weight">Целевой вес (кг):</Label>
                      <Input
                        id="target-weight"
                        type="number"
                        value={targetWeight}
                        onChange={(e) => setTargetWeight(parseFloat(e.target.value) || 0)}
                        className="col-span-2"
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 items-center gap-2">
                      <Label htmlFor="height">Рост (см):</Label>
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                        className="col-span-2"
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 items-center gap-2">
                      <Label htmlFor="age">Возраст:</Label>
                      <Input
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                        className="col-span-2"
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 items-center gap-2">
                      <Label htmlFor="gender">Пол:</Label>
                      <Select
                        value={gender}
                        onValueChange={setGender}
                      >
                        <SelectTrigger id="gender" className="col-span-2">
                          <SelectValue placeholder="Выберите пол" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Мужской</SelectItem>
                          <SelectItem value="female">Женский</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-3 items-center gap-2">
                      <Label htmlFor="activity-level">Уровень активности:</Label>
                      <Select
                        value={activityLevel}
                        onValueChange={setActivityLevel}
                      >
                        <SelectTrigger id="activity-level" className="col-span-2">
                          <SelectValue placeholder="Выберите уровень активности" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">Сидячий образ жизни</SelectItem>
                          <SelectItem value="light">Легкая активность (1-3 раза в неделю)</SelectItem>
                          <SelectItem value="moderate">Умеренная активность (3-5 раз в неделю)</SelectItem>
                          <SelectItem value="active">Активный образ жизни (6-7 раз в неделю)</SelectItem>
                          <SelectItem value="veryActive">Очень активный (спортсмены, физ. работа)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-3 items-center gap-2">
                      <Label htmlFor="diet-type">Тип диеты:</Label>
                      <Select
                        value={dietType}
                        onValueChange={setDietType}
                      >
                        <SelectTrigger id="diet-type" className="col-span-2">
                          <SelectValue placeholder="Выберите тип диеты" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Стандартный научный подход</SelectItem>
                          <SelectItem value="cyclic">Циклическое углеводное питание (5+2)</SelectItem>
                          <SelectItem value="carb-backloading">Углеводная загрузка вечером</SelectItem>
                          <SelectItem value="if">Интервальное голодание (16:8)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mt-6 mb-3">Научные показатели</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>Базовый метаболизм (BMR):</div>
                    <div className="font-bold">{bmr} ккал</div>
                    
                    <div title="С учетом адаптивного термогенеза">Общий расход энергии (TDEE):</div>
                    <div className="font-bold">{tdee} ккал</div>
                    
                    <div>Оптимальный дефицит:</div>
                    <div className="font-bold">{optimalDeficit} ккал ({optimalDeficitPercentage.toFixed(0)}% от TDEE)</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Научно оптимальный план питания</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                      <div className="font-medium">Рекомендуемое ежедневное потребление:</div>
                      <div className="font-bold text-lg">{optimalIntake} ккал/день</div>
                      <div className="text-sm text-gray-600 mt-1">Оптимальный дефицит {optimalDeficit} ккал ({optimalDeficitPercentage.toFixed(0)}% от TDEE)</div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-md border border-green-200">
                      <div className="font-medium">День повышенной калорийности (рефид):</div>
                      <div className="font-bold text-lg">{refeedDay} ккал/день</div>
                      <div className="text-sm text-gray-600 mt-1">1 день в неделю для поддержания метаболизма</div>
                    </div>
                    
                    <div className="p-3 bg-purple-50 rounded-md border border-purple-200">
                      <div className="font-medium">Ожидаемое время достижения цели:</div>
                      <div className="font-bold text-lg">{totalWeeksWithBreaks} недель</div>
                      <div className="text-sm text-gray-600 mt-1">С учетом диетических перерывов каждые 6 недель</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 rounded-md border border-amber-200">
                <h3 className="text-lg font-medium mb-2">Научные рекомендации с учетом пола ({gender === "male" ? "мужчина" : "женщина"}):</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Поддерживайте высокое потребление белка — <strong>{dailyProteinGrams} г/день</strong> ({proteinPerKg} г на кг веса) для сохранения мышечной массы</li>
                  <li>Используйте стратегию <strong>рефидов</strong> (1 день в неделю с повышенной калорийностью до {refeedDay} ккал) для предотвращения метаболических адаптаций</li>
                  <li>Делайте <strong>диетические перерывы</strong> на 7 дней каждые {gender === "male" ? "6" : "4"} недель для восстановления гормонального баланса</li>
                  <li>Потребляйте минимум <strong>{recommendedFiber} г клетчатки</strong> в день и <strong>{waterPerDay} л воды</strong> для оптимального здоровья микробиома</li>
                  <li>Сократите окно питания до <strong>{gender === "male" ? "8-10" : "10-12"} часов</strong> в день для улучшения метаболизма на 5-15%</li>
                  {gender === "female" && (
                    <li><strong>Цикличность питания:</strong> Увеличивайте калорийность на 100-200 ккал в лютеиновой фазе цикла (вторая половина)</li>
                  )}
                  <li>После достижения цели, постепенно увеличивайте калории на 100 ккал в неделю до уровня поддержания</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="progress">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Прогноз снижения веса</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trajectoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[targetWeight - 1, currentWeight + 1]} />
                      <Tooltip />
                      <Legend />
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
                  <div className="text-sm text-gray-600 mt-2">
                    * График учитывает адаптивный термогенез, периодизацию диеты и диетические перерывы
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Состав потери веса</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={muscleLossData} stackOffset="expand" layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={(value) => `${(value*100).toFixed(0)}%`} />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip formatter={(value) => `${value.toFixed(1)} кг`} />
                      <Legend />
                      <Bar dataKey="fat" name="Жировая ткань" stackId="a" fill="#10b981" />
                      <Bar dataKey="muscle" name="Мышечная ткань" stackId="a" fill="#f87171" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="text-sm text-gray-600 mt-2">
                    * На основе научных данных о сохранении мышечной массы при разных дефицитах калорий
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                <h3 className="text-lg font-medium mb-2">Научное обоснование прогноза с учетом пола:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Адаптивный термогенез:</strong> {gender === "male" ? "У мужчин метаболизм снижается на 10-15%" : "У женщин метаболизм снижается на 15-20%"} при потере 10% массы тела</li>
                  <li><strong>Потеря мышечной массы:</strong> При дефиците {optimalDeficitPercentage.toFixed(0)}% от TDEE около {gender === "male" ? muscleLossPercentageOptimal : muscleLossPercentageOptimal + 5}% от потери веса приходится на мышцы</li>
                  <li><strong>Гормональные особенности:</strong> {gender === "male" ? "Высокий уровень тестостерона способствует сохранению мышечной массы" : "Эстроген способствует сохранению жировой ткани для репродуктивного здоровья"}</li>
                  <li><strong>Рефиды:</strong> Периодическое повышение калорийности до поддерживающего уровня помогает поддерживать метаболизм и уровень гормонов</li>
                  <li><strong>Диетические перерывы:</strong> 7-дневные перерывы {gender === "male" ? "каждые 6 недель" : "каждые 4 недели"} восстанавливают уровень лептина и снижают метаболическую адаптацию</li>
                  <li><strong>Хронобиология:</strong> Временно-ограниченное питание может сократить время достижения цели с {weeksToGoalWithRefeed} до {improvedWeeksToGoal} недель</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="nutrition">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Оптимальное распределение макронутриентов</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={macroData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" label={{ value: 'Граммы', angle: -90, position: 'insideLeft' }} />
                      <YAxis yAxisId="right" orientation="right" label={{ value: 'Калории', angle: 90, position: 'insideRight' }} />
                      <Tooltip formatter={(value, name, props) => [value, props.payload.name]} />
                      <Legend />
                      <Bar yAxisId="left" dataKey="grams" name="Граммы" fill="#3b82f6" />
                      <Bar yAxisId="right" dataKey="calories" name="Калории" fill="#60a5fa" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Оптимальное соотношение макронутриентов</h3>
                  <div className="space-y-6">
                    <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                      <div className="font-medium">Белки: {dailyProteinGrams} г ({proteinCalories} ккал)</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${Math.round(proteinCalories/optimalIntake*100)}%` }}></div>
                      </div>
                      <div className="text-sm mt-1">{Math.round(proteinCalories/optimalIntake*100)}% от общей калорийности</div>
                      <div className="text-sm text-gray-600 mt-1">Научная рекомендация: {proteinPerKg} г/кг веса тела для сохранения мышечной массы</div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-md border border-green-200">
                      <div className="font-medium">Жиры: {dailyFatGrams} г ({fatCalories} ккал)</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${Math.round(fatCalories/optimalIntake*100)}%` }}></div>
                      </div>
                      <div className="text-sm mt-1">{Math.round(fatCalories/optimalIntake*100)}% от общей калорийности</div>
                      <div className="text-sm text-gray-600 mt-1">Научная рекомендация: 25-35% калорий из жиров для гормонального баланса</div>
                    </div>
                    
                    <div className="p-3 bg-purple-50 rounded-md border border-purple-200">
                      <div className="font-medium">Углеводы: {dailyCarbGrams} г ({carbCalories} ккал)</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${Math.round(carbCalories/optimalIntake*100)}%` }}></div>
                      </div>
                      <div className="text-sm mt-1">{Math.round(carbCalories/optimalIntake*100)}% от общей калорийности</div>
                      <div className="text-sm text-gray-600 mt-1">Остаток калорий после обеспечения потребностей в белках и жирах</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 rounded-md border border-amber-200">
                <h3 className="text-lg font-medium mb-2">Научные рекомендации для {gender === "male" ? "мужчин" : "женщин"}:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Циклическое питание:</strong> {gender === "male" ? "Рассмотрите стратегию 5+2 (5 дней с низким содержанием углеводов, 2 дня с умеренным)" : "Синхронизируйте углеводные дни с фазами менструального цикла (больше углеводов во второй фазе)"}</li>
                  <li><strong>Распределение приемов пищи:</strong> {gender === "male" ? "3-4 приема пищи" : "4-5 небольших приемов пищи"} равномерно распределенных в течение дня</li>
                  <li><strong>Белок:</strong> Распределите равномерно по всем приемам пищи (минимум {gender === "male" ? "25-30" : "20-25"} г за прием)</li>
                  <li><strong>Клетчатка:</strong> Включите минимум {recommendedFiber}г клетчатки ежедневно для здоровья микробиома</li>
                  <li><strong>Рефид день:</strong> {gender === "male" ? "Увеличьте в основном углеводы" : "Увеличьте углеводы и небольшое количество полезных жиров"}, сохраняя потребление белка на высоком уровне</li>
                  <li><strong>Тренировочные дни:</strong> Можно увеличить потребление углеводов на {gender === "male" ? "20-30" : "15-25"} г в дни тренировок</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="training">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Оптимальная структура тренировок</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart outerRadius={90} data={[
                      { name: 'Силовые', value: 35, fullMark: 100 },
                      { name: 'HIIT', value: 30, fullMark: 100 },
                      { name: 'LISS', value: 20, fullMark: 100 },
                      { name: 'Гибкость', value: 10, fullMark: 100 },
                      { name: 'Восстановление', value: 5, fullMark: 100 }
                    ]}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Оптимальное распределение" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    * Научно оптимальное распределение тренировочных модальностей (% от общего объема)
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Недельный план тренировок для {gender === "male" ? "мужчин" : "женщин"}</h3>
                  <div className="space-y-3">
                    <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
                      <div className="font-medium">Понедельник: {gender === "male" ? "Силовая (верх тела)" : "Силовая (полное тело, акцент на верх)"}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        3-4 упражнения для верхней части тела, 3-4 подхода по {gender === "male" ? "6-12" : "8-15"} повторений<br/>
                        Интенсивность: {gender === "male" ? "70-85%" : "65-80%"} от 1ПМ, время восстановления: {gender === "male" ? "1-2" : "1-1.5"} мин
                      </div>
                    </div>
                    
                    <div className="p-2 bg-green-50 rounded-md border border-green-200">
                      <div className="font-medium">Вторник: HIIT</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {gender === "male" ? "20-30" : "15-25"} мин интервальной тренировки ({gender === "male" ? "20-30" : "15-25"} сек работы, {gender === "male" ? "60-90" : "45-75"} сек отдыха)<br/>
                        Рекомендации: {gender === "male" ? "велотренажер, гребля, спринты" : "велотренажер, эллипс, функциональные упражнения"} или кроссфит-элементы
                      </div>
                    </div>
                    
                    <div className="p-2 bg-purple-50 rounded-md border border-purple-200">
                      <div className="font-medium">Среда: {gender === "male" ? "Активное восстановление" : "Активное восстановление + мобильность"}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        20-30 мин легкой активности (ходьба, йога, стретчинг)<br/>
                        {gender === "female" && "Дополнительные упражнения на мобильность тазобедренных суставов и плеч"}
                      </div>
                    </div>
                    
                    <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
                      <div className="font-medium">Четверг: {gender === "male" ? "Силовая (низ тела)" : "Силовая (полное тело, акцент на низ)"}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        3-4 упражнения для нижней части тела, 3-4 подхода по {gender === "male" ? "6-12" : "10-15"} повторений<br/>
                        {gender === "female" && "Особый акцент на ягодичные мышцы и заднюю поверхность бедра"}<br/>
                        Интенсивность: {gender === "male" ? "70-85%" : "65-80%"} от 1ПМ, время восстановления: {gender === "male" ? "2-3" : "1.5-2.5"} мин
                      </div>
                    </div>
                    
                    <div className="p-2 bg-green-50 rounded-md border border-green-200">
                      <div className="font-medium">Пятница: {gender === "male" ? "HIIT" : "Комплексная тренировка (HIIT + силовые элементы)"}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {gender === "male" ? "20-30 мин интервальной тренировки" : "30-40 мин комбинированной тренировки с круговыми элементами"}<br/>
                        Рекомендации: функциональные упражнения с весом тела или легкими весами
                      </div>
                    </div>
                    
                    <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
                      <div className="font-medium">Суббота: {gender === "male" ? "Силовая (общая)" : "Силовая (акцент на проблемные зоны)"}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Полнотелая тренировка с акцентом на многосуставные движения<br/>
                        {gender === "female" && "Дополнительный акцент на корсетные мышцы и стабилизаторы"}<br/>
                        3-5 упражнений, 3 подхода, фокус на технику и прогрессию весов
                      </div>
                    </div>
                    
                    <div className="p-2 bg-amber-50 rounded-md border border-amber-200">
                      <div className="font-medium">Воскресенье: LISS</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {gender === "male" ? "40-60" : "45-70"} мин низкоинтенсивной кардио-активности (ходьба, велосипед)<br/>
                        Интенсивность: 50-65% от максимального пульса, разговорный темп
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                <h3 className="text-lg font-medium mb-2">Научные принципы периодизации тренировок:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Прогрессия нагрузки: увеличение на 2.5-5% каждые 1-2 недели</li>
                      <li>Волновая периодизация: чередование недель высокой (85% 1ПМ) и средней (70% 1ПМ) интенсивности</li>
                      <li>Недельный объем: 10-15 рабочих подходов на основные группы мышц</li>
                      <li>EPOC эффект: HIIT тренировки повышают расход калорий на 6-15% в течение 24 часов</li>
                      <li>Разнообразие стимулов: смена упражнений каждые 3-4 недели для предотвращения адаптации</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm mb-2">Научные исследования демонстрируют, что оптимальная программа тренировок при похудении должна включать как силовые тренировки, так и кардио разной интенсивности. Силовые тренировки критически важны для сохранения мышечной массы в условиях калорийного дефицита.</p>
                    <p className="text-sm">Высокоинтенсивные интервальные тренировки (HIIT) значительно повышают расход энергии после тренировки и улучшают чувствительность к инсулину, в то время как низкоинтенсивные продолжительные тренировки (LISS) минимально влияют на аппетит и помогают в активном восстановлении.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="lifestyle">
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
                  <h3 className="text-lg font-medium mb-3">Оптимизация образа жизни</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                      <div className="font-medium">Хронобиология питания</div>
                      <div className="text-sm mt-1">Окно питания: <strong>{gender === "male" ? "8-10" : "10-12"} часов</strong></div>
                      <div className="text-sm text-gray-600">Может повысить эффективность метаболизма на 5-15%</div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-700">Рекомендуемое окно:</p>
                        <div className="w-full bg-gray-200 h-6 mt-1 rounded-md relative">
                          <div className="absolute inset-0 flex items-center justify-between px-2 text-xs">
                            <span>6:00</span>
                            <span>12:00</span>
                            <span>18:00</span>
                            <span>24:00</span>
                          </div>
                          <div className="absolute h-full bg-blue-300 rounded-md" style={{ left: gender === "male" ? "33%" : "29%", width: gender === "male" ? "42%" : "50%" }}></div>
                          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                            {gender === "male" ? "10:00 - 18:00" : "9:00 - 19:00"}
                          </div>
                        </div>
                      </div>
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
                      <div className="text-sm text-gray-600">Недостаток сна может увеличить потерю мышц на 60-70%</div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-700">Влияние сна на гормоны:</p>
                        <div className="grid grid-cols-2 gap-1 mt-1">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                            <span className="text-xs">↑ Тестостерон, гормон роста</span>
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
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Психологические аспекты похудения</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-amber-50 rounded-md border border-amber-200">
                    <div className="font-medium">Когнитивные стратегии</div>
                    <ul className="list-disc pl-5 mt-1 text-sm">
                      <li>Реалистичные цели (не более 1% от веса тела в неделю)</li>
                      <li>Фокус на процессе, а не только результате</li>
                      <li>Развитие внутренней, а не внешней мотивации</li>
                      <li>Отслеживание прогресса в разных метриках (не только вес)</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-amber-50 rounded-md border border-amber-200">
                    <div className="font-medium">Стратегии управления стрессом</div>
                    <ul className="list-disc pl-5 mt-1 text-sm">
                      <li>Практика осознанности и медитации (5-10 мин/день)</li>
                      <li>Техники глубокого дыхания (4-7-8 метод)</li>
                      <li>Регулярная физическая активность</li>
                      <li>Достаточный сон (7-9 часов/ночь)</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-amber-50 rounded-md border border-amber-200">
                    <div className="font-medium">Устойчивое изменение пищевого поведения</div>
                    <ul className="list-disc pl-5 mt-1 text-sm">
                      <li>Постепенные изменения вместо радикальных</li>
                      <li>Осознанное питание (без отвлечений)</li>
                      <li>Планирование приемов пищи заранее</li>
                      <li>Баланс между строгостью и гибкостью (80/20 принцип)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-md border border-blue-200 mt-4">
                  <h3 className="text-lg font-medium mb-2">Научно обоснованные добавки:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Креатин моногидрат:</strong> 5г/день</li>
                        <li><strong>Кофеин:</strong> 3-6 мг/кг веса тела (300-600 мг/день)</li>
                        <li><strong>Омега-3 жирные кислоты:</strong> 2-4г EPA+DHA в день</li>
                        <li><strong>Витамин D:</strong> 2000-5000 МЕ/день при дефиците</li>
                        <li><strong>Магний:</strong> 200-400 мг/день (глицинат или цитрат)</li>
                        <li><strong>L-карнитин:</strong> 2-4г/день (особенно для вегетарианцев)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm mb-2">Сила доказательной базы:</p>
                      <ul className="list-none space-y-1 text-sm">
                        <li className="flex items-center">
                          <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                          <span><strong>Сильная</strong>: креатин, кофеин, белковые добавки</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                          <span><strong>Средняя</strong>: омега-3, витамин D, магний</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
                          <span><strong>Умеренная</strong>: L-карнитин, пробиотики</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          <span><strong>Слабая</strong>: большинство других добавок для похудения</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScientificCalorieCalculator;