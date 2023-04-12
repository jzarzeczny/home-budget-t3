import { useForm } from 'react-hook-form';
import type { AddExpense } from 'types/Expenses';

import { parseCSV } from '@utils/csvParsers';

export enum BankType {
  ING = 'ing',
  CA = 'ca',
}

export interface AddExpenseFileFormInterface {
  file: File[];
  type: BankType;
}

export const AddExpenseFileForm = ({
  setExpenses,
}: {
  setExpenses: (data: AddExpense | AddExpense[]) => void;
}) => {
  const { register, handleSubmit } = useForm<AddExpenseFileFormInterface>();

  const onSubmit = async (data: AddExpenseFileFormInterface) => {
    if (data.file[0]) {
      const parsedData = (await parseCSV(
        data.file[0],
        data.type
      )) as AddExpense[];
      setExpenses(parsedData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="outline-neutral-300 flex w-full flex-col items-center px-5"
    >
      <div className="form-control w-full max-w-xs">
        <label className="label">Wybierz plik</label>
        <input
          type="file"
          className="file-input-bordered  file-input w-full max-w-xs"
          accept=".csv"
          {...register('file')}
        />
      </div>
      <div className="form-control w-full  max-w-xs">
        <label className="label">Wybierz bank</label>
        <select
          className="select-bordered select w-full max-w-xs"
          defaultValue={'default'}
          {...register('type')}
        >
          <option value={'default'} disabled>
            Wybierz bank
          </option>
          <option value={BankType.ING}>ING</option>
          <option value={BankType.CA}>Credit Agricole</option>
        </select>
      </div>
      <input
        type="submit"
        value="Importuj dane"
        className="  btn mt-3 w-full max-w-xs self-center"
      />
    </form>
  );
};
