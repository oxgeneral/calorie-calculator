"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface StoryContainerProps {
  stories: {
    id: string;
    content: React.ReactNode;
  }[];
  onComplete?: () => void;
  initialIndex?: number;
}

export const StoryContainer: React.FC<StoryContainerProps> = ({ 
  stories, 
  onComplete,
  initialIndex = 0
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Для отслеживания времени нахождения на каждой истории
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Сбрасываем таймер при переключении истории
    if (timer) clearTimeout(timer);
    
    // Автоматическое переключение на следующую историю через 60 секунд (опционально)
    // const newTimer = setTimeout(() => {
    //   handleNext();
    // }, 60000);
    // setTimer(newTimer);

    // Очищаем таймер при размонтировании
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Обработка свайпов
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  // Обработка клика на экране для перехода к следующей/предыдущей истории
  const handleScreenClick = (e: React.MouseEvent) => {
    const screenWidth = window.innerWidth;
    const clickX = e.clientX;
    
    if (clickX < screenWidth / 3) {
      handlePrev();
    } else if (clickX > (screenWidth * 2) / 3) {
      handleNext();
    }
  };

  return (
    <div 
      className="h-screen w-full relative overflow-hidden bg-black"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={handleScreenClick}
    >
      {/* Индикаторы прогресса */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between px-1 py-2">
        {stories.map((_, index) => (
          <div 
            key={index} 
            className={cn(
              "h-1 mx-0.5 rounded-full transition-all duration-200 flex-1",
              index < currentIndex 
                ? "bg-white" 
                : index === currentIndex 
                  ? "bg-white/80" 
                  : "bg-white/30"
            )}
          />
        ))}
      </div>
      
      {/* Содержимое истории */}
      <div className="h-full w-full pt-6 px-3 pb-16 overflow-y-auto">
        {stories[currentIndex].content}
      </div>
      
      {/* Кнопки навигации для простоты использования (опционально) */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-6">
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className="p-2 text-white/70 disabled:text-white/30 disabled:cursor-not-allowed"
        >
          Назад
        </button>
        <button 
          onClick={handleNext} 
          className="p-2 text-white/70"
        >
          {currentIndex === stories.length - 1 ? 'Завершить' : 'Далее'}
        </button>
      </div>
    </div>
  );
};

export default StoryContainer; 