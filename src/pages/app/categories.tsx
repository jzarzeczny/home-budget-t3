import { type NextPage } from 'next';

import { CategoryTable } from '@components/CategoriesComponents/CategoryTable';
import { Divider } from '@components/common/Divider';
import { SectionHeading } from '@components/common/Heading';
import { Instruction } from '@components/common/Instruction';
import { Section } from '@components/common/Section';
import type { AddCategoryInterface } from '@components/forms/AddCategoryForm';
import { AddCategoryForm } from '@components/forms/AddCategoryForm';
import { Layout } from '@components/layout/Layout';
import { api } from '@utils/api';

const App: NextPage = () => {
  const categoryData = api.categories.getAllCategories.useQuery();
  const utils = api.useContext();

  const addCategory = api.categories.addCategory.useMutation({
    async onMutate() {
      await utils.categories.getAllCategories.cancel();
    },
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

  const setRemoveCategory = (categoryId: string) => {
    removeCategory.mutate(categoryId);
  };

  const setAddCategory = (categoryData: AddCategoryInterface) => {
    addCategory.mutate(categoryData);
  };

  return (
    <Layout>
      <main className=" h-full gap-4 overflow-hidden">
        <div className="grid grid-cols-1 bg-base-200  xl:auto-rows-min xl:grid-cols-4">
          <Instruction />

          <Divider />
          <Section alignment="lg:col-start-1 lg:col-end-3 lg:row-start-2">
            <SectionHeading>Dodaj nową kategorie</SectionHeading>
            <AddCategoryForm onSubmit={setAddCategory} />
          </Section>
          <Divider />
          <Section alignment="lg:col-start-3 lg:col-end-5 lg:row-start-2">
            <SectionHeading>Kategorie</SectionHeading>

            {categoryData.data ? (
              <CategoryTable
                categories={categoryData.data}
                removeCategory={setRemoveCategory}
              />
            ) : (
              <div className="loading" />
            )}
          </Section>
        </div>
      </main>
    </Layout>
  );
};

export default App;
