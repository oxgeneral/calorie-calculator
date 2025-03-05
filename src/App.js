import React from 'react';
import { useAppContext, AppProvider } from './context/AppContext';

// Импорт страниц
import SettingsPage from './pages/SettingsPage';
import MenuPage from './pages/MenuPage';
import CalculationsPage from './pages/CalculationsPage';
import NutritionPage from './pages/NutritionPage';
import ActivityPage from './pages/ActivityPage';
import WeightTrajectoryPage from './pages/WeightTrajectoryPage';
import LifestylePage from './pages/LifestylePage';
import StartPage from './pages/StartPage';

// Компонент маршрутизации для отображения активного экрана
const AppRouter = () => {
  const { state } = useAppContext();
  
  // Отображаем нужный экран в зависимости от состояния
  switch (state.activeScreen) {
    case 'start':
      return <StartPage />;
    case 'settings':
      return <SettingsPage />;
    case 'menu':
      return <MenuPage />;
    case 'calculations':
      return <CalculationsPage />;
    case 'nutrition':
      return <NutritionPage />;
    case 'activity':
      return <ActivityPage />;
    case 'weight_trajectory':
      return <WeightTrajectoryPage />;
    case 'lifestyle':
      return <LifestylePage />;
    default:
      return <StartPage />;
  }
};

function App() {
  return (
    <AppProvider>
      <div className="App">
        <AppRouter />
      </div>
    </AppProvider>
  );
}

export default App; 