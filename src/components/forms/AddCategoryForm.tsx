import { useForm } from 'react-hook-form';

export type AddCategoryInterface = {
  categoryName: string;
  categoryColor: string;
};

export const AddCategoryForm = ({
  onSubmit,
}: {
  onSubmit: (categoryData: AddCategoryInterface) => void;
}) => {
  const { register, handleSubmit } = useForm<AddCategoryInterface>();

  const onS = async (data: AddCategoryInterface) => {
    await onSubmit(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onS)}
      className="flex flex-col items-center px-8"
    >
      <div className="form-control">
        <label className="mb-3 self-start">Nazwa kategorii</label>
        <input
          type="text"
          placeholder="np. Jedzenie"
          className="input mb-5 w-full max-w-xs"
          {...register('categoryName')}
        />
      </div>
      <div className="w-xs form-control">
        <label className="mb-3 self-start">Kolor kategorii</label>
        <div className="flex">
          <label htmlFor="red" className="label cursor-pointer px-3">
            <input
              {...register('categoryColor')}
              value="red"
              type="radio"
              id="red"
              className="radio checked:bg-red-500"
            />
          </label>
          <label htmlFor="blue" className="label cursor-pointer px-3">
            <input
              {...register('categoryColor')}
              value="blue"
              type="radio"
              id="blue"
              className="radio checked:bg-blue-500"
            />
          </label>
          <label htmlFor="green" className="label cursor-pointer px-3">
            <input
              {...register('categoryColor')}
              value="green"
              type="radio"
              id="green"
              className="radio checked:bg-green-500"
            />
          </label>
        </div>
      </div>

      <input type="submit" value="Dodaj kategorie" className=" btn mt-3" />
    </form>
  );
};
