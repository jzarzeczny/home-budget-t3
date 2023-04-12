import { type NextPage } from 'next';
import Head from 'next/head';
import type { AddExpense } from 'types/Expenses';

import { Heading } from '@components/common/Heading';
import { Instruction } from '@components/common/Instruction';
import { Section } from '@components/common/Section';
import { AddExpenseFileForm } from '@components/forms/AddExpenseFileForm';
import { AddExpenseForm } from '@components/forms/AddExpenseForm';
import { SelectForm } from '@components/forms/SelectForm';
import { Layout } from '@components/layout/Layout';
import type { Expenses } from '@prisma/client';
import { api } from '@utils/api';

const App: NextPage = () => {
  const utils = api.useContext();

  const addExpense = api.expenses.addExpense.useMutation({
    onSettled() {
      utils.expenses.expensesWithCategory.invalidate();
    },
  });

  const addExpenses = api.expenses.addExpenses.useMutation({
    onSettled() {
      utils.expenses.expensesWithCategory.invalidate();
    },
  });

  const categoriesData = api.categories.getAllCategories.useQuery();

  const { data: expenses } = api.expenses.expensesWithCategory.useQuery();

  const addCostToCategory = (data: AddExpense | AddExpense[]) => {
    console.log(data);
    if (Array.isArray(data)) {
      const expensesData: Omit<Expenses, 'id' | 'userId' | 'createdAt'>[] =
        data.map((singleExpense) => ({
          categoryId: null,
          title: singleExpense.title || '',
          contractor: singleExpense.contractor || '',
          description: 'now',
          transactionDate: new Date(
            singleExpense.transactionDate || new Date()
          ),
          value: Number(singleExpense.value) || 0,
          currency: singleExpense.currency || 'PLN',
        }));

      return addExpenses.mutate(expensesData);
    }

    const expenseData: Omit<Expenses, 'id' | 'userId' | 'createdAt'> = {
      categoryId: null,
      title: data.title || '',
      contractor: data.contractor || '',
      description: 'now',
      transactionDate: new Date(data.transactionDate || new Date()),
      value: Number(data.value) || 0,
      currency: data.currency || 'PLN',
    };

    return addExpense.mutate(expenseData);
  };

  return (
    <>
      <Head>
        <title>Wydatki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className=" h-full gap-4 overflow-hidden">
          <Instruction />
          <Section alignment={''}>
            <Heading text="Dodaj wydatki" />
            <AddExpenseForm setExpense={addCostToCategory} />
            <Heading text="Importuj wydatki" />
            <div className="flex items-center justify-around px-5">
              <AddExpenseFileForm setExpenses={addCostToCategory} />
            </div>
          </Section>
          <section>
            <Heading text={'Tabela wydatków'} />
            {expenses?.length ? (
              <div className="overflow-x-auto">
                <table className="table table-normal w-full">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Tytuł</th>
                      <th className="hidden lg:table-cell">Miejsce</th>
                      <th>Kategoria</th>
                      <th className="hidden lg:table-cell">Kwota</th>
                      <th>Akcja</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses?.map((expense) => (
                      <tr key={expense.id}>
                        <th>
                          {expense.transactionDate.toLocaleDateString('pl-PL')}
                        </th>
                        <td>{expense.title}</td>
                        <td className="hidden lg:table-cell">
                          {expense.contractor}
                        </td>
                        <td className="hidden lg:table-cell">
                          <SelectForm
                            categories={categoriesData.data}
                            activeCategoryId={expense.category?.id}
                            expenseId={expense.id}
                          />
                        </td>
                        <td>{`${expense.value}${expense.currency}`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Nie masz wydatków</p>
            )}
          </section>
        </main>
      </Layout>
    </>
  );
};

export default App;
