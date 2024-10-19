"use client";

import SingleBlog from "@/components/Search/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import React, { useState } from "react";

const Blog = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [locationValue, setLocationValue] = useState<string>(""); // State for location input
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = async (term: string, location: string) => {
    if (!term.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/products?q=${encodeURIComponent(term)}&location=${encodeURIComponent(location)}`
      );
      const data = await response.json();

      if (response.ok) {
        setSearchResults(data.items);
      } else {
        console.error("Error:", data.error);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb
        pageName="Product Search"
        description="Search for grocery items and view the top results."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          {/* Search Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchProducts(inputValue, locationValue);
            }}
            className="mb-8 flex flex-col items-center space-y-4"
          >
            <div className="flex w-full max-w-md">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search for products"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            {/* Location Input */}
            <div className="flex w-full max-w-md">
              <input
                type="text"
                value={locationValue}
                onChange={(e) => setLocationValue(e.target.value)}
                placeholder="Enter location (e.g., 'New York, USA')"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : searchResults.length > 0 ? (
            <div className="-mx-4 flex flex-wrap justify-center">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                >
                  <SingleBlog product={product} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default Blog;
