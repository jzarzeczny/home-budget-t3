import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export function getServerSideProps({ context }: { context: any }) {
  console.log(context);
  return { props: {} };
}

const Home: NextPage = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    router.push("/app");
  }

  const signInWithGoogle = () => {
    signIn("google", { callbackUrl: "/app" });
  };

  return (
    <>
      <Head>
        <title>Home budget</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="flex w-full flex-wrap">
          <div className="flex w-full flex-col md:w-1/2">
            <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
              <a href="#" className="bg-black p-4 text-xl font-bold text-white">
                Logo
              </a>
            </div>

            <div className="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32">
              <p className="text-center text-3xl text-white">
                Witaj w menadzeze budzetu
              </p>
            </div>
            <div>
              <button
                className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={signInWithGoogle}
              >
                Login with google
              </button>
            </div>
          </div>

          <div className="w-1/2 shadow-2xl">
            <Image
              className="hidden h-screen w-full object-cover md:block"
              src="https://source.unsplash.com/IXUM4cJynP0"
              alt="image"
              width={400}
              height={400}
            />
          </div>
        </div>{" "}
      </main>
    </>
  );
};

export default Home;
