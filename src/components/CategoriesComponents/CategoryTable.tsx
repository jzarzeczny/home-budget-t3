import type { FC } from 'react';

import type { Categories } from '@prisma/client';

interface CategoryTableInterface {
  categories: Categories[] | undefined;
  removeCategory: (categoryId: string) => void;
}

export const CategoryTable: FC<CategoryTableInterface> = ({
  categories,
  removeCategory,
}) => {
  return (
    <table className="mx-auto">
      <thead className=" bg-slate-200 border-b">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Categoria
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Akcja
          </th>
        </tr>
      </thead>
      <tbody className="">
        {categories &&
          categories.map((category) => (
            <CategoryRow
              key={category.id || 'temp-key'}
              categoryData={category}
              removeCategory={removeCategory}
            />
          ))}
      </tbody>
    </table>
  );
};

const CategoryRow = ({
  categoryData,
  removeCategory,
}: {
  categoryData: Categories;
  removeCategory: (categoryId: string) => void;
}) => {
  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <p>{categoryData.categoryName}</p>
      </th>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <div>
          <button onClick={() => removeCategory(categoryData.id)}>Usuń</button>
        </div>
      </td>
    </tr>
  );
};
