import type { Categories } from "@prisma/client";
import Link from "next/link";
import { useForm } from "react-hook-form";

export const AddSpendingForm = ({
  categories,
}: {
  categories: Categories[] | undefined;
}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    // const returnData = await onSubmit.mutate(data);
    // if (onSubmit.isError) {
    //   console.log("error");
    // }
    // if (onSubmit.isSuccess) {
    //   console.log(d);
    // }
  };

  console.log(categories);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col  bg-white/100 p-8"
    >
      <div className="form-control">
        <label className="mb-3 self-start">Tytuł</label>
        <input
          type="text"
          placeholder="np. "
          className="input mb-5 w-full max-w-xs"
          {...register("title")}
        />
      </div>
      <div className="form-control">
        <label className="mb-3 self-start">Miejsce</label>
        <input
          type="text"
          placeholder="np. Biedronka"
          className="input mb-5 w-full max-w-xs"
          {...register("contractor")}
        />
      </div>
      <div className="form-control">
        <label className="mb-3 self-start">Opis</label>
        <input
          type="text"
          placeholder="np. Dziecięce ubranka"
          className="input mb-5 w-full max-w-xs"
          {...register("description")}
        />
      </div>
      <div className="form-control">
        <label className="mb-3 self-start">Categoria</label>

        {categories && categories.length > 0 ? (
          <select className="select w-full max-w-xs">
            {categories.map((category) => (
              <option key={category.id} id={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        ) : (
          <div className="w-full">
            <h4>Nie posiadasz kategorii</h4>
            <Link href={"categories"}>Dodaj kategorię</Link>
          </div>
        )}
      </div>
      <div className="form-control">
        <label className="mb-3 self-start">Data</label>
        <input type="date" className=" input mb-5 w-full max-w-xs" />
      </div>

      <input
        type="submit"
        value="Dodaj wydatek"
        className=" btn mt-3 max-w-xs"
      />
    </form>
  );
};
