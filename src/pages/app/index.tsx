import { Instruction } from "@components/common/Instruction";
import { AddCategoryForm } from "@components/forms/AddCategoryForm";
import { type NextPage } from "next";
import { api } from "@utils/api";
import { CategoryTable } from "@components/CategoriesComponents/CategoryTable";
import { Layout } from "@components/Layout";

const App: NextPage = () => {
  return (
    <Layout>
      <main className=" h-full gap-4 overflow-hidden">
        <h2>Hi</h2>
      </main>
    </Layout>
  );
};

export default App;
