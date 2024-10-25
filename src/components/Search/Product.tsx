import React from "react";

interface ProductProps {
  product: {
    id: string;
    title: string;
    price: number;
    seller: string;
    link: string;
    product_link: string;
    thumbnail: string;
    rating?: number;
    reviews?: number;
    distance?: number | null;
  };
}

const SingleBlog: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="product-item bg-white shadow-md rounded-lg overflow-hidden mb-6 transform transition duration-300 hover:scale-105">
          <a href={product.link} target="_blank" rel="noopener noreferrer">
            <div className="relative">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-56 object-contain"
              />
              {product.price !== undefined && !isNaN(product.price) ? (
                <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded-md text-sm font-semibold">
                  ${product.price.toFixed(2)}
                </div>
              ) : (
                <div className="absolute top-2 left-2 bg-gray-300 text-gray-700 px-2 py-1 rounded-md text-sm font-semibold">
                  Price not available
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {product.title || "No title available"}
              </h2>
              {product.seller && (
                <p className="text-sm text-gray-500 mb-2">Seller: {product.seller}</p>
              )}
              {product.rating !== undefined && (
                <p className="text-sm text-gray-600 mb-2">
                  Rating: {product.rating.toFixed(1)}
                </p>
              )}
              {product.distance !== null && (
                <p className="text-sm text-gray-600 mb-2">
                  Distance: {product.distance} miles
                </p>
              )}
            </div>
          </a>
        </div>
      </main>
    </div>
  );
};

export default SingleBlog;
