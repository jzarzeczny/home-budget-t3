import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Layout } from '@components/Layout';
import { api } from '@utils/api';

const Home: NextPage = () => {
  const router = useRouter();

  const year = Number(router.query.year) || new Date().getFullYear();
  const month = Number(router.query.month) || new Date().getMonth() + 1;

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
          <section className="flex justify-between px-10 py-5">
            <Link
              href={{
                pathname: '/app/monthlySum',
                query: { year: 2023, month: month - 1 },
              }}
            >
              Prev
            </Link>
            <h1>{`${month} ${year}`}</h1>
            <Link
              href={{
                pathname: '/app/monthlySum',
                query: { year: 2023, month: month + 1 },
              }}
            >
              Next
            </Link>
          </section>
          <section className="my-5 flex justify-center">
            {monthlyUsage.data?.categories ? (
              <div className="card w-96  bg-slate-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Wydatki</h2>
                  {Object.keys(monthlyUsage.data?.categories).map(
                    (key: string) => (
                      <div key={key}>
                        <p className=" inline-block">{`${monthlyUsage.data?.categories[key].categoryName}:`}</p>
                        <p className=" ml-3 inline-block">
                          {`${monthlyUsage.data?.categories[key].value}`}PLN
                        </p>
                      </div>
                    )
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
                        <th>{new Date(expense.createdAt).toISOString()}</th>
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
