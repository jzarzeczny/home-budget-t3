import { useForm } from 'react-hook-form';
import type { AddExpense } from 'types/Expenses';

export const AddExpenseForm = ({
  setExpense,
}: {
  setExpense: (data: AddExpense | AddExpense[]) => void;
}) => {
  const { register, handleSubmit } = useForm<AddExpense>();

  const onSubmit = async (data: AddExpense) => {
    setExpense(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="outline-neutral-300 flex w-full flex-col items-center justify-center p-2 lg:p-8"
    >
      <div className="form-control w-full max-w-xs">
        <label className="mb-3 self-start">Tytuł</label>
        <input
          type="text"
          placeholder="np. "
          className="input-bordered input mb-5 w-full max-w-xs"
          {...register('title')}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="mb-3 self-start">Miejsce</label>
        <input
          type="text"
          placeholder="np. Biedronka"
          className="input-bordered  input mb-5 w-full max-w-xs"
          {...register('contractor')}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="mb-3 self-start">Opis</label>
        <textarea
          placeholder="np. Dziecięce ubranka"
          className="textarea-bordered textarea mb-5 w-full max-w-xs"
          {...register('description')}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="mb-3 self-center ">Data</label>
        <input
          type="date"
          className="input-bordered self-center  input mb-5 w-full max-w-xs "
          {...register('transactionDate')}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <div className="center flex w-full align-baseline m-0 p-0">
          <div className="form-control">
            <label className="mb-3 self-start">Kwota</label>
            <input
              type="number"
              className="input-bordered  input mb-5 w-full "
              {...register('value')}
            />
          </div>
          <div className="form-control">
            <label className="mb-3 self-start">Kwota</label>
            <select
              className="input-bordered  input mb-5 w-full max-w-xs"
              defaultValue={'pln'}
              {...register('currency')}
            >
              <option value={'pln'}>PLN</option>
            </select>
          </div>
        </div>
      </div>

      <input
        type="submit"
        value="Dodaj wydatek"
        className=" btn mt-3 w-full max-w-xs"
      />
    </form>
  );
};
