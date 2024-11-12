"use client";

import React, { useState } from "react";
import Product from "@/components/Search";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { db, auth } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  const fetchProducts = async (term, location) => {
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

  const addToShoppingList = async (product) => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const shoppingListRef = collection(db, "users", user.uid, "shoppingList");
      await addDoc(shoppingListRef, {
        title: product.title,
        price: product.price,
        seller: product.seller,
        thumbnail: product.thumbnail,
        rating: product.rating,
        distance: product.distance,
      });
      console.log("Item added to Firestore");
    } catch (error) {
      console.error("Error adding item to Firestore:", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Product Search" description="Search for grocery items and view the top results." />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
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

            <div className="flex w-full max-w-md">
              <input
                type="text"
                value={locationValue}
                onChange={(e) => setLocationValue(e.target.value)}
                placeholder="Enter location (e.g., 'New York, USA')"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : searchResults.length > 0 ? (
            <div className="-mx-4 flex flex-wrap justify-center">
              {searchResults.map((product) => (
                <div key={product.id} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                  <Product product={product} onAdd={() => addToShoppingList(product)} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default Search;