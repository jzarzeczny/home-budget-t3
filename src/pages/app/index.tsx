import { type NextPage } from "next";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";

type AddCategoryInterface = {
  categoryName: string;
  categoryColor: string;
};

const App: NextPage = () => {
  const { register, handleSubmit } = useForm<AddCategoryInterface>();

  const mutation = api.categories.addCategory.useMutation();

  const onSubmit = async (data: AddCategoryInterface) => {
    await mutation.mutate(data);
    if (mutation.isError) {
      console.log("error");
    }
    if (mutation.isSuccess) {
      console.log("success");
    }
  };

  return (
    <>
      <div className="navbar bg-base-300">
        <Link href={"/app"} className="btn-ghost btn text-xl normal-case">
          Home budget
        </Link>
      </div>

      <div className="grid grid-cols-1 bg-base-200 pb-8 xl:grid-cols-12 xl:grid-rows-4">
        <div className="lg:col-start-1 lg:col-end-12 lg:row-start-1 lg:row-end-2 lg:justify-self-center">
          <h3 className="py-8 text-center text-xl">Kategorie kosztów</h3>

          <p className="mx-5 lg:mx-auto lg:max-w-2xl">
            Tworzenie kategorii ma za zadanie pogrupować koszty. Dzięki temu
            będziesz w stanie pogrupować swoje wydatki według własnego uznania.
            Będziesz miał kontrolę nad tym na co i ile wydajesz w danym
            miesiącu.
            <br />
            <br />
            Kategorie mogą być bardzo szczegółowe np. papierosy. Mogą również
            zawierać wiele różnych produktów, które grupujesz według własnego
            uznania np. zakupy lub chemia.
            <br />
            <br />
            To ty jesteś najlepszy w segregowaniu własnych kosztów.
            Eksperymentuj, znajdź sposób który w najlepszy sposób pozwoli Ci
            zbadać swoje koszta!
          </p>
        </div>

        <div className="divider lg:hidden"></div>
        <div className="lg:col-start-1 lg:col-end-6">
          <h3 className="pt-5 pb-8 text-center text-xl">
            Dodaj nową kategorie
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center px-8"
          >
            <div className="form-control">
              <label className="mb-3 self-start">Nazwa kategorii</label>
              <input
                type="text"
                placeholder="np. Jedzenie"
                className="input mb-5 w-full max-w-xs"
                {...register("categoryName")}
              />
            </div>
            <div className="w-xs form-control">
              <label className="mb-3 self-start">Kolor kategorii</label>
              <div className="flex">
                <label htmlFor="red" className="label cursor-pointer px-3">
                  <input
                    {...register("categoryColor")}
                    value="red"
                    type="radio"
                    id="red"
                    className="radio checked:bg-red-500"
                  />
                </label>
                <label htmlFor="blue" className="label cursor-pointer px-3">
                  <input
                    {...register("categoryColor")}
                    value="blue"
                    type="radio"
                    id="blue"
                    className="radio checked:bg-blue-500"
                  />
                </label>
                <label htmlFor="green" className="label cursor-pointer px-3">
                  <input
                    {...register("categoryColor")}
                    value="green"
                    type="radio"
                    id="green"
                    className="radio checked:bg-green-500"
                  />
                </label>
              </div>
            </div>

            <input
              type="submit"
              value="Dodaj kategorie"
              className=" btn mt-3"
            />
          </form>
        </div>
        <div className="divider lg:hidden"></div>
        <div className="flex  flex-col items-center">
          <h3 className="pt-5 pb-8 text-center text-xl">Kategorie</h3>

          <table className="mx-3 table  ">
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Akcja</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <p className="we rounded-md bg-blue-500 p-2 text-center font-normal text-white">
                    Pierwsza kategoria
                  </p>
                </th>
                <td>
                  <button className="btn">Usuń</button>
                </td>
              </tr>
              <tr>
                <th>
                  <p className="rounded-md bg-green-500 p-2 text-center font-normal text-white">
                    Druga kategoria
                  </p>
                </th>
                <td>
                  <button className="btn">Usuń</button>
                </td>
              </tr>
              <tr>
                <th>
                  <p className="rounded-md bg-red-500 p-2 text-center font-normal text-white">
                    Trzecia kategoria
                  </p>
                </th>
                <td>
                  <button className="btn">Usuń</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <footer className="footer footer-center bg-base-300 p-4 text-base-content">
        <div>
          <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
        </div>
      </footer>
    </>
  );
};

export default App;
