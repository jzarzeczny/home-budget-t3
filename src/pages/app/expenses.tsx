import { type NextPage } from "next";
import { Layout } from "@components/Layout";
import { Instruction } from "@components/common/Instruction";
import { api } from "@utils/api";
import { AddExpenseForm } from "@components/forms/AddExpenseForm";
import { Heading } from "@components/common/Heading";
import Link from "next/link";
import { AddExpenseFileForm } from "@components/forms/AddExpenseFileForm";
import type { MouseEvent } from "react";
import { useState } from "react";
import type { TransactionInterface } from "@utils/csvParsers";
import type { Expenses } from "@prisma/client";
import ExpensesCard from "@components/cards/ExpensesCard";

const App: NextPage = () => {
  const [expensesData, setExpensesData] = useState<TransactionInterface[]>([]);

  const utils = api.useContext();

  const addExpense = api.expenses.addExpense.useMutation({
    onSettled() {
      utils.expenses.expensesWithCategory.invalidate();
    },
  });

  const { data: categories } = api.categories.getAllCategories.useQuery();

  const { data: expenses } = api.expenses.expensesWithCategory.useQuery();

  const addCostToCategory = (
    e: MouseEvent<HTMLButtonElement>,
    categoryId: string
  ) => {
    if (categories?.length) {
      const expense = expensesData.shift();

      if (!expense) {
        return;
      }

      const expenseData: Omit<Expenses, "id" | "userId" | "createdAt"> = {
        categoryId,
        title: expense.title || "",
        contractor: expense.contractor || "",
        description: "now",
        transactionDate: new Date(expense.transactionDate || new Date()),
        value: Number(expense.value) || 0,
        currency: expense.currency || "PLN",
      };

      addExpense.mutate(expenseData);
      setExpensesData((prev: TransactionInterface[] | undefined) => {
        if (prev?.length) {
          const newExpensesData = [...prev];
          newExpensesData.shift();
          return newExpensesData;
        }
        return [];
      });
    }
  };

  return (
    <Layout>
      <main className=" h-full gap-4 overflow-hidden">
        <Instruction />
        <section>
          <Heading text="Dodaj wydatki" />
          <AddExpenseForm setExpense={setExpensesData} />
          <Heading text="Importuj wydatki" />
          <div className="flex items-center justify-around px-5">
            <AddExpenseFileForm setExpenses={setExpensesData} />
          </div>
        </section>
        <section className="w-full p-5 ">
          <Heading text="Katagoryzuj wydatek" />
          <div className="stack ml-auto w-full">
            {expensesData.length
              ? expensesData.map((expense, index) => (
                  <ExpensesCard expense={expense} key={index} />
                ))
              : "Nie masz wydatków, dodaj jakiś!"}
          </div>
          <h3 className="py-8 text-center text-lg">Kategorie</h3>
          <div className="flex w-full flex-col gap-3  p-5 lg:flex-row">
            {categories?.length ? (
              categories.map((category) => (
                <button
                  key={category.id}
                  className={`btn bg-${category.categoryColor}-500 `}
                  onClick={(e) => addCostToCategory(e, category.id)}
                >
                  {category.categoryName}
                </button>
              ))
            ) : (
              <div>
                <p>You dont have any categoires</p>
                <Link className="text-blue-500" href={"/categories"}>
                  Add categories
                </Link>
              </div>
            )}
          </div>
        </section>
        <section>
          <Heading text={"Tabela wydatków"} />
          {expenses?.length ? (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Tytuł</th>
                    <th>Miejsce</th>
                    <th>Kategoria</th>
                    <th>Kwota</th>
                    <th>Akcja</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses?.map((expense) => (
                    <tr key={expense.id}>
                      <th>
                        {expense.transactionDate.toLocaleDateString("pl-PL")}
                      </th>
                      <td>{expense.title}</td>
                      <td>{expense.contractor}</td>
                      <td>{expense.category?.categoryName}</td>
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
  );
};

export default App;
