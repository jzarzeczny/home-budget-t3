import { Instruction } from "@components/common/Instruction";
import { AddCategoryForm } from "@components/forms/AddCategoryForm";
import { type NextPage } from "next";
import { api } from "@utils/api";
import { CategoryTable } from "@components/CategoriesComponents/CategoryTable";
import { Layout } from "@components/Layout";
import type { Categories } from "@prisma/client";

const App: NextPage = () => {
  const categoryData = api.categories.getAllCategories.useQuery();
  const utils = api.useContext();

  const addCategory = api.categories.addCategory.useMutation({
    async onMutate(newData) {
      await utils.categories.getAllCategories.cancel();
      const prevData = utils.categories.getAllCategories.getData();
      utils.categories.getAllCategories.setData(
        undefined,
        (old: Categories[]) => {
          if (old) {
            return [...old, newData];
          }
          return [];
        }
      );
      //Save prev data for call fail
      return { prevData };
    },
    //On error
    onError(err, newData, ctx) {
      //restore
      utils.categories.getAllCategories.setData(undefined, ctx?.prevData);
    },
    //On successful call, fetch the data
    onSettled() {
      utils.categories.getAllCategories.invalidate();
    },
  });

  const removeCategory = api.categories.removeCategory.useMutation({
    async onMutate(categoryId) {
      await utils.categories.getAllCategories.cancel();
      const prevData = utils.categories.getAllCategories.getData();

      utils.categories.getAllCategories.setData(undefined, (old) => {
        return old?.filter((category) => category.id !== categoryId);
      });

      return { prevData };
    },

    onError(err, newData, ctx) {
      utils.categories.getAllCategories.setData(undefined, ctx?.prevData);
    },
    onSettled() {
      utils.categories.getAllCategories.invalidate();
    },
  });

  return (
    <Layout>
      <main className=" h-full gap-4 overflow-hidden">
        <div className="grid grid-cols-1 bg-base-200 pb-8 xl:auto-rows-min xl:grid-cols-4">
          <Instruction />

          <div className="divider lg:hidden"></div>
          <div className="lg:col-start-1 lg:col-end-3 lg:row-start-2">
            <h3 className="pt-5 pb-8 text-center text-xl">
              Dodaj nową kategorie
            </h3>
            <AddCategoryForm onSubmit={addCategory} />
          </div>
          <div className="divider lg:hidden "></div>
          {categoryData.data ? (
            <CategoryTable
              categories={categoryData.data}
              removeCategory={removeCategory}
            />
          ) : (
            <div className="loading" />
          )}
        </div>
      </main>
    </Layout>
  );
};

export default App;
