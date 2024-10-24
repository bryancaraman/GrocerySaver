"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="relative z-10 dark:bg-gray-dark text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full sm:w-auto mb-4 sm:mb-0">
              <h2 className="text-2xl font-bold">
                GroceryPricer
              </h2>
            </div>
            <div className="w-full sm:w-auto flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">
                Useful Links
              </h2>
              <ul className="space-y-2 text-center">
                <li>
                  <Link
                    href="/signup"
                    className="text-base hover:text-gray-300 transition-colors duration-300"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    href="/search"
                    className="text-base hover:text-gray-300 transition-colors duration-300"
                  >
                    Search
                  </Link>
                </li>
                <li>
                  <Link
                    href="/list"
                    className="text-base hover:text-gray-300 transition-colors duration-300"
                  >
                    List
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} GroceryPricer. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
