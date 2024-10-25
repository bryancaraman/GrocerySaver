import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import List from '../index';

describe('List Component', () => {
  test('renders List component with title and empty message', () => {
    render(<List />);
    expect(screen.getByText('Grocery Pricer')).toBeInTheDocument();
    expect(screen.getByText('Your Lists:')).toBeInTheDocument();
    expect(screen.getByText('No lists available. Start by creating one!')).toBeInTheDocument();
  });

  test('updates input and adds a new list on button click', () => {
    render(<List />);
    const input = screen.getByPlaceholderText('Enter list name');
    const addButton = screen.getByText('Add New List');

    fireEvent.change(input, { target: { value: 'Grocery List 1' } });
    fireEvent.click(addButton);
    expect(screen.getByText('Grocery List 1')).toBeInTheDocument();
    expect(input).toHaveValue(''); 
  });

  test('does not add empty list names', () => {
    render(<List />);
    const addButton = screen.getByText('Add New List');
    fireEvent.click(addButton);
    expect(screen.queryByText('No lists available. Start by creating one!')).toBeInTheDocument();
  });
});
