import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Product from "../index";

describe("Product Component", () => {
  const mockProduct = {
    id: "1",
    title: "Sample Product",
    price: 99.99,
    seller: "Sample Seller",
    link: "https://example.com",
    thumbnail: "https://via.placeholder.com/150",
    rating: 4.5,
    reviews: 10,
    distance: 5,
  };

  const mockOnAdd = jest.fn(); 

  test("renders product details correctly", () => {
    render(<Product product={mockProduct} onAdd={mockOnAdd} />);

    expect(screen.getByText("Sample Product")).toBeInTheDocument();
    expect(screen.getByText("Seller: Sample Seller")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("Rating: 4.5")).toBeInTheDocument();
    expect(screen.getByText("Distance: 5 miles")).toBeInTheDocument();
    expect(screen.getByAltText("Sample Product")).toHaveAttribute(
      "src",
      "https://via.placeholder.com/150"
    );
  });

  test("renders 'Price not available' if price is undefined", () => {
    const productWithoutPrice = { ...mockProduct, price: undefined };
    render(<Product product={productWithoutPrice} onAdd={mockOnAdd} />);

    expect(screen.getByText("Price not available")).toBeInTheDocument();
  });

  test("renders 'No title available' if title is missing", () => {
    const productWithoutTitle = { ...mockProduct, title: "" };
    render(<Product product={productWithoutTitle} onAdd={mockOnAdd} />);

    expect(screen.getByText("No title available")).toBeInTheDocument();
  });

  test("handles 'onAdd' button click", () => {
    render(<Product product={mockProduct} onAdd={mockOnAdd} />);

    const addButton = screen.getByText("+");
    fireEvent.click(addButton);

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  test("renders without distance if it is null", () => {
    const productWithoutDistance = { ...mockProduct, distance: null };
    render(<Product product={productWithoutDistance} onAdd={mockOnAdd} />);

    expect(screen.queryByText(/Distance:/)).toBeNull();
  });
});
