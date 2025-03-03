"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface CategorySelectionProps {
  categories: Category[];
}

export const CategorySelection: React.FC<CategorySelectionProps> = ({ categories }) => {
  const router = useRouter();

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/stories/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 pt-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Худей научно</h1>
        <p className="text-white/70">Выберите категорию</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="flex items-center p-4 rounded-xl transition-all hover:bg-white/5 active:scale-98 active:bg-white/10"
            style={{ backgroundColor: `${category.color}20` }}
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mr-4" 
              style={{ backgroundColor: `${category.color}40` }}
            >
              {category.icon && (
                <span className="text-2xl">{category.icon}</span>
              )}
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg">{category.title}</h3>
              <p className="text-sm text-white/70">{category.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelection; 