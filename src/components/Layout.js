import React from 'react';
import { useAppContext } from '../context/AppContext';

// Компонент Layout для общего стиля и структуры всех экранов
const Layout = ({ children, title }) => {
  const { state, setActiveScreen } = useAppContext();
  
  // Функция для отображения кнопки "Назад" только если не на экране настроек
  const showBackButton = state.activeScreen !== 'settings';
  
  return (
    <div className="flex min-h-screen bg-gray-100 justify-center">
      <div className="max-w-mobile w-full bg-white min-h-screen shadow-lg flex flex-col">
        {/* Шапка */}
        <header className="bg-primary text-white p-4 flex items-center">
          {showBackButton && (
            <button 
              onClick={() => setActiveScreen('menu')} 
              className="mr-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h1 className="text-xl font-bold flex-grow text-center">
            {title || "Личный научный диетолог"}
          </h1>
        </header>
        
        {/* Основное содержимое */}
        <main className="flex-grow p-4">
          {children}
        </main>
        
        {/* Подвал */}
        <footer className="p-4 text-center text-sm text-gray-500 border-t">
          Основано на научном подходе и индивидуальных параметрах
        </footer>
      </div>
    </div>
  );
};

export default Layout; 