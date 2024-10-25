'use client';

<<<<<<< Updated upstream
const AboutPage = () => {
=======
import React, { useState } from 'react';

// Define the structure of a shopping item
interface ShoppingItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const ShoppingListPage: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  // Handler to update the input field as the user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handler to update the price field
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(e.target.value) || 0);
  };

  // Handler to update the quantity field
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value, 10) || 1);
  };

  // Handler to add a new item to the list
  const handleAddItem = () => {
    if (inputValue.trim()) {
      const newItem: ShoppingItem = {
        id: items.length + 1, 
        name: inputValue.trim(),
        price,
        quantity,
      };
      setItems((prevItems) => [...prevItems, newItem]);
      setInputValue('');
      setPrice(0);
      setQuantity(1);
    }
  };

  // Calculate total price for the entire shopping list
  const calculateTotalPrice = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

>>>>>>> Stashed changes
  return (
    <div className="shopping-list-container">
      <h1>Shopping List</h1>

      <input 
        type="text" 
        value={inputValue} 
        onChange={handleInputChange} 
        placeholder="Enter an item" 
      />

      <input 
        type="number" 
        value={price} 
        onChange={handlePriceChange} 
        placeholder="Price" 
        min="0" 
        step="0.01" 
      />

      <input 
        type="number" 
        value={quantity} 
        onChange={handleQuantityChange} 
        placeholder="Quantity" 
        min="1" 
      />

      <button onClick={handleAddItem}>Add Item</button>

      <div className="shopping-list">
        {items.map((item) => (
          <div key={item.id} className="shopping-list-item">
            <p>{item.name}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="total-price">
        <h3>Total: ${calculateTotalPrice()}</h3>
      </div>
    </div>
  );
};

export default ShoppingListPage;
