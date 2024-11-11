'use client';

import Breadcrumb from "@/components/Common/Breadcrumb";
import React, { useState } from 'react';
import {useItemContext, ItemProvider} from '../itemlistContext';

interface ShoppingItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const styles = {
  pageContainer: {
    margin: '60px auto',
    maxWidth: '600px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  } as React.CSSProperties,
  header: {
    textAlign: 'center' as const,
    fontSize: '2em',
    color: '#333',
  },
  inputSection: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'center',
  } as React.CSSProperties,
  input: {
    padding: '10px',
    fontSize: '1em',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '100%',
    maxWidth: '120px',
  } as React.CSSProperties,
  button: {
    padding: '10px',
    fontSize: '1em',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  } as React.CSSProperties,
  removeButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  } as React.CSSProperties,
  shoppingList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
    marginTop: '20px',
  },
  shoppingListItem: {
    backgroundColor: '#000',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'transform 0.3s ease-in-out',
  } as React.CSSProperties,
  shoppingListItemHover: {
    transform: 'scale(1.02)',
  },
  totalPrice: {
    textAlign: 'center' as const,
    marginTop: '20px',
    fontSize: '1.2em',
    color: '#333',
    fontWeight: 'bold',
  },
};

const ShoppingListPage: React.FC = () => {
  // const [items, setItems] = useState<ShoppingItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const {items, removeItem} = useItemContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(e.target.value) || 0);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value, 10) || 1);
  };

  const handleAddItem = () => {
    if (inputValue.trim()) {
      const newItem: ShoppingItem = {
        id: items.length + 1,
        name: inputValue.trim(),
        price,
        quantity,
      };
      // setItems((prevItems) => [...prevItems, newItem]);
      setInputValue('');
      setPrice(0);
      setQuantity(1);
    }
  };

  

  const calculateTotalPrice = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <>
    <ItemProvider>
    <Breadcrumb
        pageName="Shopping List"
        description="Add, remove, and edit items in your shopping list."
    />

    <div style={styles.pageContainer}>
      <h1 style={styles.header}>Shopping List</h1>

      <div style={styles.inputSection}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter an item"
          style={styles.input}
        />
        <input
          type="number"
          value={price}
          onChange={handlePriceChange}
          placeholder="Price"
          min="0"
          step="0.01"
          style={styles.input}
        />
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          placeholder="Quantity"
          min="1"
          style={styles.input}
        />
        <button style={styles.button} onClick={handleAddItem}>
          Add Item
        </button>
      </div>

      <div style={styles.shoppingList}>
        {items.map((item) => (
          <div
            key={item.name}
            style={{
              ...styles.shoppingListItem,
              ...(styles.shoppingListItemHover ? { ':hover': styles.shoppingListItemHover } : {}),
            }}
          >
            <div>
              <p>{item.name}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button style={styles.removeButton} onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={styles.totalPrice}>
        <h3>Total: ${calculateTotalPrice()}</h3>
      </div>
    </div>
    </ItemProvider>
    </>
  );
};

export default ShoppingListPage;
