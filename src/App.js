import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import SettingsPage from './pages/SettingsPage';
import MenuPage from './pages/MenuPage';
import CalculationsPage from './pages/CalculationsPage';
import WeightTrajectoryPage from './pages/WeightTrajectoryPage';
import NutritionPage from './pages/NutritionPage';
import ActivityPage from './pages/ActivityPage';
import LifestylePage from './pages/LifestylePage';

// Компонент для маршрутизации
const AppRouter = () => {
  const { state } = useAppContext();
  
  // Переключение между экранами на основе activeScreen из контекста
  const renderScreen = () => {
    switch (state.activeScreen) {
      case 'settings':
        return <SettingsPage />;
      case 'menu':
        return <MenuPage />;
      case 'calculations':
        return <CalculationsPage />;
      case 'weight_trajectory':
        return <WeightTrajectoryPage />;
      case 'nutrition':
        return <NutritionPage />;
      case 'activity':
        return <ActivityPage />;
      case 'lifestyle':
        return <LifestylePage />;
      default:
        return <SettingsPage />;
    }
  };
  
  return renderScreen();
};

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App; 