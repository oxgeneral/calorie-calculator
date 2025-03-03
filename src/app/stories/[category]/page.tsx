"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import StoryContainer from '@/components/story/StoryContainer';
import { generateStories } from '@/data/stories';

interface StoriesPageProps {
  params: {
    category: string;
  };
}

export default function StoriesPage({ params }: StoriesPageProps) {
  const router = useRouter();
  const { category } = params;
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Генерация историй на основе категории
    // В реальном приложении здесь могут быть API-запросы или другая логика
    const generatedStories = generateStories(category);
    setStories(generatedStories);
    setLoading(false);
  }, [category]);

  const handleComplete = () => {
    // Возвращение к выбору категорий
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full mb-4 mx-auto"></div>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Контент не найден</h1>
          <p className="mb-6">Истории для категории {category} в разработке</p>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg"
          >
            Вернуться к категориям
          </button>
        </div>
      </div>
    );
  }

  return <StoryContainer stories={stories} onComplete={handleComplete} />;
} 