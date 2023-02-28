import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Layout } from '@components/Layout';
import { api } from '@utils/api';

function prevDate(month: number, year: number) {
  if (month - 1 === 0) {
    return { year: year - 1, month: 12 };
  }
  return { year, month: month - 1 };
}

function nextDate(month: number, year: number) {
  if (month + 1 === 13) {
    return { year: year + 1, month: 1 };
  }
  return { year, month: month + 1 };
}

const Home: NextPage = () => {
  const router = useRouter();

  const year = Number(router.query.year) || new Date().getFullYear();
  const month = Number(router.query.month) || new Date().getMonth();

  const monthlyUsage = api.expenses.getMonthlyExpenses.useQuery({
    year,
    month,
  });

  return (
    <>
      <Head>
        <title>Home budget</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className=" h-full gap-4 overflow-hidden">
          <section className="flex justify-between my-5 max-w-7xl mx-auto">
            <Link
              href={{
                pathname: '/app/monthlySum',
                query: prevDate(month, year),
              }}
            >
              Poprzedni miesiąc
            </Link>
            <h1 className=" text-2xl">{`${month} ${year}`}</h1>
            <Link
              href={{
                pathname: '/app/monthlySum',
                query: nextDate(month, year),
              }}
            >
              Następny miesiąc
            </Link>
          </section>
          <section className="my-5 flex justify-center">
            {monthlyUsage.data?.categories ? (
              <div className="card w-96  bg-slate-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Wydatki</h2>
                  {Object.keys(monthlyUsage.data?.categories).map(
                    (key: string) => {
                      const category = monthlyUsage.data?.categories[key];
                      if (category) {
                        return (
                          <div key={key}>
                            <p className=" inline-block">{`${category.categoryName}:`}</p>
                            <p className=" ml-3 inline-block">
                              {`${category.value}`}PLN
                            </p>
                          </div>
                        );
                      }
                    }
                  )}
                </div>
              </div>
            ) : null}
          </section>
          <section className=" mx-auto max-w-7xl">
            <h3>Wydatki</h3>
            {monthlyUsage.data?.expenses.length ? (
              <div className="overflow-x-auto">
                <table className="table-zebra table w-full">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Nazwa</th>
                      <th>Miejsce</th>
                      <th>Kwota</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyUsage.data?.expenses.map((expense) => (
                      <tr key={expense.id}>
                        <th>
                          {new Date(expense.createdAt).toLocaleDateString(
                            'pl-PL'
                          )}
                        </th>
                        <td>{expense.title}</td>
                        <td>{expense.contractor}</td>
                        <td>{expense.value}PLN</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Home;
