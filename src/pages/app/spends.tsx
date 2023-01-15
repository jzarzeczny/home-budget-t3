import { type NextPage } from "next";
import { Layout } from "@components/Layout";
import { Instruction } from "@components/common/Instruction";
import { api } from "@utils/api";
import { AddSpendingForm } from "@components/forms/AddSpendingForm";
import { Heading } from "@components/common/Heading";
import Link from "next/link";
import { AddSpendingFileForm } from "@components/forms/AddSpendingFileForm";
import type { MouseEvent } from "react";
import { useState } from "react";
import type { TransactionInterface } from "@utils/csvParsers";
import type { Expenses } from "@prisma/client";

const App: NextPage = () => {
  const [spendingsData, setSpendingsData] = useState<TransactionInterface[]>(
    []
  );

  const addSpending = api.expenses.addExpense.useMutation();

  const { data } = api.categories.getAllCategories.useQuery();

  const addCostToCategory = (
    e: MouseEvent<HTMLButtonElement>,
    categoryId: string
  ) => {
    if (data?.length) {
      console.log(categoryId);
      const spendingData: Omit<Expenses, "id" | "userId"> = {
        categoryId,
        title: spendingsData[spendingsData.length - 1]?.title || "",
        contractor: spendingsData[spendingsData.length - 1]?.contractor || "",
        description: "now",
        transactionDate: new Date(
          spendingsData[spendingsData.length - 1]?.transactionDate || new Date()
        ),

        value: spendingsData[spendingsData.length - 1]?.value || 0,
        currency: spendingsData[spendingsData.length - 1]?.currency || "pln",
      };
      addSpending.mutate(spendingData);
      setSpendingsData((prev) => {
        prev.pop();
        return prev;
      });
    }
  };

  //TODO add the value and currenct
  return (
    <Layout>
      <main className=" h-full gap-4 overflow-hidden">
        <Instruction />
        <section>
          <Heading text="Dodaj wydatki" />
          <AddSpendingForm setSpending={setSpendingsData} />
          <Heading text="Importuj wydatki" />
          <div className="flex items-center justify-around px-5">
            <AddSpendingFileForm
              categories={data}
              setSpendings={setSpendingsData}
            />
          </div>
        </section>
        <section className="w-full p-5">
          <Heading text="Katagoryzuj wydatek" />
          <div className="stack ml-auto w-full">
            {spendingsData.length
              ? spendingsData.map((spending, index) => {
                  console.log(spending);
                  return (
                    <div
                      key={index}
                      className="max-w-96 card w-full border border-base-content bg-base-300  shadow-xl"
                    >
                      <div className="card-body">
                        <h2 className="card-title">{spending.title}</h2>
                        <p>{spending.contractor}</p>
                        <p>{spending.description}</p>
                        <p>
                          {spending.value}
                          {spending.currency}
                        </p>
                        <p>{spending.transactionDate}</p>
                      </div>
                    </div>
                  );
                })
              : "Nie masz wydatków, dodaj jakiś!"}
          </div>
          <h3 className="py-8 text-center text-lg">Kategorie</h3>
          <div className="flex w-full flex-col gap-3 p-5 lg:flex-row">
            {data?.length ? (
              data.map((category) => (
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
      </main>
    </Layout>
  );
};

export default App;
