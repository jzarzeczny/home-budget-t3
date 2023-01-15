import { useForm } from "react-hook-form";

export const AddSpendingForm = ({ setSpending }: { setSpending: any }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    setSpending((prev: any) => [...prev, data]);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="outline-neutral-300 flex w-full flex-col items-center p-8"
    >
      <div className="form-control w-full">
        <label className="mb-3 self-start">Tytuł</label>
        <input
          type="text"
          placeholder="np. "
          className="input-bordered input mb-5 w-full max-w-xs"
          {...register("title")}
        />
      </div>
      <div className="form-control w-full">
        <label className="mb-3 self-start">Miejsce</label>
        <input
          type="text"
          placeholder="np. Biedronka"
          className="input-bordered  input mb-5 w-full max-w-xs"
          {...register("contractor")}
        />
      </div>
      <div className="form-control w-full">
        <label className="mb-3 self-start">Opis</label>
        <textarea
          placeholder="np. Dziecięce ubranka"
          className="textarea-bordered textarea mb-5 w-full max-w-xs"
          {...register("description")}
        />
      </div>
      <div className="form-control w-full">
        <label className="mb-3 self-start">Data</label>
        <input
          type="date"
          className="input-bordered  input mb-5 w-full max-w-xs"
          {...register("date")}
        />
      </div>
      <div className="form-control w-full">
        <div className="center flex w-full items-center">
          <div className="form-control">
            <label className="mb-3 self-start">Kwota</label>
            <input
              type="number"
              className="input-bordered  input mb-5 w-full max-w-xs"
              {...register("value")}
            />
          </div>
          <div className="form-control">
            <label className="mb-3 self-start">Kwota</label>
            <select
              className="input-bordered  input mb-5 w-full max-w-xs"
              defaultValue={"pln"}
              {...register("currency")}
            >
              <option value={"pln"}>PLN</option>
            </select>
          </div>
        </div>
      </div>

      <input
        type="submit"
        value="Dodaj wydatek"
        className=" btn mt-3 w-full max-w-xs self-start"
      />
    </form>
  );
};
