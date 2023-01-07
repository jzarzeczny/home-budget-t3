import Link from "next/link";

export function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <header className="navbar bg-base-300">
        <Link href={"/app"} className="btn-ghost btn text-xl normal-case">
          Home budget
        </Link>
        <div className="w-full justify-end gap-3 pr-3">
          <Link href={"/app/categories"}>Kategorie</Link>
          <Link href={"/app/spends"}>Wydatki</Link>
        </div>
      </header>
      {children}
      <footer className="footer footer-center bg-base-300 p-4 text-base-content">
        <div>
          <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
        </div>
      </footer>
    </>
  );
}
