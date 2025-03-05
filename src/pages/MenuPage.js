import React from 'react';
import Layout from '../components/Layout';
import { useAppContext } from '../context/AppContext';

// Компонент пункта меню
const MenuItem = ({ title, description, screen, icon }) => {
  const { setActiveScreen } = useAppContext();
  
  return (
    <button
      onClick={() => setActiveScreen(screen)}
      className="w-full text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 mb-4 flex items-start"
    >
      <div className="flex-shrink-0 mr-4 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
      <div className="ml-auto flex-shrink-0 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
};

const MenuPage = () => {
  const { state, resetSettings, setActiveScreen } = useAppContext();
  
  // Определяем тип цели (похудение или набор массы)
  const goalType = state.weightLossGoal ? 'похудения' : 'набора массы';
  
  return (
    <Layout title="Личный научный диетолог">
      <div className="mb-6">
        <div className="bg-primary bg-opacity-10 rounded-lg p-4 flex flex-col items-center mb-6">
          <h2 className="text-lg font-bold text-primary mb-2">
            Программа для {goalType}
          </h2>
          <p className="text-gray-700 text-center">
            {state.currentWeight} кг → {state.targetWeight} кг
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Примерное время достижения цели: {state.weeksToGoal} недель
          </p>
        </div>
        
        <div className="space-y-4">
          <MenuItem
            title="Основные расчеты"
            description="BMR, TDEE и рекомендации по калорийности"
            screen="calculations"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            }
          />
          
          <MenuItem
            title="График изменения веса"
            description="Визуализация прогнозируемой траектории веса"
            screen="weight_trajectory"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            }
          />
          
          <MenuItem
            title="Рекомендации по питанию"
            description="Макронутриенты и план питания"
            screen="nutrition"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          
          <MenuItem
            title="Физическая активность"
            description="Рекомендуемые тренировки и их интенсивность"
            screen="activity"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
          />
          
          <MenuItem
            title="Рекомендации по образу жизни"
            description="Сон, управление стрессом и другие советы"
            screen="lifestyle"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
        </div>
      </div>
      
      <div className="flex justify-between gap-4">
        <button
          onClick={() => resetSettings()}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          Сбросить настройки
        </button>
        
        <button
          onClick={() => setActiveScreen('settings')}
          className="flex-1 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none"
        >
          Изменить параметры
        </button>
      </div>
    </Layout>
  );
};

export default MenuPage; 