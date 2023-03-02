import { Header } from './Header';

export function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Header />
      {children}
      <footer className="footer footer-center  p-4 text-base-content">
        <div>
          <p>Copyright © 2023 - All right reserved by Jakub Zarzeczny</p>
        </div>
      </footer>
    </>
  );
}
