import type { Categories } from '@prisma/client';

interface CategoryWithValue extends Categories {
  value: number;
}

export interface CategoriesWithValues {
  [categoryId: string]: CategoryWithValue;
}
