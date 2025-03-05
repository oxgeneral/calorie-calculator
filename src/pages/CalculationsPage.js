import React from 'react';
import Layout from '../components/Layout';
import { useAppContext } from '../context/AppContext';

// Компонент для вступительного блока
const IntroductionBlock = ({ isWeightLoss }) => {
  return (
    <div className="bg-primary bg-opacity-10 rounded-lg p-4 mb-4">
      <h2 className="text-lg font-semibold text-primary mb-2">
        Что такое научно обоснованные рекомендации?
      </h2>
      <p className="text-gray-700 mb-2">
        На этой странице представлены персонализированные расчеты и рекомендации, основанные на научных формулах и исследованиях в области диетологии и спортивной медицины.
      </p>
      <p className="text-gray-700">
        Ваша программа для <strong>{isWeightLoss ? 'снижения' : 'набора'} веса</strong> учитывает ваш пол, возраст, уровень активности и метаболические особенности, 
        что позволяет достичь результата наиболее эффективным и здоровым способом.
      </p>
    </div>
  );
};

// Компонент для научных показателей
const ScientificIndicators = ({ bmr, tdee, calorieAdjustment, calorieAdjustmentPercent }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Научные показатели</h2>
      
      <div className="space-y-4">
        <div className="border-b pb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-gray-600">Базовый метаболизм (BMR):</span>
            <span className="font-bold text-primary">{bmr} ккал</span>
          </div>
          <p className="text-sm text-gray-500">
            Это количество энергии, которое ваше тело расходует в состоянии полного покоя для поддержания жизненно важных функций (дыхание, кровообращение, работа мозга). 
            Рассчитано по формуле Mifflin-St. Jeor с учетом вашего пола, веса, роста и возраста.
          </p>
        </div>
        
        <div className="border-b pb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-gray-600">Общий расход энергии (TDEE):</span>
            <span className="font-bold text-primary relative group">
              {tdee} ккал
              <span className="absolute hidden group-hover:inline-block bg-gray-800 text-white text-xs p-1 rounded -top-1 left-full ml-2 w-52 z-10">
                С учетом адаптивного термогенеза и вашей физической активности
              </span>
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Это общее количество калорий, которое вы расходуете за день с учетом вашей физической активности. 
            TDEE = BMR × коэффициент активности. Именно этот показатель определяет, сколько энергии вам нужно 
            потреблять для поддержания текущего веса.
          </p>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-gray-600">Оптимальный дефицит/профицит:</span>
            <span className="font-bold text-primary">{calorieAdjustment} ккал ({calorieAdjustmentPercent}% от TDEE)</span>
          </div>
          <p className="text-sm text-gray-500">
            Научно обоснованная разница между потреблением калорий и расходом энергии для достижения вашей цели. 
            Данный показатель обеспечивает оптимальную скорость изменения веса – безопасную для здоровья и 
            максимально сохраняющую мышечную массу.
          </p>
        </div>
      </div>
    </div>
  );
};

