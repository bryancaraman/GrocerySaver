"use client";
import React, { useState } from 'react';

interface GroceryList {
  id: number;
  name: string;
}

const List: React.FC = () => {
  const [lists, setLists] = useState<GroceryList[]>([]);
  const [listName, setListName] = useState('');

  const addNewList = () => {
    if (listName.trim()) {
      const newList: GroceryList = {
        id: lists.length + 1,
        name: listName,
      };
      setLists([...lists, newList]);
      setListName(''); 
    }
  };

  return (
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Grocery Pricer</h1>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Enter list name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="border p-2 rounded-md w-full mb-2"
            />
            <button
              onClick={addNewList}
              className="bg-primary text-white p-2 rounded-md"
            >
              Add New List
            </button>
          </div>

          <div>
            <h2 className="text-2xl mb-3">Your Lists:</h2>
            {lists.length === 0 ? (
              <p>No lists available. Start by creating one!</p>
            ) : (
              <ul>
                {lists.map((list) => (
                  <li
                    key={list.id}
                    className="border p-2 rounded-md mb-2 bg-opacity-10 bg-primary text-primary"
                  >
                    {list.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
  );
};

export default List;
