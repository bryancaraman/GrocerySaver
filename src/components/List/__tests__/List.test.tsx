import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import List from '../index';

describe('List Component', () => {
  test('renders the title and input field', () => {
    render(<List />);

    expect(screen.getByText('Grocery Pricer')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Enter list name')).toBeInTheDocument();

    expect(screen.getByText('Add New List')).toBeInTheDocument();
  });

  test('displays a message when no lists are available', () => {
    render(<List />);

    expect(
      screen.getByText('No lists available. Start by creating one!')
    ).toBeInTheDocument();
  });

  test('adds a new list when input is valid and button is clicked', () => {
    render(<List />);

    const input = screen.getByPlaceholderText('Enter list name');
    const button = screen.getByText('Add New List');

    fireEvent.change(input, { target: { value: 'Groceries' } });

    fireEvent.click(button);

    expect(screen.getByText('Groceries')).toBeInTheDocument();

    expect((input as HTMLInputElement).value).toBe('');
  });

  test('does not add a list when input is empty', () => {
    render(<List />);

    const button = screen.getByText('Add New List');

    fireEvent.click(button);

    expect(
      screen.getByText('No lists available. Start by creating one!')
    ).toBeInTheDocument();
  });

  test('adds multiple lists correctly', () => {
    render(<List />);

    const input = screen.getByPlaceholderText('Enter list name');
    const button = screen.getByText('Add New List');

    fireEvent.change(input, { target: { value: 'Groceries' } });
    fireEvent.click(button);

    fireEvent.change(input, { target: { value: 'Household Items' } });
    fireEvent.click(button);

    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('Household Items')).toBeInTheDocument();
  });
});
