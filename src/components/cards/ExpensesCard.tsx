import type { TransactionInterface } from '@utils/csvParsers';

const ExpensesCard = ({ expense }: { expense: TransactionInterface }) => {
  return (
    <div className="max-w-96 card w-full border border-base-content bg-base-300  shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{expense.title}</h2>
        <p>{expense.contractor}</p>
        <p>{expense.title}</p>
        <p>
          {expense.value}
          {expense.currency}
        </p>
        <p>{expense.transactionDate}</p>
      </div>
    </div>
  );
};

export default ExpensesCard;
