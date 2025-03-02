"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group/index";

// Импортируем типы из основного компонента
import type { CalculatorData, Gender } from '@/types/calculator';

interface UserSettingsTabProps {
  data: CalculatorData;
}

// Значения по умолчанию для полей ввода
const DEFAULT_VALUES = {
  currentWeight: 97.3,
  targetWeight: 90,
  height: 189,
  age: 32,
  bodyFatPercentage: 29.0
};

const UserSettingsTab: React.FC<UserSettingsTabProps> = ({ data }) => {
  // Локальные состояния для контроля ввода
  const [localInputs, setLocalInputs] = useState({
    currentWeight: '',
    targetWeight: '',
    height: '',
    age: '',
    bodyFat: ''
  });
  
  const {
    gender, setGender,
    currentWeight, setCurrentWeight,
    targetWeight, setTargetWeight,
    height, setHeight,
    age, setAge,
    bodyFatPercentage, setBodyFatPercentage,
    activityLevel, setActivityLevel,
    dietType, setDietType,
  } = data;

  // Инициализация локальных значений при монтировании и изменении значений
  React.useEffect(() => {
    setLocalInputs({
      currentWeight: currentWeight !== null ? currentWeight.toString() : '',
      targetWeight: targetWeight !== null ? targetWeight.toString() : '',
      height: height !== null ? height.toString() : '',
      age: age !== null ? age.toString() : '',
      bodyFat: bodyFatPercentage !== null ? bodyFatPercentage.toString() : ''
    });
  }, [currentWeight, targetWeight, height, age, bodyFatPercentage]);

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-xl font-medium mb-6 text-center">Персональные параметры</h3>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Пол:</Label>
          <RadioGroup
            value={gender}
            onValueChange={(value: string) => setGender(value as Gender)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male" className="cursor-pointer">Мужской</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female" className="cursor-pointer">Женский</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="current-weight">Текущий вес (кг):</Label>
          <Input
            id="current-weight"
            type="number"
            value={localInputs.currentWeight}
            onChange={(e) => {
              const value = e.target.value;
              setLocalInputs(prev => ({ ...prev, currentWeight: value }));
              setCurrentWeight(value === '' ? null : Number(value));
            }}
            onBlur={() => {
              if (currentWeight === null) {
                setCurrentWeight(DEFAULT_VALUES.currentWeight);
                setLocalInputs(prev => ({ 
                  ...prev, 
                  currentWeight: DEFAULT_VALUES.currentWeight.toString() 
                }));
              }
            }}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="target-weight">Целевой вес (кг):</Label>
          <Input
            id="target-weight"
            type="number"
            value={localInputs.targetWeight}
            onChange={(e) => {
              const value = e.target.value;
              setLocalInputs(prev => ({ ...prev, targetWeight: value }));
              setTargetWeight(value === '' ? null : Number(value));
            }}
            onBlur={() => {
              if (targetWeight === null) {
                setTargetWeight(DEFAULT_VALUES.targetWeight);
                setLocalInputs(prev => ({ 
                  ...prev, 
                  targetWeight: DEFAULT_VALUES.targetWeight.toString() 
                }));
              }
            }}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="height">Рост (см):</Label>
          <Input
            id="height"
            type="number"
            value={localInputs.height}
            onChange={(e) => {
              const value = e.target.value;
              setLocalInputs(prev => ({ ...prev, height: value }));
              setHeight(value === '' ? null : Number(value));
            }}
            onBlur={() => {
              if (height === null) {
                setHeight(DEFAULT_VALUES.height);
                setLocalInputs(prev => ({ 
                  ...prev, 
                  height: DEFAULT_VALUES.height.toString() 
                }));
              }
            }}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age">Возраст:</Label>
          <Input
            id="age"
            type="number"
            value={localInputs.age}
            onChange={(e) => {
              const value = e.target.value;
              setLocalInputs(prev => ({ ...prev, age: value }));
              setAge(value === '' ? null : Number(value));
            }}
            onBlur={() => {
              if (age === null) {
                setAge(DEFAULT_VALUES.age);
                setLocalInputs(prev => ({ 
                  ...prev, 
                  age: DEFAULT_VALUES.age.toString() 
                }));
              }
            }}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="body-fat">Процент жира (%):</Label>
          <Input
            id="body-fat"
            type="number"
            value={localInputs.bodyFat}
            onChange={(e) => {
              const value = e.target.value;
              setLocalInputs(prev => ({ ...prev, bodyFat: value }));
              setBodyFatPercentage(value === '' ? null : Number(value));
            }}
            onBlur={() => {
              if (bodyFatPercentage === null) {
                setBodyFatPercentage(DEFAULT_VALUES.bodyFatPercentage);
                setLocalInputs(prev => ({ 
                  ...prev, 
                  bodyFat: DEFAULT_VALUES.bodyFatPercentage.toString() 
                }));
              }
            }}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="activity-level">Уровень активности:</Label>
          <Select
            value={activityLevel}
            onValueChange={setActivityLevel}
          >
            <SelectTrigger id="activity-level">
              <SelectValue placeholder="Выберите уровень активности" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Сидячий образ жизни</SelectItem>
              <SelectItem value="light">Легкая активность (1-3 раза в неделю)</SelectItem>
              <SelectItem value="moderate">Умеренная активность (3-5 раз в неделю)</SelectItem>
              <SelectItem value="active">Активный образ жизни (6-7 раз в неделю)</SelectItem>
              <SelectItem value="veryActive">Очень активный (спортсмены, физ. работа)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="diet-type">Тип диеты:</Label>
          <Select
            value={dietType}
            onValueChange={setDietType}
          >
            <SelectTrigger id="diet-type">
              <SelectValue placeholder="Выберите тип диеты" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Стандартный научный подход</SelectItem>
              <SelectItem value="cyclic">Циклическое углеводное питание (5+2)</SelectItem>
              <SelectItem value="carb-backloading">Углеводная загрузка вечером</SelectItem>
              <SelectItem value="if">Интервальное голодание (16:8)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsTab; 