'use client';

import React from 'react';
import { CategoryModel } from '@/app/api/client';
import Link from 'next/link';

const CategoryCard = (props: CategoryModel) => {
  const { id, title, colorHex } = props;

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha / 1000})`;
  };

  const backgroundColor = hexToRgba(colorHex!, 750);

  return (
    <Link href={`/dashboard/categories/${id}`}>
      <div
        className="group relative h-40 overflow-hidden rounded-xl transition-transform duration-200 hover:scale-105"
        style={{ backgroundColor: backgroundColor }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
