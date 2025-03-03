// Определяем тип для уровней активности
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
export type DietType = 'standard' | 'cyclic' | 'carb-backloading' | 'if';
export type Gender = 'male' | 'female';
export type WeightGoal = 'loss' | 'gain';

// Интерфейс для данных калькулятора
export interface CalculatorData {
  // Основные параметры
  gender: Gender;
  setGender: (value: Gender) => void;
  currentWeight: number | null;
  setCurrentWeight: (value: number | null) => void;
  targetWeight: number | null;
  setTargetWeight: (value: number | null) => void;
  height: number | null;
  setHeight: (value: number | null) => void;
  age: number | null;
  setAge: (value: number | null) => void;
  bodyFatPercentage: number | null;
  setBodyFatPercentage: (value: number | null) => void;
  activityLevel: ActivityLevel;
  setActivityLevel: (value: ActivityLevel) => void;
  dietType: DietType;
  setDietType: (value: DietType) => void;
  
  // Цель по весу (похудение или набор массы)
  weightGoal: WeightGoal;
  
  // Рассчитанные значения
  bmr: number;
  tdee: number;
  optimalDeficitPercentage: number;
  optimalDeficit: number;
  optimalIntake: number;
  
  // Макронутриенты
  proteinPerKg: number;
  dailyProteinGrams: number;
  proteinCalories: number;
  dailyFatGrams: number;
  fatCalories: number;
  dailyCarbGrams: number;
  carbCalories: number;
  
  // Термический эффект пищи
  totalTEF: number;
  proteinTEF: number;
  carbTEF: number;
  fatTEF: number;
  
  // Рекомендации
  waterPerDay: number;
  recommendedFiber: number;
  refeedDay: number;
  
  // Прогноз и расчеты
  weightToLose: number;
  scientificCaloriesPerKg: number;
  deficitPercentageOptimal: number;
  deficitPercentageFast: number;
  muscleLossPercentageOptimal: number;
  muscleLossPercentageFast: number;
  totalMuscleLossOptimal: number;
  totalMuscleLossFast: number;
  weeklyOptimalDeficitWithRefeed: number;
  daysToGoalWithRefeed: number;
  weeksToGoalWithRefeed: number;
  dietBreakWeeks: number;
  totalWeeksWithBreaks: number;
  chronobiologyImprovement: number;
  improvedWeeksToGoal: number;
  
  // Данные для графиков
  macroData: {
    name: string;
    grams: number;
    calories: number;
    percent: number;
  }[];
  muscleLossData: {
    name: string;
    fat: number;
    muscle: number;
  }[];
  trajectoryData: {
    week: string;
    scientific: number;
    fast: number;
  }[];
  tefData: {
    name: string;
    value: number;
    color: string;
  }[];
  
  // Параметры для типов диеты
  lowCarbDays: number;
  modCarbDays: number;
  carbTimingPreference: string;
  feedingWindow: number;
  lowCarbCarbGrams: number;
  modCarbCarbGrams: number;
} 