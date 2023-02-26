import type { FC } from 'react';

import type { Categories } from '@prisma/client';

interface CategoryTableInterface {
  categories: Categories[] | undefined;
  removeCategory: (categoryId: string) => void;
}

const CategoryRow = ({
  categoryData,
  removeCategory,
}: {
  categoryData: Categories;
  removeCategory: (categoryId: string) => void;
}) => {
  console.log(categoryData);
  return (
    <tr className="flex w-full">
      <th className="flex-1">
        <p
          className={`rounded-md bg-${categoryData.categoryColor}-500 p-2 font-normal `}
        >
          {categoryData.categoryName}
        </p>
      </th>
      <td className="flex-1">
        <div className="flex w-full">
          <button
            className="flex-start btn"
            onClick={() => removeCategory(categoryData.id)}
          >
            Usuń
          </button>
        </div>
      </td>
    </tr>
  );
};

export const CategoryTable: FC<CategoryTableInterface> = ({
  categories,
  removeCategory,
}) => {
  return (
    <div className="flex  flex-col items-center lg:col-start-3 lg:col-end-5 lg:row-start-2">
      <h3 className=" pt-5 pb-8 text-center text-xl">Kategorie</h3>
      <table className="mx-3 table w-full ">
        <thead className="flex w-full">
          <tr className="flex w-full">
            <th className="w-1/2">Categoria</th>
            <th className="w-1/2">Akcja</th>
          </tr>
        </thead>
        <tbody
          className="flex w-full flex-col items-center justify-between overflow-y-scroll"
          style={{ height: 'max-content' }}
        >
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
    </div>
  );
};
