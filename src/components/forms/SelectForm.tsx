import type { ChangeEvent } from 'react';

import type { Categories } from '@prisma/client';
import { api } from '@utils/api';

interface SelectFormInterface {
  categories: Categories[] | undefined;
  activeCategoryId: string | undefined;
  expenseId: string;
}

export const SelectForm = ({
  categories,
  activeCategoryId,
  expenseId,
}: SelectFormInterface) => {
  const utils = api.useContext();

  const updateCategory = api.expenses.updateExpenseCategory.useMutation({
    onSettled() {
      utils.expenses.expensesWithCategory.invalidate();
    },
  });

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateCategory.mutate({ categoryId: event.target.value, expenseId });
  };
  return (
    <form>
      <select
        onChange={handleChange}
        className="select w-full max-w-fit "
        value={activeCategoryId || ''}
      >
        <option value=""></option>
        {categories?.map((category) => (
          <option value={category.id} key={category.id}>
            {category.categoryName}
          </option>
        ))}
      </select>
    </form>
  );
};
