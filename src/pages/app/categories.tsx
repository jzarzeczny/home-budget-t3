import { Instruction } from "@components/common/Instruction";
import type { AddCategoryInterface } from "@components/forms/AddCategoryForm";
import { AddCategoryForm } from "@components/forms/AddCategoryForm";
import { type NextPage } from "next";
import { api } from "@utils/api";
import { CategoryTable } from "@components/CategoriesComponents/CategoryTable";
import { Layout } from "@components/Layout";

const App: NextPage = () => {
  const categoryData = api.categories.getAllCategories.useQuery();
  const utils = api.useContext();

  const addCategory = api.categories.addCategory.useMutation({
    async onMutate() {
      await utils.categories.getAllCategories.cancel();
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

  console.log(categoryData.data);

  const setRemoveCategory = (categoryId: string) => {
    removeCategory.mutate(categoryId);
  };

  const setAddCategory = (categoryData: AddCategoryInterface) => {
    addCategory.mutate(categoryData);
  };

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
            <AddCategoryForm onSubmit={setAddCategory} />
          </div>
          <div className="divider lg:hidden "></div>
          {categoryData.data ? (
            <CategoryTable
              categories={categoryData.data}
              removeCategory={setRemoveCategory}
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
