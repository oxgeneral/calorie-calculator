import React from 'react';
import Layout from '../components/Layout';
import { useAppContext } from '../context/AppContext';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';

// Регистрируем необходимые компоненты Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

// Компонент для отображения карточки с заголовком и содержимым
const InfoCard = ({ title, content, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-3">
        <div className="flex-shrink-0 mr-3 text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="text-gray-700">
        {content}
      </div>
    </div>
  );
};

// Компонент для отображения круговой диаграммы термического эффекта пищи
const TEFChart = ({ data }) => {
  const chartOptions = {
    cutout: '50%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw} ккал`;
          }
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="h-64">
      <Doughnut data={data} options={chartOptions} />
    </div>
  );
};

// Компонент временной шкалы для окна питания
const FeedingWindowTimeline = ({ startHour, endHour }) => {
  const hours = Array.from({ length: 19 }, (_, i) => i + 6); // От 6 до 24

  return (
    <div className="mt-4">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-500">6:00</span>
        <span className="text-xs text-gray-500">12:00</span>
        <span className="text-xs text-gray-500">18:00</span>
        <span className="text-xs text-gray-500">24:00</span>
      </div>
      <div className="flex w-full h-6 bg-gray-200 rounded-full overflow-hidden">
        {hours.map(hour => {
          const isActive = hour >= startHour && hour < endHour;
          return (
            <div 
              key={hour} 
              className={`flex-1 ${isActive ? 'bg-primary' : ''} ${hour === startHour ? 'rounded-l-full' : ''} ${hour === endHour - 1 ? 'rounded-r-full' : ''}`}
            ></div>
          );
        })}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-600">Время (часы)</span>
        <span className="text-xs text-primary font-medium">{startHour}:00 - {endHour}:00: Окно питания</span>
      </div>
    </div>
  );
};

