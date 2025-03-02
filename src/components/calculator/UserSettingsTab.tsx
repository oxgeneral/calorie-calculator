"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group/index";

// Импортируем типы из основного компонента
import type { CalculatorData, Gender } from '@/types/calculator';

interface UserSettingsTabProps {
  data: CalculatorData;
}

const UserSettingsTab: React.FC<UserSettingsTabProps> = ({ data }) => {
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
            value={currentWeight}
            onChange={(e) => setCurrentWeight(parseFloat(e.target.value) || 0)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="target-weight">Целевой вес (кг):</Label>
          <Input
            id="target-weight"
            type="number"
            value={targetWeight}
            onChange={(e) => setTargetWeight(parseFloat(e.target.value) || 0)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="height">Рост (см):</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age">Возраст:</Label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 0)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="body-fat">Процент жира (%):</Label>
          <Input
            id="body-fat"
            type="number"
            value={bodyFatPercentage}
            onChange={(e) => setBodyFatPercentage(parseFloat(e.target.value) || 0)}
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