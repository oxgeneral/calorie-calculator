import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAppContext } from '../context/AppContext';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import PaywallModal from '../components/PaywallModal';

// Регистрируем необходимые компоненты Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Компонент для отображения макронутриента
const MacroCard = ({ title, value, percentage, color, calories, recommendations, icon }) => {
  // Определяем цвет фона для прогресс-бара в зависимости от типа макронутриента
  const getBgColorClass = () => {
    if (color.includes('blue')) return 'bg-blue-500';
    if (color.includes('green')) return 'bg-green-500';
    if (color.includes('purple')) return 'bg-purple-500';
    return 'bg-primary';
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 ${color}`}>
      <div className="flex items-center mb-2">
        <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-${color.replace('border-', '')} text-white mr-3`}>
          {icon}
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <div className="flex items-center">
            <div className="text-lg font-bold text-gray-700 mr-2">{value} г</div>
            <div className="text-sm font-medium text-gray-500">({calories} ккал)</div>
          </div>
        </div>
      </div>
      
      {/* Прогресс-бар */}
      <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden mt-2">
        <div 
          className={`h-full ${getBgColorClass()}`} 
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      <div className="text-right text-sm font-medium mt-1">
        {percentage}% от общей калорийности
      </div>
      
      {/* Рекомендации */}
      <div className="mt-3 text-sm text-gray-600">
        {recommendations}
      </div>
    </div>
  );
};

// Компонент для отображения научных рекомендаций с цветными маркерами
const RecommendationItem = ({ color, children }) => (
  <li className="flex items-start mb-2">
    <div className={`h-5 w-5 rounded-full bg-${color} mr-2 mt-0.5 flex-shrink-0`}></div>
    <span className="text-gray-700">{children}</span>
  </li>
);

// Компонент для отображения источников нутриентов
const NutrientSourcesColumn = ({ title, sources, color }) => (
  <div className="mb-4">
    <h4 className={`font-semibold text-${color} mb-2`}>{title}</h4>
    <ul className="list-disc pl-5 space-y-1">
      {sources.map((source, index) => (
        <li key={index} className="text-gray-700 text-sm">{source}</li>
      ))}
    </ul>
  </div>
);

