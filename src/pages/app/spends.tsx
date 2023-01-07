import { type NextPage } from "next";
import { Layout } from "@components/Layout";
import { Instruction } from "@components/common/Instruction";
import { api } from "@utils/api";
import { AddSpendingForm } from "@components/forms/AddSpendingForm";

const App: NextPage = () => {
  const categoryData = api.categories.getAllCategories.useQuery();

  return (
    <Layout>
      <main className=" h-full gap-4 overflow-hidden">
        <Instruction />
        <section>
          <AddSpendingForm />
        </section>
      </main>
    </Layout>
  );
};

export default App;
