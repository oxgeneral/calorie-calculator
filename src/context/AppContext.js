import React, { createContext, useContext, useState, useEffect } from 'react';

// Начальное состояние
const initialState = {
  // Пользовательские данные
  gender: 'male',
  currentWeight: 97.3,
  targetWeight: 90,
  height: 189,
  age: 32,
  bodyFat: 29.0,
  activityLevel: 'light',
  dietType: 'standard',
  
  // Расчетные данные
  bmr: 0,
  tdee: 0,
  recommendedCalories: 0,
  macros: {
    protein: 0,
    fats: 0,
    carbs: 0,
  },
  
  // Текущий активный экран
  activeScreen: 'start',
  
  // Результаты расчетов
  weightLossGoal: false, // true - похудение, false - набор массы
  weeksToGoal: 0,
  weightTrajectory: [],
};

// Константы для расчетов
export const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

// Создаем контекст
const AppContext = createContext();

// Провайдер контекста
export const AppProvider = ({ children }) => {
  // Проверяем, есть ли сохраненные данные в localStorage
  const savedState = localStorage.getItem('dietAppState');
  
  // Инициализируем состояние
  const [state, setState] = useState(
    savedState ? JSON.parse(savedState) : initialState
  );
  
  // Обновляем localStorage при изменении состояния
  useEffect(() => {
    localStorage.setItem('dietAppState', JSON.stringify(state));
  }, [state]);
  
  // Функция для обновления user settings
  const updateUserSettings = (settings) => {
    setState(prevState => {
      const newState = { ...prevState, ...settings };
      
      // Определяем цель (похудение или набор массы)
      const weightLossGoal = newState.targetWeight < newState.currentWeight;
      
      // Рассчитываем BMR по формуле Mifflin-St. Jeor
      let bmr;
      if (newState.gender === 'male') {
        bmr = 10 * newState.currentWeight + 6.25 * newState.height - 5 * newState.age + 5;
      } else {
        bmr = 10 * newState.currentWeight + 6.25 * newState.height - 5 * newState.age - 161;
      }
      
      // Рассчитываем TDEE
      const tdee = bmr * ACTIVITY_MULTIPLIERS[newState.activityLevel];
      
      // Рассчитываем рекомендуемое потребление калорий
      const recommendedCalories = weightLossGoal ? tdee - 500 : tdee + 250;
      
      // Рассчитываем макронутриенты
      const proteinPerKg = weightLossGoal ? 1.5 : 2.0; // г/кг
      const protein = Math.round(newState.currentWeight * proteinPerKg);
      const fatPercentage = 0.25; // 25% от калорий
      const fats = Math.round((recommendedCalories * fatPercentage) / 9); // 9 калорий на грамм жира
      const carbs = Math.round((recommendedCalories - (protein * 4) - (fats * 9)) / 4); // 4 калории на грамм углеводов
      
      // Рассчитываем время достижения цели
      const weeklyWeightChange = weightLossGoal ? 0.5 : 0.25; // кг в неделю
      const totalWeightChange = Math.abs(newState.targetWeight - newState.currentWeight);
      const weeksToGoal = Math.ceil(totalWeightChange / weeklyWeightChange);
      
      // Создаем траекторию изменения веса
      const weightTrajectory = [];
      for (let i = 0; i <= weeksToGoal; i++) {
        const weight = weightLossGoal 
          ? newState.currentWeight - (weeklyWeightChange * i)
          : newState.currentWeight + (weeklyWeightChange * i);
        weightTrajectory.push({ week: i, weight: Number(weight.toFixed(1)) });
      }
      
      return {
        ...newState,
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        recommendedCalories: Math.round(recommendedCalories),
        macros: {
          protein,
          fats,
          carbs,
        },
        weightLossGoal,
        weeksToGoal,
        weightTrajectory,
        activeScreen: 'menu'
      };
    });
  };
  
  // Функция для изменения активного экрана
  const setActiveScreen = (screen) => {
    setState(prevState => ({
      ...prevState,
      activeScreen: screen
    }));
  };
  
  // Функция для сброса настроек
  const resetSettings = () => {
    setState(initialState);
  };
  
  return (
    <AppContext.Provider 
      value={{ 
        state, 
        updateUserSettings, 
        setActiveScreen,
        resetSettings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Хук для использования контекста
export const useAppContext = () => useContext(AppContext); 