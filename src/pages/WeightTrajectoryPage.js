import React from 'react';
import Layout from '../components/Layout';
import { useAppContext } from '../context/AppContext';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Регистрируем необходимые компоненты Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeightTrajectoryPage = () => {
  const { state } = useAppContext();
  
  // Определяем тип цели
  const isWeightLoss = state.weightLossGoal;
  const goalType = isWeightLoss ? 'снижения' : 'набора массы';
  const goalTitleType = isWeightLoss ? 'снижения веса' : 'набора веса';
  
  // Подготавливаем данные для графика прогноза веса
  const weeks = state.weightTrajectory.map(entry => `Неделя ${entry.week}`);
  const weights = state.weightTrajectory.map(entry => entry.weight);
  
  // Создаем данные для второй линии - быстрого подхода
  const fastApproachWeights = [];
  const weeklyChangeFast = isWeightLoss ? 1.0 : 0.5; // кг в неделю для быстрого подхода
  
  for (let i = 0; i < state.weightTrajectory.length; i++) {
    const weight = isWeightLoss
      ? state.currentWeight - (weeklyChangeFast * i)
      : state.currentWeight + (weeklyChangeFast * i);
    fastApproachWeights.push(Number(weight.toFixed(1)));
  }
  
  // Настройки графика прогноза веса
  const weightChartData = {
    labels: weeks,
    datasets: [
      {
        label: 'Научный подход с рефидами',
        data: weights,
        borderColor: 'rgba(0, 122, 255, 1)',
        backgroundColor: 'rgba(0, 122, 255, 0.2)',
        tension: 0.1,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
      {
        label: isWeightLoss ? 'Быстрый подход (-1000 ккал)' : 'Быстрый подход (+1000 ккал)',
        data: fastApproachWeights,
        borderColor: 'rgba(255, 59, 48, 1)',
        backgroundColor: 'rgba(255, 59, 48, 0.2)',
        borderDash: [5, 5],
        tension: 0.1,
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 2,
      }
    ]
  };
  
  const weightChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Прогноз ${goalTitleType}`,
        font: {
          size: 16,
          weight: 'bold',
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw} кг`;
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Вес (кг)'
        },
        min: Math.min(...weights, ...fastApproachWeights) - 1,
        max: Math.max(...weights, ...fastApproachWeights) + 1,
        grid: {
          display: true
        }
      },
      x: {
        title: {
          display: true,
          text: 'Недели'
        },
        grid: {
          display: true
        }
      }
    }
  };
  
  // Данные для графика состава изменения веса
  const totalWeightChange = Math.abs(state.targetWeight - state.currentWeight);
  
  // Для научного подхода
  const fatLossScientific = isWeightLoss ? totalWeightChange * 0.85 : totalWeightChange * 0.3;
  const muscleLossScientific = isWeightLoss ? totalWeightChange * 0.15 : totalWeightChange * 0.7;
  
  // Для быстрого подхода
  const fatLossFast = isWeightLoss ? totalWeightChange * 0.65 : totalWeightChange * 0.4;
  const muscleLossFast = isWeightLoss ? totalWeightChange * 0.35 : totalWeightChange * 0.6;
  
  const compositionChartData = {
    labels: ['Научный подход', 'Быстрый подход'],
    datasets: [
      {
        label: 'Жировая ткань',
        data: [fatLossScientific.toFixed(1), fatLossFast.toFixed(1)],
        backgroundColor: 'rgba(52, 199, 89, 0.8)',
        borderColor: 'rgba(52, 199, 89, 1)',
        borderWidth: 1,
        stack: 'Stack 0',
      },
      {
        label: 'Мышечная ткань',
        data: [muscleLossScientific.toFixed(1), muscleLossFast.toFixed(1)],
        backgroundColor: 'rgba(255, 59, 48, 0.8)',
        borderColor: 'rgba(255, 59, 48, 1)',
        borderWidth: 1,
        stack: 'Stack 0',
      }
    ]
  };
  
  const compositionChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Состав ${isWeightLoss ? 'потери' : 'набора'} веса`,
        font: {
          size: 16,
          weight: 'bold',
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw} кг (${(context.raw / totalWeightChange * 100).toFixed(1)}%)`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Килограммы'
        },
        min: 0,
        max: totalWeightChange + 0.5,
        grid: {
          display: true
        }
      },
      y: {
        stacked: true,
        grid: {
          display: false
        }
      }
    }
  };
  
  // Научное обоснование в зависимости от пола
  const scientificExplanation = state.gender === 'female' 
    ? [
        'Более низкая скорость метаболизма по сравнению с мужчинами (в среднем на 5-10%) требует более точных настроек дефицита калорий',
        'Гормональные колебания в течение менструального цикла могут влиять на удержание воды и темпы снижения веса',
        `Потеря мышечной массы при снижении веса у женщин в среднем составляет ${(muscleLossScientific).toFixed(1)} кг при научном подходе и ${(muscleLossFast).toFixed(1)} кг при быстром подходе`,
        'Адаптивный термогенез (замедление метаболизма) у женщин проявляется раньше и требует более частых диетических перерывов',
        'Хронобиология: женщинам более эффективно временно-ограниченное питание с ранним ужином (до 19:00)',
      ]
    : [
        'Адаптивный термогенез вызывает снижение метаболизма на 15-20% при длительном дефиците калорий',
        `Потеря мышечной массы при снижении веса у мужчин в среднем составляет ${(muscleLossScientific).toFixed(1)} кг при научном подходе и ${(muscleLossFast).toFixed(1)} кг при быстром подходе`,
        'Рефиды (дни с повышенным потреблением углеводов) помогают восстановить уровень лептина и повысить расход энергии',
        'Диетические перерывы каждые 8-12 недель помогают минимизировать метаболическую адаптацию',
        'Хронобиология: большинство исследований показывают преимущества временно-ограниченного питания с окном 10-12 часов',
      ];
  
  // Научные факты в зависимости от цели
  const scientificFacts = isWeightLoss
    ? [
        'Самоконтроль и мониторинг: регулярное взвешивание (1-2 раза в неделю) увеличивает вероятность поддержания веса на 80%',
        'Физическая активность: 250-300 минут в неделю необходимы для долгосрочного поддержания веса',
        'Регулярный завтрак связан с более успешным долгосрочным поддержанием веса в 78% случаев',
        'Гибкость диеты (подход 80/20) более эффективна для долгосрочного поддержания веса, чем строгие ограничения',
        `Гендерные различия: ${state.gender === 'female' ? 'женщинам' : 'мужчинам'} требуются различные стратегии для успешного поддержания веса после его снижения`,
      ]
    : [
        'Темпы роста мышц: естественный предел составляет 0.25-0.5 кг в месяц для тренированных атлетов',
        'Белок: потребление 1.6-2.2 г/кг массы тела максимизирует синтез мышечного белка',
        'Сон: недостаток сна на 30% снижает скорость набора мышечной массы и увеличивает накопление жира',
        'Прогрессивная перегрузка: увеличение веса или объема тренировок является ключевым фактором для мышечной гипертрофии',
        `Гендерные различия: ${state.gender === 'female' ? 'женщины' : 'мужчины'} имеют разные гормональные профили, влияющие на скорость и характер набора мышечной массы`,
      ];
  
  // Расшифровка графика прогноза веса
  const weightChartExplanation = isWeightLoss
    ? (
      <div className="mt-3 text-sm text-gray-700">
        <h4 className="font-semibold mb-1">Что показывает этот график:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li><span className="text-blue-600 font-medium">Синяя линия</span> - научный подход со снижением 0.5 кг в неделю с учетом периодических рефидов (дней повышенного потребления углеводов) для минимизации адаптивного термогенеза.</li>
          <li><span className="text-red-600 font-medium">Красная пунктирная линия</span> - более агрессивный подход с дефицитом 1000 ккал, который дает быстрые результаты (1 кг в неделю), но имеет высокий риск потери мышечной массы и метаболической адаптации.</li>
        </ul>
      </div>
    )
    : (
      <div className="mt-3 text-sm text-gray-700">
        <h4 className="font-semibold mb-1">Что показывает этот график:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li><span className="text-blue-600 font-medium">Синяя линия</span> - научный подход с набором 0.25 кг в неделю, что позволяет максимизировать набор мышечной массы и минимизировать набор жира.</li>
          <li><span className="text-red-600 font-medium">Красная пунктирная линия</span> - более агрессивный "бульк" с профицитом 1000 ккал, который дает быстрый рост массы тела (0.5 кг в неделю), но с более высоким процентом жировой ткани.</li>
        </ul>
      </div>
    );

  // Расшифровка графика состава изменения веса
  const compositionChartExplanation = isWeightLoss
    ? (
      <div className="mt-3 text-sm text-gray-700">
        <h4 className="font-semibold mb-1">Что показывает этот график:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Сравнение состава потерянного веса при двух разных подходах к снижению веса.</li>
          <li><span className="text-green-600 font-medium">Зеленый сегмент</span> - потеря жировой ткани (чем больше, тем лучше).</li>
          <li><span className="text-red-600 font-medium">Красный сегмент</span> - потеря мышечной ткани (чем меньше, тем лучше).</li>
          <li>При научном подходе соотношение потери жира к мышцам составляет примерно 85% к 15%, что является оптимальным.</li>
          <li>При быстром подходе это соотношение ухудшается до 65% к 35%, что сильнее снижает метаболизм и может привести к эффекту "йо-йо".</li>
        </ul>
      </div>
    )
    : (
      <div className="mt-3 text-sm text-gray-700">
        <h4 className="font-semibold mb-1">Что показывает этот график:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Сравнение состава набранного веса при двух разных подходах.</li>
          <li><span className="text-green-600 font-medium">Зеленый сегмент</span> - набор жировой ткани (чем меньше, тем лучше).</li>
          <li><span className="text-red-600 font-medium">Красный сегмент</span> - набор мышечной ткани (чем больше, тем лучше).</li>
          <li>При научном подходе соотношение набора мышц к жиру составляет примерно 70% к 30%, что близко к оптимальному физиологическому пределу.</li>
          <li>При быстром подходе это соотношение падает до 60% к 40%, что приводит к лишнему накоплению жира, который потом придется снижать.</li>
        </ul>
      </div>
    );
  
  return (
    <Layout title="Прогноз изменения веса">
      <div className="mb-6">
        {/* Блок из MenuPage */}
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
        
        {/* График прогноза веса */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div style={{ height: '300px' }}>
            <Line data={weightChartData} options={weightChartOptions} />
          </div>
          <p className="text-xs text-gray-500 mt-2 italic">
            * График учитывает адаптивный термогенез, периодизацию диеты и диетические перерывы
          </p>
          {/* Расшифровка графика прогноза веса */}
          {weightChartExplanation}
        </div>
        
        {/* График состава изменения веса */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div style={{ height: '300px' }}>
            <Bar data={compositionChartData} options={compositionChartOptions} />
          </div>
          <p className="text-xs text-gray-500 mt-2 italic">
            * На основе научных данных о сохранении мышечной массы при разных дефицитах калорий
          </p>
          {/* Расшифровка графика состава изменения веса */}
          {compositionChartExplanation}
        </div>
        
        {/* Научное обоснование прогноза */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Научное обоснование прогноза для {state.gender === 'female' ? 'женщин' : 'мужчин'}:
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {scientificExplanation.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </div>
        
        {/* Научные факты */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Научные факты о {isWeightLoss ? 'долгосрочном поддержании веса' : 'наборе мышечной массы'}:
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {scientificFacts.map((fact, index) => (
              <li key={index} className="text-gray-700">{fact}</li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default WeightTrajectoryPage; 