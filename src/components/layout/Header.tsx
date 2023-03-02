import Link from 'next/link';
import { useRef, useState } from 'react';

import { Routes } from '@utils/routes';

export function Header() {
  const menuRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    console.log('I want to toggle');
    const menuItem = menuRef.current as unknown as HTMLElement;
    setOpen((prev) => !prev);
    console.log(open);
    if (open) {
      console.log(menuItem.classList);
      menuItem.classList.remove('block');
      menuItem.classList.add('hidden');
      return;
    }
    menuItem.classList.remove('hidden');
    menuItem.classList.add('block');
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href={Routes.APP_PAGE} className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap ">
              Home-budget
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              href={Routes.APP_PAGE}
              className="text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none "
            >
              UserName
            </Link>

            <button
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            ref={menuRef}
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  href={Routes.CATEGORIES}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 "
                >
                  Kategorie
                </Link>
              </li>
              <li>
                <Link
                  href={Routes.EXPENSES}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 "
                >
                  Wydatki
                </Link>
              </li>
              <li>
                <Link
                  href={Routes.SUM}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 "
                >
                  Podsumowanie
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
