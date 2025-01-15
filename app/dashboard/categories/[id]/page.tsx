import CategoryView from './_components/category-view';
import ScrollablePage from '@/components/ScrollablePage';
import React from 'react';
import { company } from '@/constants/data';

type PageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: `Category - ${company.name}`
};

export default async function CategoryPage({ params }: PageProps) {
  return (
    <ScrollablePage maxHeight="h-screen" direction="vertical">
      <CategoryView categoryId={params.id} />
    </ScrollablePage>
  );
}
