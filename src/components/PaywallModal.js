import React from 'react';

const PaywallModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  // Функция для открытия ссылки на телеграм в новой вкладке
  const handleBuySubscription = () => {
    window.open('https://t.me/ooogeneral', '_blank');
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-primary mb-2">Подписка Plus+ на сервис личного научного диетолога</h3>
          <div className="h-1 w-16 bg-primary mx-auto"></div>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">Подробная программа тренировок каждую неделю</span>
          </div>
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">Подробная программа питания каждую неделю</span>
          </div>
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <span className="text-gray-700 block">Ответы на вопросы по любой теме:</span>
              <ul className="pl-6 mt-1 space-y-1 text-sm text-gray-600">
                <li className="list-disc">Влияние тренировок на вес</li>
                <li className="list-disc">Влияние питания на энергию</li>
                <li className="list-disc">Влияние секса на активность мозга и тела</li>
                <li className="italic">и другие</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={handleBuySubscription}
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
          >
            Купить за 349 рублей в неделю
          </button>
          
          <button 
            onClick={handleBuySubscription}
            className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
          >
            Купить за 990 <s>1396</s> рублей в месяц
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal; 