// Компонент для карточки плана питания
const DietPlanCard = ({ title, value, description, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-start">
      <div className="flex-shrink-0 mr-4 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="text-2xl font-bold text-primary my-1">{value}</div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

// Компонент для дополнительной информации о типе диеты
const DietTypeInfo = ({ dietType, isWeightLoss }) => {
  // Иконка для типа диеты
  const dietIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
  
  const getTitle = () => {
    switch(dietType) {
      case 'cyclic': 
        return "Циклическое углеводное питание";
      case 'evening_carbs': 
        return "Углеводная загрузка вечером";
      case 'intermittent_fasting': 
        return "Интервальное голодание";
      default: 
        return "Стандартный научный подход";
    }
  };
  
  const getValue = () => {
    switch(dietType) {
      case 'cyclic': 
        return "5+2";
      case 'evening_carbs': 
        return "После 16:00";
      case 'intermittent_fasting': 
        return "16:8";
      default: 
        return "Равномерное распределение";
    }
  };
  
  const getDescription = () => {
    switch(dietType) {
      case 'cyclic': 
        return "5 дней низкоуглеводных (50-70г), 2 дня умеренных (100-150г). Предотвращает адаптацию к низкоуглеводной диете.";
      case 'evening_carbs': 
        return "До 16:00 - белки, жиры и овощи. После 16:00 - добавление сложных углеводов (70-100г). Улучшает сон и восстановление.";
      case 'intermittent_fasting': 
        return isWeightLoss 
          ? "16 часов без еды, 8 часов окно питания (12:00-20:00). Способствует аутофагии и более глубокому жиросжиганию." 
          : "Окно питания 8 часов. Может замедлять набор массы, подходит для чистого набора с контролем жира.";
      default: 
        return "3-5 приемов пищи в день с равномерным распределением макронутриентов. Научно обоснованный подход.";
    }
  };
  
  return (
    <DietPlanCard
      title={`Тип диеты: ${getTitle()}`}
      value={getValue()}
      description={getDescription()}
      icon={dietIcon}
    />
  );
};

// Компонент для научно оптимального плана питания
const OptimalDietPlan = ({ 
  recommendedCalories, 
  calorieAdjustment, 
  calorieAdjustmentPercent, 
  dietType, 
  isWeightLoss,
  adaptationDay,
  weeksToGoal
}) => {
  // Иконки для карточек
  const caloriesIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
  
  const adaptationIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
  
  const timeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
  
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Научно оптимальный план питания</h2>
      
      <DietPlanCard
        title="Рекомендуемое ежедневное потребление"
        value={`${recommendedCalories} ккал/день`}
        description={`${isWeightLoss ? 'Дефицит' : 'Профицит'} ${calorieAdjustment} ккал (${calorieAdjustmentPercent}% от TDEE). Оптимальный объем для достижения цели.`}
        icon={caloriesIcon}
      />
      
      <DietTypeInfo 
        dietType={dietType}
        isWeightLoss={isWeightLoss}
      />
      
      <DietPlanCard
        title={isWeightLoss ? 'День повышенной калорийности' : 'День пониженной калорийности'}
        value={`${adaptationDay} ккал/день`}
        description={isWeightLoss 
          ? '1 день в неделю для поддержания метаболизма и предотвращения адаптации. Рекомендуется совмещать с тренировкой.' 
          : '1 день в неделю для предотвращения излишнего накопления жира и поддержания чувствительности к инсулину.'}
        icon={adaptationIcon}
      />
      
      <DietPlanCard
        title="Ожидаемое время достижения цели"
        value={`${weeksToGoal} недель`}
        description={`С учетом диетических перерывов/фаз циклирования каждые 12 недель для оптимального прогресса и минимизации адаптации организма.`}
        icon={timeIcon}
      />
    </div>
  );
};

// Компонент для научных рекомендаций
const ScientificRecommendations = ({ isWeightLoss, gender, dietType, protein, macros }) => {
  // Рекомендации для похудения
  const weightLossRecs = {
    common: [
      `Поддержание высокого потребления белка — ${protein} г/день (${(protein / macros.weight).toFixed(1)} г на кг веса)`,
      "Диетические перерывы на 7 дней каждые 12 недель для восстановления метаболизма",
      "Потребление не менее 25-30 г клетчатки в день и 30-35 мл воды на кг веса",
      "Включение регулярной физической активности для поддержания мышечной массы"
    ],
    male: [
      "Допустимость более высокого дефицита калорий (до 25% TDEE) при большом проценте жира",
      "Включение 2-3 силовых тренировок в неделю для максимального сохранения мышц"
    ],
    female: [
      "Уменьшение дефицита до 15% TDEE в лютеиновой фазе цикла",
      "Снижение интенсивности тренировок в фолликулярной фазе",
      "Повышение потребления белка в предменструальный период"
    ],
    dietSpecific: {
      standard: [
        "Распределение углеводов равномерно в течение дня",
        "Фокус на продукты с низким гликемическим индексом"
      ],
      cyclic: [
        "В низкоуглеводные дни особый фокус на белки и здоровые жиры",
        "Углеводные дни совмещать с силовыми тренировками"
      ],
      evening_carbs: [
        "До 16:00 потребление белков, жиров и овощей",
        "После 16:00 добавление сложных углеводов к ужину"
      ],
      intermittent_fasting: [
        "Соблюдение 16-часового периода голодания ежедневно",
        "Прием основной части калорий в середине окна питания"
      ]
    }
  };
  
  // Рекомендации для набора массы
  const weightGainRecs = {
    common: [
      `Поддержание высокого потребления белка — ${protein} г/день (${(protein / macros.weight).toFixed(1)} г на кг веса)`,
      "Фазы поддержания по 2 недели каждые 12 недель активного набора",
      "Потребление 30-35 г клетчатки в день и 35-40 мл воды на кг веса",
      "Фокус на прогрессивные силовые тренировки 3-5 раз в неделю"
    ],
    male: [
      "Приоритет силовых тренировок с базовыми упражнениями на основные мышечные группы",
      "Увеличение профицита до 500 ккал при низком проценте жира (<12%)"
    ],
    female: [
      "Адаптация питания к фазам цикла — больше углеводов в фолликулярной фазе",
      "Больший акцент на белок в лютеиновой фазе",
      "Периодизация тренировок в соответствии с фазами цикла"
    ],
    dietSpecific: {
      standard: [
        "Равномерное распределение макронутриентов на 4-6 приемов пищи",
        "Потребление белка до и после тренировки"
      ],
      cyclic: [
        "Высокоуглеводные дни в дни тяжелых тренировок",
        "Умеренно-углеводные дни в дни отдыха или легких тренировок"
      ],
      evening_carbs: [
        "Богатые белком и жирами приемы пищи в первой половине дня",
        "Концентрация углеводов вокруг тренировок и в вечернее время"
      ],
      intermittent_fasting: [
        "Увеличенная порция белка в первом приеме пищи дня",
        "Больший калорийный профицит в тренировочные дни"
      ]
    }
  };
  
  // Выбираем набор рекомендаций в зависимости от цели
  const recs = isWeightLoss ? weightLossRecs : weightGainRecs;
  
  // Собираем все рекомендации в один массив
  const allRecs = [
    ...recs.common,
    ...(gender === 'male' ? recs.male : recs.female),
    ...recs.dietSpecific[dietType]
  ];
  
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Научные рекомендации с учетом пола и цели {isWeightLoss ? 'снижения' : 'увеличения'} веса:
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        {allRecs.map((rec, index) => (
          <li key={index} className="text-gray-800">{rec}</li>
        ))}
      </ul>
    </div>
  );
};

