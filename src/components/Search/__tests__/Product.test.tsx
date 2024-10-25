import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Product from '../index';

const mockProduct = {
  id: '1',
  title: 'Sample Product',
  price: 99.99,
  seller: 'Sample Seller',
  link: 'https://example.com/product',
  product_link: 'https://example.com/product-detail',
  thumbnail: 'sample-thumbnail.jpg',
  rating: 4.5,
  reviews: 10,
  distance: 5,
};

describe('Product Component', () => {
  test('renders product details', () => {
    render(<Product product={mockProduct} />);
    
    expect(screen.getByText('Sample Product')).toBeInTheDocument();
    expect(screen.getByText('Seller: Sample Seller')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  test('displays "Price not available" when price is missing', () => {
    const productWithoutPrice = { ...mockProduct, price: undefined };
    render(<Product product={productWithoutPrice} />);
    expect(screen.getByText('Price not available')).toBeInTheDocument();
  });

  test('conditionally renders rating and distance', () => {
    render(<Product product={mockProduct} />);
    expect(screen.getByText(`Rating: ${mockProduct.rating.toFixed(1)}`)).toBeInTheDocument();
    expect(screen.getByText(`Distance: ${mockProduct.distance} miles`)).toBeInTheDocument();
  });

  test('renders product image with correct src and alt', () => {
    render(<Product product={mockProduct} />);
    const imgElement = screen.getByRole('img');

    expect(imgElement).toHaveAttribute('src', mockProduct.thumbnail);
    expect(imgElement).toHaveAttribute('alt', mockProduct.title);
  });
});
