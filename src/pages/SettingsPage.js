import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAppContext } from '../context/AppContext';

const SettingsPage = () => {
  const { state, updateUserSettings } = useAppContext();
  
  // Локальное состояние формы
  const [formData, setFormData] = useState({
    gender: state.gender,
    currentWeight: state.currentWeight,
    targetWeight: state.targetWeight,
    height: state.height,
    age: state.age,
    bodyFat: state.bodyFat,
    activityLevel: state.activityLevel,
    dietType: state.dietType,
  });
  
  // Обработчик изменения полей формы
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Числовые поля конвертируем в Number, пустые значения обрабатываем особым образом
    if (type === 'number') {
      if (value === '') {
        setFormData(prev => ({ ...prev, [name]: '' }));
      } else {
        setFormData(prev => ({ ...prev, [name]: Number(value) }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Обработчик при получении фокуса инпутом
  const handleFocus = (e) => {
    const { name } = e.target;
    // Очищаем поле при фокусе
    setFormData(prev => ({ ...prev, [name]: '' }));
  };
  
  // Обработчик при потере фокуса инпутом
  const handleBlur = (e) => {
    const { name, type } = e.target;
    
    // Если поле пустое, восстанавливаем начальное значение
    if (formData[name] === '' && type === 'number') {
      setFormData(prev => ({ ...prev, [name]: state[name] || 0 }));
    }
  };
  
  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserSettings(formData);
  };
  
  // Проверка доступности интервального голодания
  // (доступно только для похудения)
  const isIntermittentFastingAvailable = formData.targetWeight < formData.currentWeight;
  
  return (
    <Layout title="Рассчет программы">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Описание страницы настроек */}
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-primary mb-2">О настройках</h2>
          <p className="text-gray-700 mb-2">
            Здесь вы можете указать свои персональные данные для точного расчета 
            индивидуальной программы питания и тренировок.
          </p>
          <p className="text-gray-700">
            На основе введенных параметров система создаст для вас персонализированные 
            рекомендации, соответствующие вашим целям и физиологическим особенностям.
          </p>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-primary">Личные данные</h2>
          
          {/* Выбор пола */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пол</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  className="form-radio text-primary"
                />
                <span className="ml-2">Мужской</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  className="form-radio text-primary"
                />
                <span className="ml-2">Женский</span>
              </label>
            </div>
          </div>
          
          {/* Текущий вес */}
          <div>
            <label htmlFor="currentWeight" className="block text-sm font-medium text-gray-700 mb-1">
              Текущий вес (кг)
            </label>
            <input
              type="number"
              name="currentWeight"
              id="currentWeight"
              min="30"
              max="300"
              step="0.1"
              value={formData.currentWeight}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-lg p-2 border"
            />
          </div>
          
          {/* Целевой вес */}
          <div>
            <label htmlFor="targetWeight" className="block text-sm font-medium text-gray-700 mb-1">
              Целевой вес (кг)
            </label>
            <input
              type="number"
              name="targetWeight"
              id="targetWeight"
              min="30"
              max="300"
              step="0.1"
              value={formData.targetWeight}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-lg p-2 border"
            />
          </div>
          
          {/* Рост */}
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
              Рост (см)
            </label>
            <input
              type="number"
              name="height"
              id="height"
              min="100"
              max="250"
              value={formData.height}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-lg p-2 border"
            />
          </div>
          
          {/* Возраст */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Возраст
            </label>
            <input
              type="number"
              name="age"
              id="age"
              min="18"
              max="100"
              value={formData.age}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-lg p-2 border"
            />
          </div>
          
          {/* Процент жира */}
          <div>
            <label htmlFor="bodyFat" className="block text-sm font-medium text-gray-700 mb-1">
              Процент жира (%)
            </label>
            <input
              type="number"
              name="bodyFat"
              id="bodyFat"
              min="1"
              max="60"
              step="0.1"
              value={formData.bodyFat}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-lg p-2 border"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-primary">Активность и питание</h2>
          
          {/* Уровень активности */}
          <div>
            <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-1">
              Уровень активности
            </label>
            <select
              name="activityLevel"
              id="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-lg p-2 border"
            >
              <option value="sedentary">Сидячий образ жизни</option>
              <option value="light">Легкая активность (1-3 раза в неделю)</option>
              <option value="moderate">Умеренная активность (3-5 раз в неделю)</option>
              <option value="active">Активный образ жизни (6-7 раз в неделю)</option>
              <option value="very_active">Очень активный (спортсмены, физическая работа)</option>
            </select>
          </div>
          
          {/* Тип диеты */}
          <div>
            <label htmlFor="dietType" className="block text-sm font-medium text-gray-700 mb-1">
              Тип диеты
            </label>
            <select
              name="dietType"
              id="dietType"
              value={formData.dietType}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-lg p-2 border"
            >
              <option value="standard">Стандартный научный подход</option>
              <option value="cyclic">Циклическое углеводное питание (5+2)</option>
              <option value="evening_carbs">Углеводная загрузка вечером</option>
              <option value="intermittent_fasting" disabled={!isIntermittentFastingAvailable}>
                Интервальное голодание (16:8) {!isIntermittentFastingAvailable && '(только для похудения)'}
              </option>
            </select>
            {!isIntermittentFastingAvailable && formData.dietType === 'intermittent_fasting' && (
              <p className="text-red-500 text-sm mt-1">
                Интервальное голодание доступно только для целей похудения.
                Пожалуйста, выберите другой тип диеты или измените целевой вес.
              </p>
            )}
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Рассчитать план
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default SettingsPage; 