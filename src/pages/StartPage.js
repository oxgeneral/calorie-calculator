import React from 'react';
import Layout from '../components/Layout';
import { useAppContext } from '../context/AppContext';

const StartPage = () => {
  const { setActiveScreen } = useAppContext();

  return (
    <Layout title="Личный научный диетолог">
      <div className="flex flex-col items-center justify-center h-full space-y-8 py-8">
        {/* Иконка или логотип */}
        <div className="text-primary w-24 h-24 flex items-center justify-center rounded-full bg-primary/10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="1" x2="6" y2="4"></line>
            <line x1="10" y1="1" x2="10" y2="4"></line>
            <line x1="14" y1="1" x2="14" y2="4"></line>
          </svg>
        </div>
        
        {/* Заголовок */}
        <h1 className="text-3xl font-bold text-center text-primary">
          Калькулятор Калорий 2.0
        </h1>
        
        {/* Описание */}
        <div className="text-center space-y-4 px-4">
          <p className="text-lg">
            Добро пожаловать в научный помощник для достижения ваших целей по питанию и здоровью
          </p>
          
          <p className="text-gray-600">
            Рассчитайте свои индивидуальные потребности в калориях, 
            получите план питания и рекомендации по активности, 
            основанные на научном подходе.
          </p>
        </div>
        
        {/* Кнопка для начала */}
        <button
          onClick={() => setActiveScreen('settings')}
          className="w-64 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105 focus:outline-none"
        >
          Начать улучшение
        </button>
      </div>
    </Layout>
  );
};

export default StartPage; 