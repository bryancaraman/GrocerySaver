"use client";
import Link from "next/link";

const Footer = () => {
  return (
<footer className="relative z-10 dark:bg-slate-200 text-white p-6 -mb-[181px]">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap items-center justify-between py-5">
      <h2 className="text-2xl font-bold text-black">GroceryPricer</h2>
      <Link
        href="/signup"
        className="text-black hover:text-gray-500 transition-colors duration-300"
      >
        Sign Up
      </Link>
      <Link
        href="/search"
        className="text-black hover:text-gray-500 transition-colors duration-300"
      >
        Search
      </Link>
      <Link
        href="/list"
        className="text-black hover:text-gray-500 transition-colors duration-300"
      >
        List
      </Link>
    </div>
    <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
      © {new Date().getFullYear()} GroceryPricer. All rights reserved.
    </div>
  </div>
</footer>

  );
};

export default Footer;