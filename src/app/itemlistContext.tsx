import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define an interface for each item
interface Item {
  name: string;
  price: number;
  quantity: number;
  id: number
}

interface ItemContextProps {
  items: Item[];
  addItem: (name: string, price: number, quantity:number) => void;
  removeItem: (id: number) => void;
  saveItemsToDatabase: () => void;
  loadItemsFromDatabase: () => void;
}

const ItemContext = createContext<ItemContextProps | undefined>(undefined);

export const ItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (name: string, price: number, quantity: number) => {
    let id = items.length + 1;
    setItems((prevItems) => [...prevItems, { name, price, quantity, id }]);
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const saveItemsToDatabase = async () => {
    // Placeholder for saving items with name and price to database
    console.log("Saving items to database", items);
    // Add code here to interact with your database
  };

  const loadItemsFromDatabase = async () => {
    // Placeholder for loading items with name and price from database
    console.log("Loading items from database");
    const loadedItems = [
      { name: "exampleItem1", price: 5.99, quantity:2, id:1 },
      { name: "exampleItem2", price: 3.49, quantity:5, id:2 },
    ]; // Replace with actual database fetch
    setItems(loadedItems);
  };

  useEffect(() => {
    // Load items when the app initializes
    loadItemsFromDatabase();
  }, []);

  return (
    <ItemContext.Provider value={{ items, addItem, removeItem, saveItemsToDatabase, loadItemsFromDatabase }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) throw new Error("useItemContext must be used within an ItemProvider");
  return context;
};