// Компонент для отображения супплементов
const SupplementsSection = ({ gender, weightLossGoal }) => {
  // Основные добавки в зависимости от пола и цели
  const primarySupplements = gender === 'female' 
    ? (weightLossGoal 
        ? [
            "Железо (18-25 мг/день)",
            "Омега-3 (1-2 г/день)",
            "Витамин D (1000-2000 МЕ/день)",
            "Магний (300-400 мг/день)",
            "Витамин B6 (1.3-1.7 мг/день)",
            "Кальций (1000-1200 мг/день)"
          ]
        : [
            "Креатин (3-5 г/день)",
            "Протеин (1.6-2 г/кг/день)",
            "Железо (18-25 мг/день)",
            "Витамин D3 (1000-2000 МЕ/день)",
            "ZMA (цинк, магний, B6)",
            "Омега-3 (2-3 г/день)"
          ]
      )
    : (weightLossGoal
        ? [
            "Креатин (3-5 г/день)",
            "Кофеин (200-400 мг/день)",
            "Омега-3 (1-2 г/день)",
            "Витамин D (1000-2000 МЕ/день)",
            "Магний (300-400 мг/день)",
            "L-карнитин (1-2 г/день)"
          ]
        : [
            "Креатин (5 г/день)",
            "Бета-аланин (3-5 г/день)",
            "Протеин (1.8-2.2 г/кг/день)",
            "Цитруллин малат (6-8 г/день)",
            "ZMA (цинк, магний, B6)",
            "Витамин D3 (2000-4000 МЕ/день)"
          ]
      );
  
  // Дополнительные добавки
  const secondarySupplements = weightLossGoal
    ? [
        "Зеленый чай (300-400 мг/день)",
        "Протеин (1.6-1.8 г/кг/день)",
        "Пробиотики (1-10 млрд КОЕ/день)",
        "Глюкоманнан (1 г 3 раза в день)",
        "5-HTP (50-100 мг/день)",
        "Альфа-липоевая кислота (300-600 мг/день)"
      ]
    : [
        "L-цитруллин (6-8 г/день)",
        "EAA/BCAA (5-10 г/день)",
        "HMB (1.5-3 г/день)",
        "Бета-экдистерон (500 мг/день)",
        "Эссенциальные аминокислоты (10-20 г/день)",
        "Трибулус (500-1000 мг/день)"
      ];
  
  // Добавки для восстановления
  const recoverySupplements = weightLossGoal
    ? [
        "Куркумин (500-1000 мг/день)",
        "Таурин (1-2 г/день)",
        "L-глютамин (5-10 г/день)"
      ]
    : [
        "Куркумин (500-1000 мг/день)",
        "L-глютамин (5-10 г/день)",
        "Ашваганда (300-600 мг/день)",
        "Таурин (1-2 г/день)"
      ];
      
  // Описания добавок для мужчин при снижении веса
  const maleWeightLossSupplementInfo = {
    "Креатин (3-5 г/день)": "Помогает сохранить мышечную массу во время дефицита калорий и повышает интенсивность тренировок",
    "Кофеин (200-400 мг/день)": "Ускоряет метаболизм на 3-11%, подавляет аппетит и повышает окисление жиров во время физической активности",
    "Омега-3 (1-2 г/день)": "Снижает воспаление, улучшает чувствительность к инсулину и способствует мобилизации жировых запасов",
    "Витамин D (1000-2000 МЕ/день)": "Оптимизирует уровень тестостерона и улучшает метаболизм глюкозы, что важно при снижении веса",
    "Магний (300-400 мг/день)": "Улучшает чувствительность к инсулину, снижает задержку воды и помогает контролировать тягу к сладкому",
    "L-карнитин (1-2 г/день)": "Транспортирует жирные кислоты в митохондрии для окисления, особенно эффективен при интенсивных тренировках",
    "Зеленый чай (300-400 мг/день)": "Содержит EGCG, который увеличивает расход энергии и окисление жиров, особенно в сочетании с кофеином",
    "Протеин (1.6-1.8 г/кг/день)": "Повышает термический эффект пищи, сохраняет мышечную массу и увеличивает чувство сытости",
    "Пробиотики (1-10 млрд КОЕ/день)": "Улучшают микрофлору кишечника, что связано с лучшим контролем веса и снижением воспаления",
    "Глюкоманнан (1 г 3 раза в день)": "Растворимая клетчатка, которая расширяется в желудке, создавая чувство сытости и замедляя усвоение углеводов",
    "5-HTP (50-100 мг/день)": "Предшественник серотонина, помогает контролировать аппетит и тягу к углеводам, улучшает качество сна",
    "Альфа-липоевая кислота (300-600 мг/день)": "Мощный антиоксидант, улучшает чувствительность к инсулину и помогает в детоксикации",
    "Куркумин (500-1000 мг/день)": "Снижает воспаление после тренировок и помогает предотвратить накопление жира за счет влияния на гены",
    "Таурин (1-2 г/день)": "Улучшает метаболизм жиров и глюкозы, повышает чувствительность к инсулину",
    "L-глютамин (5-10 г/день)": "Поддерживает иммунную систему и целостность кишечника во время стресса от дефицита калорий"
  };
  
  // Получение описания добавки
  const getSupplementDescription = (supplement) => {
    if (gender === 'male' && weightLossGoal && maleWeightLossSupplementInfo[supplement]) {
      return maleWeightLossSupplementInfo[supplement];
    }
    return null;
  };
      
  return (
    <div className="bg-primary bg-opacity-10 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Научно обоснованные добавки для {gender === 'female' ? 'женщин' : 'мужчин'} ({weightLossGoal ? 'снижение веса' : 'набор массы'}):
      </h3>
      
      {gender === 'male' && weightLossGoal && (
        <div className="bg-white p-3 rounded mb-4">
          <p className="text-gray-700">
            Добавки не являются заменой правильного питания и тренировок, но могут помочь оптимизировать процесс снижения веса. 
            Они работают через несколько механизмов: ускорение метаболизма, подавление аппетита, улучшение чувствительности к инсулину, 
            сохранение мышечной массы и повышение энергии для тренировок.
          </p>
        </div>
      )}
      
      <div className="mb-4">
        <h4 className="font-medium mb-2 text-primary">Основные добавки:</h4>
        <ul className="list-disc pl-5 space-y-2">
          {primarySupplements.map((supplement, index) => (
            <li key={index} className="text-gray-700">
              <div className="font-medium">{supplement}</div>
              {getSupplementDescription(supplement) && (
                <div className="text-sm text-gray-600 mt-1">{getSupplementDescription(supplement)}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium mb-2 text-primary">
          {weightLossGoal ? 'Добавки второго уровня:' : 'Дополнительные эргогенные добавки:'}
        </h4>
        <ul className="list-disc pl-5 space-y-2">
          {secondarySupplements.map((supplement, index) => (
            <li key={index} className="text-gray-700">
              <div className="font-medium">{supplement}</div>
              {getSupplementDescription(supplement) && (
                <div className="text-sm text-gray-600 mt-1">{getSupplementDescription(supplement)}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-medium mb-2 text-primary">Добавки для восстановления:</h4>
        <ul className="list-disc pl-5 space-y-2">
          {recoverySupplements.map((supplement, index) => (
            <li key={index} className="text-gray-700">
              <div className="font-medium">{supplement}</div>
              {getSupplementDescription(supplement) && (
                <div className="text-sm text-gray-600 mt-1">{getSupplementDescription(supplement)}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      {gender === 'male' && weightLossGoal && (
        <div className="bg-white p-3 rounded mt-4">
          <h4 className="font-medium text-primary mb-2">Как правильно принимать добавки:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Креатин и протеин лучше принимать после тренировки для восстановления</li>
            <li>• Кофеин наиболее эффективен за 30-60 минут до тренировки</li>
            <li>• L-карнитин принимайте за 30-60 минут до кардио-тренировки</li>
            <li>• Глюкоманнан принимайте за 30 минут до еды с большим количеством воды</li>
            <li>• Магний лучше принимать вечером, так как он способствует расслаблению</li>
          </ul>
          <p className="text-xs text-gray-500 mt-2 italic">
            Перед началом приема любых добавок рекомендуется проконсультироваться с врачом, особенно при наличии хронических заболеваний.
          </p>
        </div>
      )}
    </div>
  );
};

const NutritionPage = () => {
  const { state } = useAppContext();
  const [showPaywall, setShowPaywall] = useState(false);
  
  // Определяем тип цели
  const goalType = state.weightLossGoal ? 'похудения' : 'набора массы';
  const isWeightLoss = state.weightLossGoal;
  const isMale = state.gender === 'male';
  
  // Расчет калорий из макронутриентов
  const proteinCalories = state.macros.protein * 4; // 4 ккал на грамм белка
  const fatsCalories = state.macros.fats * 9; // 9 ккал на грамм жира
  const carbsCalories = state.macros.carbs * 4; // 4 ккал на грамм углеводов
  
  // Расчет процентов от общей калорийности
  const proteinPercentage = Math.round((proteinCalories / state.recommendedCalories) * 100);
  const fatsPercentage = Math.round((fatsCalories / state.recommendedCalories) * 100);
  const carbsPercentage = Math.round((carbsCalories / state.recommendedCalories) * 100);
  
  // Данные для графика макронутриентов
  const macroChartData = {
    labels: ['Белки', 'Жиры', 'Углеводы'],
    datasets: [
      {
        label: 'Граммы',
        data: [state.macros.protein, state.macros.fats, state.macros.carbs],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        label: '% от калорийности',
        data: [proteinPercentage, fatsPercentage, carbsPercentage],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        yAxisID: 'y1',
      }
    ]
  };
  
  // Настройки графика макронутриентов
  const macroChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Распределение макронутриентов',
        font: {
          size: 16,
          weight: 'bold',
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const datasetLabel = context.dataset.label;
            const value = context.raw;
            return datasetLabel === 'Граммы' 
              ? `${datasetLabel}: ${value} г` 
              : `${datasetLabel}: ${value}%`;
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Граммы'
        },
        grid: {
          display: true
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: '% от калорийности'
        },
        min: 0,
        max: 100,
        grid: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };
  
  // Получаем тип диеты
  const getDietTypeName = (type) => {
    const types = {
      standard: 'Стандартный научный подход',
      cyclic: 'Циклическое углеводное питание (5+2)',
      evening_carbs: 'Углеводная загрузка вечером',
      intermittent_fasting: 'Интервальное голодание (16:8)',
    };
    return types[type] || type;
  };
  
  // Рекомендации по белкам в зависимости от цели и пола
  const getProteinRecommendations = () => {
    if (isWeightLoss) {
      return isMale 
        ? "Для мужчин в период снижения веса рекомендуется 1.6-2.2 г/кг для максимального сохранения мышечной массы."
        : "Для женщин в период снижения веса рекомендуется 1.4-2.0 г/кг для поддержания мышечной массы и большего насыщения.";
    } else {
      return isMale
        ? "Для мужчин в период набора массы рекомендуется 1.6-2.2 г/кг для оптимального роста мышц. Распределите прием равномерно в течение дня."
        : "Для женщин в период набора массы рекомендуется 1.4-2.0 г/кг для оптимального роста мышц без избыточного набора жира.";
    }
  };
  
  // Рекомендации по жирам в зависимости от цели и пола
  const getFatsRecommendations = () => {
    if (isWeightLoss) {
      return "Минимум 0.5 г/кг веса для поддержания гормонального баланса. Фокус на ненасыщенных жирах (омега-3, оливковое масло).";
    } else {
      return "0.8-1.0 г/кг веса для оптимального гормонального баланса и восстановления. Включайте разнообразные источники жиров.";
    }
  };
  
  // Рекомендации по углеводам в зависимости от цели, пола и типа диеты
  const getCarbsRecommendations = () => {
    let baseRecommendation = "";
    
    if (state.dietType === 'cyclic') {
      return (
        <div>
          <p className="mb-1">Низкоуглеводные дни (5 дней): <strong>{Math.round(state.macros.carbs * 0.5)} г/день</strong></p>
          <p className="mb-1">Высокоуглеводные дни (2 дня): <strong>{Math.round(state.macros.carbs * 2.25)} г/день</strong></p>
          <p>Распределяйте углеводы преимущественно до и после тренировок в высокоуглеводные дни.</p>
        </div>
      );
    } else if (state.dietType === 'evening_carbs') {
      return (
        <div>
          <p className="mb-1">Утро/день (30%): <strong>{Math.round(state.macros.carbs * 0.3)} г</strong></p>
          <p className="mb-1">Вечер (70%): <strong>{Math.round(state.macros.carbs * 0.7)} г</strong></p>
          <p>Основное потребление углеводов после тренировки и вечером для лучшего восстановления и сна.</p>
        </div>
      );
    } else if (state.dietType === 'intermittent_fasting') {
      return (
        <div>
          <p className="mb-1">Окно питания (8 часов): <strong>{state.macros.carbs} г</strong></p>
          <p className="mb-1">Период голодания (16 часов): <strong>0 г</strong></p>
          <p>Распределите углеводы на 2-3 приема пищи в течение 8-часового окна питания.</p>
        </div>
      );
    } else {
      if (isWeightLoss) {
        baseRecommendation = "Приоритет качественным источникам углеводов с низким гликемическим индексом и высоким содержанием клетчатки.";
      } else {
        baseRecommendation = "Увеличьте потребление углеводов перед и после тренировок для максимального восстановления и роста мышц.";
      }
      return baseRecommendation;
    }
  };
  
  // Научные рекомендации по питанию для разных типов диет
  const getDietRecommendations = () => {
    let recommendations = [];
    
    // Базовые рекомендации в зависимости от цели
    if (isWeightLoss) {
      recommendations.push("Дефицит калорий 20-25% от TDEE для оптимального соотношения потери жира к мышцам.");
      recommendations.push(`Минимум 1.6 г/кг белка в день для сохранения мышечной массы (${Math.round(state.currentWeight * 1.6)} г для вашего веса).`);
      recommendations.push("Включайте продукты с высокой питательной ценностью для обеспечения микронутриентами при ограниченной калорийности.");
    } else {
      recommendations.push("Профицит 10-15% от TDEE для оптимального прироста мышц с минимальным набором жира.");
      recommendations.push(`Минимум 1.8 г/кг белка для поддержки роста мышц (${Math.round(state.currentWeight * 1.8)} г для вашего веса).`);
      recommendations.push("Увеличьте потребление углеводов перед и после тренировок для улучшения результатов.");
    }
    
    // Рекомендации в зависимости от типа диеты
    if (state.dietType === 'standard') {
      recommendations.push("Равномерно распределяйте калории и макронутриенты на 3-5 приемов пищи с интервалом 3-4 часа.");
      recommendations.push("Включайте белок в каждый прием пищи (минимум 20-30 г).");
      recommendations.push(isWeightLoss ? "Раз в 7-10 дней делайте рефид (повышение калорий до уровня поддержания) для предотвращения метаболической адаптации." : "Постепенно увеличивайте калории на 5-10% при замедлении прогресса.");
    } else if (state.dietType === 'cyclic') {
      recommendations.push("В низкоуглеводные дни (5 дней): повышенное потребление белка и умеренное жиров для сохранения мышц.");
      recommendations.push("В высокоуглеводные дни (2 дня): углеводная загрузка для восполнения гликогена, снижение жиров.");
      recommendations.push("Планируйте высокоуглеводные дни на дни с интенсивными тренировками для максимальной продуктивности.");
    } else if (state.dietType === 'evening_carbs') {
      recommendations.push("Первая половина дня: основной прием белков и жиров, минимум углеводов (до 30%).");
      recommendations.push("После тренировки и вечером: основное потребление углеводов (70% суточной нормы).");
      recommendations.push("Выбирайте сложные углеводы с низким ГИ для дневного приема и средним/высоким ГИ для посттренировочного.");
    } else if (state.dietType === 'intermittent_fasting') {
      recommendations.push("Выберите 8-часовое окно питания, например, 12:00-20:00, удобное для вашего графика.");
      recommendations.push("2-3 полноценных приема пищи в окне питания с адекватным содержанием белка (30-40 г на прием).");
      recommendations.push("Во время окна голодания (16 часов) допускается вода, несладкий чай и кофе без молока.");
      recommendations.push("Тренируйтесь либо в конце периода голодания, либо в середине окна питания для лучших результатов.");
    }
    
    // Общие рекомендации
    recommendations.push(`Минимум ${Math.round(state.currentWeight * 0.3)} г клетчатки в день для здоровья пищеварения и насыщения.`);
    recommendations.push("Употребляйте омега-3 жирные кислоты из рыбы, льняного или рыбьего жира (1-3 г в день).");
    
    return recommendations;
  };
  
  // Источники нутриентов в зависимости от цели и пола
  const getProteinSources = () => {
    const baseSources = [
      "Куриная грудка",
      "Яичные белки",
      "Нежирный творог",
      "Рыба (треска, тунец)",
      "Протеиновый порошок (сывороточный/растительный)"
    ];
    
    const additionalLossSources = [
      "Тофу и темпе",
      "Нежирные молочные продукты"
    ];
    
    const additionalGainSources = [
      "Говядина",
      "Цельные яйца",
      "Греческий йогурт",
      "Лосось"
    ];
    
    return isWeightLoss 
      ? [...baseSources, ...additionalLossSources]
      : [...baseSources, ...additionalGainSources];
  };
  
  const getFatSources = () => {
    const baseSources = [
      "Оливковое масло",
      "Авокадо",
      "Орехи и семена",
      "Жирная рыба (лосось, скумбрия)",
      "Льняное масло"
    ];
    
    const additionalLossSources = [
      "Кокосовое масло (в умеренных количествах)"
    ];
    
    const additionalGainSources = [
      "Яичные желтки",
      "Сливочное масло (в умеренных количествах)",
      "Темный шоколад (>70% какао)"
    ];
    
    return isWeightLoss 
      ? [...baseSources, ...additionalLossSources]
      : [...baseSources, ...additionalGainSources];
  };
  
  const getCarbSources = () => {
    const baseSources = [
      "Овсянка",
      "Киноа",
      "Коричневый рис",
      "Сладкий картофель",
      "Фрукты (ягоды, яблоки, груши)"
    ];
    
    const additionalLossSources = [
      "Все виды овощей",
      "Бобовые (чечевица, нут)",
      "Цельнозерновой хлеб"
    ];
    
    const additionalGainSources = [
      "Белый рис (после тренировки)",
      "Бананы",
      "Мед (в умеренных количествах)",
      "Цельнозерновая паста"
    ];
    
    return isWeightLoss 
      ? [...baseSources, ...additionalLossSources]
      : [...baseSources, ...additionalGainSources];
  };
  
  // Дополнительные рекомендации для женщин и для набора массы
  const getAdditionalRecommendations = () => {
    if (!isMale) {
      return (
        <div className="w-full mt-4 bg-primary bg-opacity-10 p-4 rounded-lg">
          <h4 className="font-semibold text-primary mb-2">Рекомендации с учетом менструального цикла</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li className="text-gray-700 text-sm">Фолликулярная фаза: повышайте углеводы на 5-10%, используйте для силовых тренировок.</li>
            <li className="text-gray-700 text-sm">Лютеиновая фаза: увеличьте потребление белка на 5%, добавьте омега-3 и магний.</li>
            <li className="text-gray-700 text-sm">Менструальная фаза: добавьте железосодержащие продукты (красное мясо, темная зелень).</li>
            <li className="text-gray-700 text-sm">Контролируйте поступление кальция и витамина D для поддержания плотности костей.</li>
          </ul>
        </div>
      );
    }
    
    if (!isWeightLoss) {
      return (
        <div className="w-full mt-4 bg-primary bg-opacity-10 p-4 rounded-lg">
          <h4 className="font-semibold text-primary mb-2">Дополнительные рекомендации для набора массы</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li className="text-gray-700 text-sm">Увеличивайте калории постепенно (на 150-200 ккал) при остановке прогресса.</li>
            <li className="text-gray-700 text-sm">Используйте периодизацию питания: дни высокого, среднего и низкого калоража.</li>
            <li className="text-gray-700 text-sm">Креатин монохидрат (5 г/день) для улучшения силовых показателей и роста мышц.</li>
            <li className="text-gray-700 text-sm">Измеряйте не только вес, но и обхваты мышц для оценки эффективности программы.</li>
          </ul>
        </div>
      );
    }
    
    return null;
  };
  
  // Функции для управления модальным окном paywall
  const handleShowPaywall = () => {
    setShowPaywall(true);
  };

  const handleClosePaywall = () => {
    setShowPaywall(false);
  };

  return (
    <Layout title="Рекомендации по питанию">
      <div className="space-y-6">
        {/* Информационный блок */}
        <div className="bg-primary bg-opacity-10 rounded-lg p-4">
          <p className="text-gray-700">
            Персонализированные рекомендации по питанию для достижения вашей цели {goalType}.
            Выбранная стратегия: <strong>{getDietTypeName(state.dietType)}</strong>.
          </p>
        </div>
        
        {/* Графическое представление макронутриентов */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div style={{ height: '300px' }}>
            <Bar data={macroChartData} options={macroChartOptions} />
          </div>
          <p className="text-xs text-gray-500 mt-2 italic text-center">
            * Рекомендуемая суточная калорийность: <strong>{state.recommendedCalories} ккал/день</strong>
          </p>
          
          <div className="mt-3 bg-primary bg-opacity-10 p-3 rounded-lg">
            <h4 className="font-semibold text-primary mb-2">Что показывает этот график?</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>Синие столбцы показывают количество граммов каждого макронутриента в вашем рационе (значения по левой шкале).</li>
              <li>Зеленые столбцы показывают процент калорий, который обеспечивает каждый макронутриент (значения по правой шкале).</li>
              <li>Оптимальное распределение: белки 25-35%, жиры 20-35%, углеводы 40-60% от общей калорийности.</li>
              <li>Используйте этот график для контроля баланса вашего рациона и его соответствия рекомендуемым нормам.</li>
            </ul>
          </div>
        </div>
        
        {/* Блок "Оптимальное соотношение макронутриентов" */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Оптимальное соотношение макронутриентов
          </h3>
          
          <MacroCard
            title="Белки"
            value={state.macros.protein}
            percentage={proteinPercentage}
            color="border-blue-500"
            calories={proteinCalories}
            recommendations={getProteinRecommendations()}
            icon={<span className="font-bold">P</span>}
          />
          
          <MacroCard
            title="Жиры"
            value={state.macros.fats}
            percentage={fatsPercentage}
            color="border-green-500"
            calories={fatsCalories}
            recommendations={getFatsRecommendations()}
            icon={<span className="font-bold">F</span>}
          />
          
          <MacroCard
            title="Углеводы"
            value={state.macros.carbs}
            percentage={carbsPercentage}
            color="border-purple-500"
            calories={carbsCalories}
            recommendations={getCarbsRecommendations()}
            icon={<span className="font-bold">C</span>}
          />
        </div>
        
        {/* Блок "Научные рекомендации" */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xl font-semibold text-primary mb-4 text-center">
            Научные рекомендации
          </h3>
          
          <ul className="space-y-2">
            <RecommendationItem color="green-500">
              Оптимальное потребление белка: {isWeightLoss ? '1.6-2.2' : '1.6-2.2'} г/кг веса для {isMale ? 'мужчин' : 'женщин'} при {isWeightLoss ? 'снижении веса' : 'наборе массы'}
            </RecommendationItem>
            
            <RecommendationItem color="blue-500">
              Минимальное потребление жиров: {isWeightLoss ? '0.5' : '0.8'} г/кг веса для поддержания гормонального здоровья
            </RecommendationItem>
            
            <RecommendationItem color="amber-500">
              Распределение белка: не менее {isMale ? '30-40' : '25-35'} г белка на прием пищи с интервалом 3-4 часа для оптимального синтеза мышечного белка
            </RecommendationItem>
            
            {state.dietType === 'cyclic' && (
              <RecommendationItem color="purple-500">
                При циклическом питании: 5 дней низкий уровень углеводов ({Math.round(state.macros.carbs * 0.5)} г) и 2 дня высокий ({Math.round(state.macros.carbs * 2.25)} г) для максимизации жиросжигания и минимизации потери мышц
              </RecommendationItem>
            )}
          </ul>
        </div>
        
        {/* Блок "Научные рекомендации по питанию" */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Научные рекомендации по питанию с учетом {getDietTypeName(state.dietType).toLowerCase()}
          </h3>
          
          <ul className="list-disc pl-5 space-y-2">
            {getDietRecommendations().map((recommendation, index) => (
              <li key={index} className="text-gray-700">{recommendation}</li>
            ))}
          </ul>
        </div>
        
        {/* Блок "Оптимальные источники нутриентов" */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xl font-semibold text-primary mb-4 text-center">
            Оптимальные источники нутриентов для {isMale ? 'мужчин' : 'женщин'} ({isWeightLoss ? 'снижение веса' : 'набор массы'})
          </h3>
          
          <NutrientSourcesColumn 
            title="Белки" 
            sources={getProteinSources()}
            color="blue-700"
          />
          
          <NutrientSourcesColumn 
            title="Жиры" 
            sources={getFatSources()}
            color="green-700"
          />
          
          <NutrientSourcesColumn 
            title="Углеводы" 
            sources={getCarbSources()}
            color="purple-700"
          />
          
          {/* Дополнительные рекомендации для женщин или для набора массы */}
          {getAdditionalRecommendations()}
        </div>
        
        {/* Научно обоснованные добавки */}
        <SupplementsSection gender={state.gender === 'male' ? 'male' : 'female'} weightLossGoal={isWeightLoss} />
      </div>
      
      {/* Блок с предложением подробного плана питания */}
      <div className="bg-gradient-to-r from-primary to-blue-500 rounded-lg shadow-md p-5 text-white">
        <h2 className="text-xl font-semibold mb-4">Составить подробный план питания</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div>
            <h3 className="font-medium text-lg mb-2">Что входит в подробный план:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                </svg>
                <span>План питания на неделю под ваши потребности</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                </svg>
                <span>Количество калорий в пище</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                </svg>
                <span>Научное обоснование продуктов и блюд</span>
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
          Подробный план питания создается с учетом всех ваших индивидуальных потребностей и научных исследований
        </p>
      </div>
      
      {/* Модальное окно Paywall */}
      <PaywallModal isOpen={showPaywall} onClose={handleClosePaywall} />
    </Layout>
  );
};

export default NutritionPage; 