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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center px-8"
    >
      <div className="form-control w-full max-w-xs">
        <label className="mb-3 self-start">Nazwa kategorii</label>
        <input
          type="text"
          placeholder="np. Jedzenie"
          className="input mb-5 w-full max-w-xs"
          {...register('categoryName')}
        />
      </div>
      <div className="form-control max-w-xs flex ">
        <label className="mb-3 self-start">Kolor kategorii</label>
        <div className="flex w-full max-w-xs flex-wrap">
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
          <label htmlFor="pink" className="label cursor-pointer px-3">
            <input
              {...register('categoryColor')}
              value="pink"
              type="radio"
              id="pink"
              className="radio checked:bg-pink-500"
            />
          </label>
          <label htmlFor="orange" className="label cursor-pointer px-3">
            <input
              {...register('categoryColor')}
              value="orange"
              type="radio"
              id="orange"
              className="radio checked:bg-orange-500"
            />
          </label>
          <label htmlFor="yellow" className="label cursor-pointer px-3">
            <input
              {...register('categoryColor')}
              value="yellow"
              type="radio"
              id="yellow"
              className="radio checked:bg-yellow-500"
            />
          </label>
          <label htmlFor="violet" className="label cursor-pointer px-3">
            <input
              {...register('categoryColor')}
              value="violet"
              type="radio"
              id="violet"
              className="radio checked:bg-violet-500"
            />
          </label>
        </div>
      </div>

      <input
        type="submit"
        value="Dodaj kategorie"
        className=" btn btn-sm mt-3"
      />
    </form>
  );
};