const CalculationsPage = () => {
  const { state } = useAppContext();
  
  // Получаем основные показатели
  const bmr = state.bmr;
  const tdee = state.tdee;
  const isWeightLoss = state.weightLossGoal;
  const calorieAdjustment = isWeightLoss ? 500 : 250;
  const calorieAdjustmentPercent = Math.round((calorieAdjustment / tdee) * 100);
  const recommendedCalories = state.recommendedCalories;
  
  // Рассчитываем калории для дня адаптации
  const adaptationDay = isWeightLoss 
    ? Math.round(tdee) // День с повышенной калорийностью для похудения
    : Math.round(tdee * 0.9); // День с пониженной калорийностью для набора массы
  
  // Макронутриенты и дополнительные данные
  const macros = {
    ...state.macros,
    weight: state.currentWeight
  };
  
  return (
    <Layout title="Основные рекомендации">
      <IntroductionBlock isWeightLoss={isWeightLoss} />
      
      <ScientificIndicators 
        bmr={bmr} 
        tdee={tdee} 
        calorieAdjustment={calorieAdjustment}
        calorieAdjustmentPercent={calorieAdjustmentPercent}
      />
      
      <OptimalDietPlan 
        recommendedCalories={recommendedCalories}
        calorieAdjustment={calorieAdjustment}
        calorieAdjustmentPercent={calorieAdjustmentPercent}
        dietType={state.dietType}
        isWeightLoss={isWeightLoss}
        adaptationDay={adaptationDay}
        weeksToGoal={state.weeksToGoal}
      />
      
      <ScientificRecommendations 
        isWeightLoss={isWeightLoss}
        gender={state.gender}
        dietType={state.dietType}
        protein={state.macros.protein}
        macros={macros}
      />
    </Layout>
  );
};

export default CalculationsPage; 