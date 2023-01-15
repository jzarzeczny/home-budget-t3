import type { Categories } from "@prisma/client";
import { parseCSV } from "@utils/csvParsers";
import type { TransactionInterface } from "@utils/csvParsers";
import { useForm } from "react-hook-form";

interface AddSpendingFileFormInterface {
  file: File[];
  type: string;
}

export const AddSpendingFileForm = ({
  categories,
  setSpendings,
}: {
  categories: Categories[] | undefined;
  setSpendings: any;
}) => {
  const { register, handleSubmit } = useForm<AddSpendingFileFormInterface>();

  const onSubmit = async (data: AddSpendingFileFormInterface) => {
    const { file } = data;
    if (file[0]) {
      const data = (await parseCSV(file[0])) as TransactionInterface[];
      console.log(data);
      setSpendings((prev: TransactionInterface[]) => [...prev, ...data]);
    }
  };

  console.log(categories);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="outline-neutral-300 flex w-full flex-col items-center p-8"
    >
      <div className="form-control w-full">
        <label className="label">Wybierz plik</label>
        <input
          type="file"
          className="file-input-bordered file-input-primary file-input w-full max-w-xs"
          accept=".csv"
          {...register("file")}
        />
      </div>
      <div className="form-control w-full">
        <label className="label">Wybierz bank</label>
        <select
          className="select-primary select w-full max-w-xs"
          defaultValue={"default"}
          {...register("type")}
        >
          <option value={"default"} disabled>
            Wybierz bank
          </option>
          <option value={"ing"}>ING</option>
          <option value={"ca"}>Credit Agricole</option>
        </select>
      </div>
      <input
        type="submit"
        value="Importuj dane"
        className=" btn-primary btn mt-3 w-full max-w-xs self-start"
      />
    </form>
  );
};
