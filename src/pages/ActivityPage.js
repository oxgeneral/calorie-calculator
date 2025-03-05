import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAppContext } from '../context/AppContext';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import PaywallModal from '../components/PaywallModal';

// Регистрируем необходимые компоненты Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Компонент для отображения тренировки
const WorkoutCard = ({ title, description, frequency, intensity, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-3">
        <div className="flex-shrink-0 mr-3 text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-700 mb-3">{description}</p>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{frequency}</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>{intensity}</span>
        </div>
      </div>
    </div>
  );
};

// Компонент карточки дня тренировки
const TrainingDayCard = ({ day, title, description, color }) => {
  // Определяем класс цвета фона карточки
  let colorClass = 'bg-blue-100 border-blue-300';
  if (color === 'purple') {
    colorClass = 'bg-purple-100 border-purple-300';
  } else if (color === 'green') {
    colorClass = 'bg-green-100 border-green-300';
  } else if (color === 'amber') {
    colorClass = 'bg-amber-100 border-amber-300';
  }

  return (
    <div className={`p-3 rounded-lg border ${colorClass} mb-3`}>
      <h4 className="font-bold text-gray-800">{day}: {title}</h4>
      <p className="text-sm text-gray-700 mt-1">{description}</p>
    </div>
  );
};

const ActivityPage = () => {
  const { state } = useAppContext();
  const [showPaywall, setShowPaywall] = useState(false);
  
  // Определяем пол и цель
  const isMale = state.gender === 'male';
  const isWeightLoss = state.weightLossGoal;
  const genderText = isMale ? 'мужчин' : 'женщин';
  const goalType = isWeightLoss ? 'снижения веса' : 'набора массы';
  
  // Данные для радарной диаграммы в зависимости от пола и цели
  const getTrainingData = () => {
    if (isMale) {
      return isWeightLoss ? {
        // Мужчины, снижение веса
        labels: ['Силовые тренировки', 'HIIT', 'LISS', 'Гибкость', 'Восстановление'],
        data: [35, 25, 20, 10, 10],
      } : {
        // Мужчины, набор массы
        labels: ['Силовые тренировки', 'HIIT', 'LISS', 'Гибкость', 'Восстановление'],
        data: [65, 10, 5, 10, 10],
      };
    } else {
      return isWeightLoss ? {
        // Женщины, снижение веса
        labels: ['Силовые тренировки', 'HIIT', 'LISS', 'Гибкость', 'Восстановление'],
        data: [30, 25, 25, 10, 10],
      } : {
        // Женщины, набор массы
        labels: ['Силовые тренировки', 'HIIT', 'LISS', 'Гибкость', 'Восстановление'],
        data: [60, 5, 15, 10, 10],
      };
    }
  };
  
  // Получаем данные для диаграммы
  const trainingData = getTrainingData();
  
  // Настройки для радарной диаграммы
  const chartData = {
    labels: trainingData.labels,
    datasets: [
      {
        label: 'Оптимальное распределение',
        data: trainingData.data,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          callback: function(value) {
            return value + '%';
          }
        }
      }
    },
    maintainAspectRatio: false,
  };
  
  // Функция для рендеринга плана тренировок на неделю
  const renderTrainingPlan = () => {
    if (isMale) {
      if (isWeightLoss) {
        // План для мужчин, снижение веса
        return (
          <>
            <TrainingDayCard day="Понедельник" title="Силовая (верх тела)" description="4 упражнения, 3 подхода по 10-12 повторений. Фокус на грудь, спину и плечи. Отдых 60-90 сек между подходами." color="blue" />
            <TrainingDayCard day="Вторник" title="HIIT" description="20-30 минут высокоинтенсивной интервальной тренировки. Чередование 30 сек максимальной интенсивности с 90 сек отдыха." color="green" />
            <TrainingDayCard day="Среда" title="Силовая (нижняя часть тела)" description="4 упражнения, 3 подхода по 10-12 повторений. Фокус на ноги и кор. Отдых 60-90 сек между подходами." color="blue" />
            <TrainingDayCard day="Четверг" title="LISS" description="40-60 минут низкоинтенсивной кардио-тренировки (ходьба, велосипед, плавание) на уровне 60-70% от максимальной ЧСС." color="amber" />
            <TrainingDayCard day="Пятница" title="Силовая (все тело)" description="6 упражнений, 3 подхода по 10-12 повторений. Комплексные упражнения на все тело. Отдых 60-90 сек между подходами." color="blue" />
            <TrainingDayCard day="Суббота" title="HIIT" description="20-30 минут высокоинтенсивной интервальной тренировки. Чередование 30 сек максимальной интенсивности с 90 сек отдыха." color="green" />
            <TrainingDayCard day="Воскресенье" title="Активное восстановление" description="Легкая растяжка, йога или пешая прогулка. Низкая интенсивность, фокус на восстановление." color="purple" />
          </>
        );
      } else {
        // План для мужчин, набор массы
        return (
          <>
            <TrainingDayCard day="Понедельник" title="Силовая (грудь и трицепсы)" description="5 упражнений, 4-5 подходов по 6-10 повторений. Интенсивность 75-85% от 1ПМ. Отдых 2-3 минуты между подходами." color="blue" />
            <TrainingDayCard day="Вторник" title="Силовая (спина и бицепсы)" description="5 упражнений, 4-5 подходов по 6-10 повторений. Интенсивность 75-85% от 1ПМ. Отдых 2-3 минуты между подходами." color="blue" />
            <TrainingDayCard day="Среда" title="Активное восстановление" description="Легкая растяжка, пешая прогулка или плавание. Фокус на кровообращение и восстановление без нагрузки." color="purple" />
            <TrainingDayCard day="Четверг" title="Силовая (ноги и плечи)" description="6 упражнений, 4-5 подходов по 6-10 повторений. Интенсивность 75-85% от 1ПМ. Отдых 2-3 минуты между подходами." color="blue" />
            <TrainingDayCard day="Пятница" title="Силовая (руки и кор)" description="6 упражнений, 3-4 подхода по 8-12 повторений. Интенсивность 70-80% от 1ПМ. Отдых 1-2 минуты между подходами." color="blue" />
            <TrainingDayCard day="Суббота" title="Силовая (базовые упражнения)" description="4 тяжелых базовых упражнения, 5 подходов по 3-5 повторений. Интенсивность 85-90% от 1ПМ. Отдых 3-5 минут между подходами." color="green" />
            <TrainingDayCard day="Воскресенье" title="Полное восстановление" description="Полный отдых для максимальной регенерации мышц. Можно дополнить легкими растяжками или массажем." color="purple" />
          </>
        );
      }
    } else {
      if (isWeightLoss) {
        // План для женщин, снижение веса
        return (
          <>
            <TrainingDayCard day="Понедельник" title="Силовая (нижняя часть тела)" description="5 упражнений, 3 подхода по 12-15 повторений. Фокус на ноги и ягодицы. Отдых 60 сек между подходами." color="blue" />
            <TrainingDayCard day="Вторник" title="Гибкость и восстановление" description="30-45 минут йоги или пилатеса. Фокус на растяжку, гибкость и стабилизацию кора." color="purple" />
            <TrainingDayCard day="Среда" title="HIIT" description="25-30 минут высокоинтенсивной интервальной тренировки. Чередование 20-30 сек максимальной интенсивности с 60 сек отдыха." color="green" />
            <TrainingDayCard day="Четверг" title="Силовая (верхняя часть тела)" description="5 упражнений, 3 подхода по 12-15 повторений. Фокус на руки, спину и плечи. Отдых 60 сек между подходами." color="blue" />
            <TrainingDayCard day="Пятница" title="LISS" description="45-60 минут низкоинтенсивной кардио-тренировки (ходьба, велосипед, эллиптический тренажер) на уровне 60-70% от максимальной ЧСС." color="amber" />
            <TrainingDayCard day="Суббота" title="Функциональная силовая" description="Круговая тренировка из 6-8 упражнений с собственным весом. 3 круга, минимальный отдых между упражнениями." color="blue" />
            <TrainingDayCard day="Воскресенье" title="Активное восстановление" description="Легкая растяжка, йога или пешая прогулка. Низкая интенсивность, фокус на восстановление." color="purple" />
          </>
        );
      } else {
        // План для женщин, набор массы
        return (
          <>
            <TrainingDayCard day="Понедельник" title="Силовая (нижняя часть тела)" description="5 упражнений, 4 подхода по 8-12 повторений. Интенсивность 70-80% от 1ПМ. Отдых 90-120 сек между подходами." color="blue" />
            <TrainingDayCard day="Вторник" title="Силовая (верхняя часть тела - толкающие)" description="4 упражнения, 4 подхода по 8-12 повторений. Фокус на грудь, плечи, трицепс. Отдых 90-120 сек между подходами." color="blue" />
            <TrainingDayCard day="Среда" title="Активное восстановление" description="Легкая растяжка, йога или пешая прогулка. Низкая интенсивность, фокус на восстановление." color="purple" />
            <TrainingDayCard day="Четверг" title="Силовая (верхняя часть тела - тянущие)" description="4 упражнения, 4 подхода по 8-12 повторений. Фокус на спину и бицепс. Отдых 90-120 сек между подходами." color="blue" />
            <TrainingDayCard day="Пятница" title="Силовая (ягодицы и плечи)" description="6 упражнений, 4 подхода по 8-12 повторений. Интенсивность 70-80% от 1ПМ. Отдых 90-120 сек между подходами." color="blue" />
            <TrainingDayCard day="Суббота" title="LISS + легкая силовая" description="30 минут кардио низкой интенсивности, затем 3-4 упражнения на отстающие группы мышц, 3 подхода по 10-15 повторений." color="amber" />
            <TrainingDayCard day="Воскресенье" title="Полное восстановление" description="Полный отдых для максимальной регенерации мышц. Можно дополнить легкими растяжками или массажем." color="purple" />
          </>
        );
      }
    }
  };
  
  // Рендерим научные принципы в зависимости от пола
  const renderSciencePrinciples = () => {
    if (isMale) {
      return (
        <>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li className="text-gray-700">
              <strong>Прогрессия нагрузки:</strong> Постепенное увеличение веса, объема или интенсивности для стимуляции роста.
            </li>
          <li className="text-gray-700">
              <strong>Волновая периодизация:</strong> Чередование циклов высокой и низкой интенсивности для оптимизации результатов.
          </li>
          <li className="text-gray-700">
              <strong>Рекомендации по объему:</strong> 10-15 рабочих подходов на группу мышц в неделю.
          </li>
          <li className="text-gray-700">
              <strong>EPOC эффект:</strong> Интенсивные тренировки повышают метаболизм на 24-48 часов после занятия.
          </li>
          <li className="text-gray-700">
              <strong>Разнообразие стимулов:</strong> Регулярная смена упражнений, темпа и угла нагрузки для преодоления плато.
          </li>
        </ul>
          <div className="mb-3">
            <p className="text-gray-700 mb-3">
              Исследования показывают, что мужчины быстрее восстанавливаются между подходами и тренировками благодаря более высокому уровню тестостерона. Это позволяет использовать большие веса и меньшее количество повторений для стимуляции роста мышц.
            </p>
            <p className="text-gray-700">
              {isWeightLoss 
                ? "При снижении веса рекомендуется сохранять высокую интенсивность силовых тренировок для защиты мышечной массы, при этом создавая дефицит калорий преимущественно за счет диеты и умеренного кардио." 
                : "При наборе массы у мужчин оптимальным является фокус на тяжелых базовых упражнениях с постепенной прогрессией веса. Частота тренировок должна обеспечивать полное восстановление мышц (48-72 часа для каждой группы)."}
            </p>
      </div>
    </>
      );
    } else {
      return (
        <>
          <ul className="list-disc pl-5 space-y-2 mb-4">
          <li className="text-gray-700">
              <strong>Прогрессия нагрузки:</strong> Постепенное увеличение интенсивности с акцентом на технику.
          </li>
          <li className="text-gray-700">
              <strong>Волновая периодизация с учетом менструального цикла:</strong> Интенсивные тренировки в фолликулярной фазе, восстановительные - в лютеиновой.
          </li>
          <li className="text-gray-700">
              <strong>Особенности тренировок в разные фазы цикла:</strong> Адаптация нагрузки к гормональным изменениям для оптимальных результатов.
          </li>
          <li className="text-gray-700">
              <strong>Рекомендации по объему тренировок:</strong> 12-18 рабочих подходов на группу мышц в неделю.
          </li>
        </ul>
          <div className="mb-3">
            <p className="text-gray-700 mb-3">
              Исследования показывают, что женщины лучше переносят тренировки с большим количеством повторений и меньшим временем восстановления между подходами по сравнению с мужчинами, благодаря более эффективной утилизации гликогена и меньшему накоплению молочной кислоты.
            </p>
            <p className="text-gray-700">
              {isWeightLoss 
                ? "При снижении веса у женщин важно сохранять баланс между силовыми, HIIT и LISS тренировками. HIIT способствует выработке гормона роста и улучшает чувствительность к инсулину, а LISS помогает сжигать жир без чрезмерного стресса для организма." 
                : "При наборе массы женщинам рекомендуется фокусироваться на прогрессивном увеличении нагрузки с акцентом на качество движения и полноамплитудные упражнения, что способствует более эффективной активации мышечных волокон и их гипертрофии."}
            </p>
      </div>
    </>
  );
    }
  };
  
  // Функции для управления модальным окном paywall
  const handleShowPaywall = () => {
    setShowPaywall(true);
  };

  const handleClosePaywall = () => {
    setShowPaywall(false);
  };
  
  return (
    <Layout title="Физическая активность">
      <div className="mb-6">
        <div className="bg-primary bg-opacity-10 rounded-lg p-4 mb-6">
          <p className="text-gray-700">
            Оптимальные рекомендации по физической активности для 
            достижения вашей цели {goalType}.
          </p>
        </div>
        
        {/* Блок с радарной диаграммой */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Оптимальная структура тренировок</h2>
          <div style={{ height: '300px' }}>
            <Radar data={chartData} options={chartOptions} />
          </div>
          <div className="mt-4 bg-primary bg-opacity-5 rounded p-3 text-gray-700">
            <h3 className="font-medium mb-2">Как читать эту диаграмму:</h3>
            <p className="mb-2">
              Диаграмма показывает научно обоснованное распределение различных типов тренировок для 
              достижения вашей цели {goalType}. Каждый сектор представляет процент от общего 
              тренировочного объема, который следует уделить конкретному типу активности.
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li><span className="font-medium">Силовые тренировки</span> - упражнения с отягощениями для наращивания и сохранения мышечной массы</li>
              <li><span className="font-medium">HIIT</span> - высокоинтенсивные интервальные тренировки (короткие периоды максимальной нагрузки)</li>
              <li><span className="font-medium">LISS</span> - низкоинтенсивные стационарные тренировки (длительные кардио с равномерной нагрузкой)</li>
              <li><span className="font-medium">Гибкость</span> - упражнения на растяжку, йога, пилатес</li>
              <li><span className="font-medium">Восстановление</span> - активности для регенерации (прогулки, легкий стретчинг)</li>
            </ul>
            <p className="mt-2 text-sm">
              <strong>Пример использования:</strong> Если вы тренируетесь 5 часов в неделю, и на графике 
              Силовые тренировки составляют {trainingData.data[0]}%, это означает, что примерно {Math.round(trainingData.data[0]/100*5*60)} минут 
              в неделю следует посвятить тренировкам с отягощениями.
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-2 italic">
            * Научно оптимальное распределение тренировочных модальностей для {genderText} (% от общего объема)
          </p>
        </div>
        
        {/* Блок с недельным планом тренировок */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Недельный план тренировок</h2>
          <div className="space-y-2">
            {renderTrainingPlan()}
          </div>
        </div>
        
        {/* Блок с научными принципами */}
        <div className="bg-primary bg-opacity-10 rounded-lg p-4 mb-6 border border-primary border-opacity-20">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Научные принципы периодизации тренировок для {genderText}:
          </h2>
          {renderSciencePrinciples()}
        </div>
        
        {/* Блок с предложением подробного плана тренировок */}
        <div className="bg-gradient-to-r from-primary to-blue-500 rounded-lg shadow-md p-5 text-white">
          <h2 className="text-xl font-semibold mb-4">Составить подробный план тренировок</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <h3 className="font-medium text-lg mb-2">Что входит в подробный план:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
                  <span>План тренировок на неделю</span>
          </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Количество повторений</span>
          </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Объяснение техники упражнений</span>
          </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Научное обоснование упражнения</span>
          </li>
        </ul>
            </div>
            <div className="flex items-center justify-center">
              <button 
                onClick={handleShowPaywall}
                className="bg-white text-primary hover:bg-gray-100 py-3 px-8 rounded-lg font-semibold text-lg transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Составить
              </button>
            </div>
          </div>
          
          <p className="text-sm text-white text-opacity-90 italic">
            Подробный план тренировок создается с учетом всех ваших индивидуальных параметров и научных исследований
          </p>
        </div>
      </div>
      
      {/* Модальное окно Paywall */}
      <PaywallModal isOpen={showPaywall} onClose={handleClosePaywall} />
    </Layout>
  );
};

export default ActivityPage; 