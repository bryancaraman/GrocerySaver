"use client";

import React, { useState, useEffect } from "react";
import { db, auth } from "../../../firebase"; 
import { collection, query, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Breadcrumb from "@/components/Common/Breadcrumb";

const ShoppingList = () => {
  const [user] = useAuthState(auth); 
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchShoppingList = async () => {
      if (!user) {
        setError("You must be logged in to view your shopping list.");
        setLoading(false);
        return;
      }

      try {
        const shoppingListRef = collection(db, "users", user.uid, "shoppingList");
        const q = query(shoppingListRef);
        const querySnapshot = await getDocs(q);

        const fetchedItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(fetchedItems);
        setError(null);
      } catch (err) {
        console.error("Error fetching shopping list:", err);
        setError("Failed to fetch shopping list. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingList();
  }, [user]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="container mx-auto">
      <Breadcrumb pageName="Shopping List" description="View the items in your shopping list." />
      <div className="py-8">
        <h1 className="text-2xl font-bold text-center mb-6">My Shopping List</h1>
        {error ? (
          <div className="flex justify-center items-center h-96">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <p className="text-gray-500 text-lg">Your shopping list is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
                <img
                  src={item.thumbnail || "/placeholder.png"}
                  alt={item.title}
                  className="w-full h-40 object-contain mb-4"
                />
                <h2 className="text-lg text-black font-black mb-2">{item.title}</h2>
                <p className="text-gray-600">Price: ${item.price?.toFixed(2) || "N/A"}</p>
                {item.seller && <p className="text-sm text-gray-500">Seller: {item.seller}</p>}
                {item.rating && <p className="text-sm text-gray-500">Rating: {item.rating}/5</p>}
                {item.distance !== null && (
                  <p className="text-sm text-gray-500">Distance: {item.distance} miles</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;