// Компонент для отображения графика гидратации
const HydrationSchedule = ({ waterPerDay, weightLossGoal }) => {
  const intervals = weightLossGoal ? [
    { time: "6:00-8:00", amount: "300-400 мл" },
    { time: "8:00-10:00", amount: "250-300 мл" },
    { time: "10:00-12:00", amount: "250-300 мл" },
    { time: "12:00-14:00", amount: "300-400 мл" },
    { time: "14:00-16:00", amount: "250-300 мл" },
    { time: "16:00-18:00", amount: "250-300 мл" },
    { time: "18:00-20:00", amount: "300-400 мл" },
    { time: "20:00-22:00", amount: "250-300 мл" }
  ] : [
    { time: "При пробуждении", amount: "400-500 мл" },
    { time: "До завтрака", amount: "250-300 мл" },
    { time: "Между приемами пищи", amount: "300-400 мл" },
    { time: "Перед тренировкой", amount: "300-400 мл" },
    { time: "Во время тренировки", amount: "500-700 мл" },
    { time: "После тренировки", amount: "400-500 мл" },
    { time: "Перед сном", amount: "200 мл" }
  ];

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-2 text-sm">
        {intervals.map((interval, index) => (
          <div key={index} className="flex justify-between items-center p-2 bg-primary bg-opacity-10 rounded">
            <span className="font-medium">{interval.time}:</span>
            <span>{interval.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Компонент для отображения влияния сна на гормоны
const SleepHormoneGrid = ({ gender }) => {
  const hormones = gender === 'female' ? [
    { name: "Прогестерон/Серотонин", effect: "Повышение", description: "Улучшает сон и настроение" },
    { name: "Лептин", effect: "Повышение", description: "Улучшает контроль аппетита" },
    { name: "Кортизол", effect: "Снижение", description: "Уменьшает стресс" },
    { name: "Инсулинорезистентность", effect: "Снижение", description: "Улучшает метаболизм" }
  ] : [
    { name: "Тестостерон/Гормон роста", effect: "Повышение", description: "Улучшает восстановление и анаболизм" },
    { name: "Лептин/Адипонектин", effect: "Повышение", description: "Улучшает метаболизм жиров" },
    { name: "Кортизол/Грелин", effect: "Снижение", description: "Контроль аппетита и стресса" },
    { name: "Инсулинорезистентность", effect: "Снижение", description: "Улучшает усвоение нутриентов" }
  ];

  return (
    <div className="grid grid-cols-2 gap-2 mt-3">
      {hormones.map((hormone, index) => (
        <div key={index} className="bg-primary bg-opacity-10 p-2 rounded">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">{hormone.name}</span>
            <span className={`text-xs font-bold ml-1 ${hormone.effect === "Повышение" ? "text-green-600" : "text-red-600"}`}>
              {hormone.effect === "Повышение" ? "↑" : "↓"}
            </span>
          </div>
          <p className="text-xs text-gray-600">
            <span className={`font-medium ${hormone.effect === "Повышение" ? "text-green-600" : "text-red-600"}`}>
              {hormone.effect}:
            </span> {hormone.description}
          </p>
        </div>
      ))}
    </div>
  );
};

// Компонент для карточек стратегий
const StrategiesCard = ({ strategies, title, iconClass, bgColorClass }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
    <h4 className="flex items-center text-lg font-semibold text-primary mb-3">
      <i className={`${iconClass} mr-2`}></i>
      {title}
    </h4>
    <ul className="space-y-2">
      {strategies.map((strategy, index) => (
        <li key={index} className="flex items-start">
          <span className="inline-block w-5 text-primary font-bold">{index + 1}.</span>
          <span className="ml-1">{strategy}</span>
        </li>
      ))}
    </ul>
  </div>
);

const LifestylePage = () => {
  const { state } = useAppContext();
  
  // Определяем параметры пользователя
  const gender = state.gender === 'male' ? 'male' : 'female';
  const weightLossGoal = state.weightLossGoal;
  
  // Расчет рекомендуемого потребления воды
  const waterPerDay = (state.currentWeight * 0.033).toFixed(1);
  
  // Определение окна питания
  const [feedingWindowStart, feedingWindowEnd] = weightLossGoal
    ? (state.dietType === 'intermittent_fasting' ? [12, 20] : [8, 20])
    : (gender === 'male' ? [8, 22] : [8, 20]);
  
  // Данные для термического эффекта пищи
  const tefData = {
    labels: ['Белки', 'Углеводы', 'Жиры', 'Смешанная пища'],
    datasets: [{
      data: [state.macros.protein * 0.25, state.macros.carbs * 0.06, state.macros.fats * 0.03, 50],
      backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#6366F1'],
      hoverBackgroundColor: ['#4338CA', '#059669', '#D97706', '#4F46E5'],
      borderWidth: 0,
    }]
  };
  
  // Расчет общего термического эффекта
  const totalTEF = Math.round(
    state.macros.protein * 0.25 + 
    state.macros.carbs * 0.06 + 
    state.macros.fats * 0.03 + 50
  );
  
  // Когнитивные стратегии
  const cognitiveStrategies = gender === 'female'
    ? (weightLossGoal
        ? [
            "Устанавливайте реалистичные цели по снижению веса (0.5-1 кг в неделю)",
            "Фокусируйтесь на изменениях в здоровье и самочувствии, а не только на весе",
            "Отмечайте нефизические улучшения: энергия, сон, настроение",
            "Визуализируйте свой успех и ведите дневник достижений"
          ]
        : [
            "Отслеживайте прогресс в силовых показателях, а не только изменения веса",
            "Фокусируйтесь на качестве тренировок и восстановлении",
            "Визуализируйте прогресс в телосложении и функциональности",
            "Отмечайте прогресс в повседневных задачах, требующих силы"
          ]
      )
    : (weightLossGoal
        ? [
            "Фокусируйтесь на процессе, а не только результате",
            "Используйте количественные метрики для отслеживания прогресса",
            "Оценивайте еженедельные тренды, а не ежедневные колебания",
            "Устанавливайте промежуточные контрольные точки"
          ]
        : [
            "Отслеживайте силовой прогресс как ключевой индикатор успеха",
            "Делайте фото прогресса каждые 4 недели для визуальной оценки",
            "Устанавливайте конкретные цели по объемным показателям (вес, повторения)",
            "Отмечайте как абсолютный, так и относительный прогресс"
          ]
      );
  
  // Стратегии управления стрессом
  const stressStrategies = gender === 'female'
    ? (weightLossGoal
        ? [
            "Практикуйте осознанное питание и внимательность к сигналам тела",
            "Используйте техники глубокого дыхания и прогрессивную релаксацию",
            "Добавьте регулярные занятия йогой и растяжкой",
            "Развивайте социальную поддержку и общайтесь с единомышленниками"
          ]
        : [
            "Балансируйте интенсивные тренировки с активным восстановлением",
            "Используйте дыхательные практики для снижения симпатической активности",
            "Интегрируйте медитацию и техники осознанности в ежедневную рутину",
            "Планируйте периоды разгрузки для предотвращения перетренированности"
          ]
      )
    : (weightLossGoal
        ? [
            "Включите ежедневную 10-минутную медитацию или практику осознанности",
            "Практикуйте техники 4-7-8 дыхания для быстрого снижения стресса",
            "Используйте физическую активность как средство управления стрессом",
            "Оптимизируйте сон для улучшения гормонального баланса"
          ]
        : [
            "Оптимизируйте восстановление между тренировками",
            "Используйте техники релаксации для улучшения парасимпатической активности",
            "Тщательно планируйте тренировочные циклы для предотвращения перетренированности",
            "Внедрите регулярное отслеживание HRV для контроля восстановления"
          ]
      );
  
  // Изменение пищевого поведения
  const behaviorStrategies = weightLossGoal
    ? [
        "Внедряйте изменения постепенно – по одной привычке за раз",
        "Практикуйте осознанное питание, отмечая вкус, текстуру и насыщение",
        "Планируйте приемы пищи и перекусы заранее, избегая импульсивных решений",
        "Придерживайтесь принципа 80/20: 80% здоровых выборов, 20% любимых блюд",
        gender === 'female' ? "Адаптируйте питание к фазам менструального цикла" : "Избегайте эмоционального переедания, находя здоровые способы снятия стресса"
      ]
    : [
        "Создавайте ритуалы вокруг приемов пищи для психологической готовности",
        "Визуализируйте, как потребляемые продукты способствуют росту мышц",
        "Развивайте сильную нервно-мышечную связь через осознанные тренировки",
        "Переосмыслите увеличение веса как позитивный показатель прогресса",
        gender === 'female' ? "Работайте над преодолением стереотипов о женской мускулатуре" : "Фокусируйтесь на функциональных преимуществах увеличения силы и массы"
      ];
  
  return (
    <Layout title="Рекомендации по образу жизни">
      <div className="p-4 space-y-6">
        {/* Блок "Термический эффект пищи" */}
        <InfoCard title="Термический эффект пищи (TEF)">
          <p className="mb-3">
            Термический эффект пищи — это энергия, которую организм тратит на переваривание, усвоение и обработку потребляемых вами продуктов. Разные макронутриенты имеют разный термический эффект: белки требуют больше всего энергии (20-30% калорий), углеводы меньше (5-10%), жиры наименьше (0-3%).
          </p>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <TEFChart data={tefData} />
            </div>
          </div>
          <div className="mt-3 text-center text-gray-700">
            <strong>Общий термический эффект:</strong> {totalTEF} ккал/день
          </div>
        </InfoCard>
        
        {/* Хронобиология питания */}
        <InfoCard
          title="Хронобиология питания"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          content={
            <div>
              <p className="mb-2">
                <strong>Оптимальное окно питания:</strong> {feedingWindowEnd - feedingWindowStart} часов ({feedingWindowStart}:00 - {feedingWindowEnd}:00)
              </p>
              <p className="text-sm text-gray-600 mb-3">
                {weightLossGoal 
                  ? "Ограниченное окно питания помогает снизить общее потребление калорий и улучшить чувствительность к инсулину"
                  : "Расширенное окно питания позволяет потреблять достаточно калорий и питательных веществ для роста мышц"}
              </p>
              <FeedingWindowTimeline startHour={feedingWindowStart} endHour={feedingWindowEnd} />
              <p className="text-sm text-gray-600 mt-3">
                {weightLossGoal && state.dietType === 'carb_backloading'
                  ? "При углеводной загрузке вечером: основное потребление углеводов после 16:00, особенно после тренировки"
                  : !weightLossGoal
                    ? "Рекомендуется 4-6 приемов пищи в день, включая основные приемы пищи и питательные перекусы"
                    : ""}
              </p>
            </div>
          }
        />
        
        {/* Гидратация */}
        <InfoCard
          title="Гидратация"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          }
          content={
            <div>
              <p className="mb-2">
                <strong>Рекомендуемое потребление воды:</strong> {weightLossGoal ? waterPerDay : (Number(waterPerDay) + 0.5).toFixed(1)} л/день
              </p>
              <p className="text-sm text-gray-600 mb-3">
                {weightLossGoal 
                  ? "Достаточная гидратация способствует термогенезу и помогает контролировать аппетит"
                  : "Оптимальная гидратация улучшает транспорт питательных веществ и поддерживает анаболические процессы"}
              </p>
              <HydrationSchedule waterPerDay={waterPerDay} weightLossGoal={weightLossGoal} />
            </div>
          }
        />
        
        {/* Качество сна */}
        <InfoCard
          title="Качество сна"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          }
          content={
            <div>
              <p className="mb-2">
                <strong>Рекомендуемая продолжительность:</strong> {weightLossGoal ? '7-9' : '8-10'} часов
              </p>
              <p className="text-sm text-gray-600 mb-3">
                {gender === 'female'
                  ? "Качественный сон помогает балансировать женские половые гормоны, улучшает чувствительность к инсулину и регулирует аппетит"
                  : "Сон критически важен для синтеза тестостерона, восстановления мышц и поддержания оптимального метаболизма"
                }
              </p>
              <SleepHormoneGrid gender={gender} />
            </div>
          }
        />
        
        {/* Заголовок блока психологических аспектов */}
        <h2 className="text-xl font-bold text-gray-800 mt-6">Психологические аспекты</h2>
        
        {/* Когнитивные стратегии */}
        <StrategiesCard 
          title="Когнитивные стратегии" 
          iconClass="fas fa-brain"
          strategies={cognitiveStrategies} 
        />
        
        {/* Стратегии управления стрессом */}
        <StrategiesCard 
          title="Стратегии управления стрессом" 
          iconClass="fas fa-spa"
          strategies={stressStrategies} 
        />
        
        {/* Пищевое поведение */}
        <StrategiesCard 
          title={weightLossGoal ? 'Устойчивое изменение пищевого поведения' : 'Психологические аспекты гипертрофии'} 
          iconClass="fas fa-utensils"
          strategies={behaviorStrategies} 
        />
        
        {/* Важная информация в конце страницы */}
        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Важно помнить</h3>
          <p className="text-gray-700 mb-3">
            Здоровье — это не только физические параметры, но и психологическое благополучие. 
            Старайтесь внедрять рекомендации постепенно, не стремясь изменить все сразу. 
            Маленькие, но регулярные изменения в образе жизни часто оказываются более устойчивыми и эффективными в долгосрочной перспективе.
          </p>
          <p className="text-gray-700">
            Если испытываете трудности или у вас есть хронические заболевания, рекомендуется проконсультироваться с врачом или диетологом 
            перед существенными изменениями режима питания или физической активности.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LifestylePage; 