import axios from 'axios';
import React, { useEffect, useState } from 'react';

const GetApi = () => {
  const [products, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getData = async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    setProduct(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((prod) => (
          <div
            className="card border rounded-lg shadow-lg p-4 flex flex-col items-center cursor-pointer transform transition-transform duration-300 hover:scale-105"
            key={prod.id}
            onClick={() => handleCardClick(prod)}
          >
            <img src={prod.image} alt={prod.title} className="w-full h-64 object-contain mb-4 rounded" />
            <h2 className="text-lg font-semibold mb-2 text-center">{prod.title}</h2>
            <p className="text-gray-700 mb-2 text-center">{prod.description}</p>
            <p className="text-sm text-gray-600 text-center">Category: {prod.category}</p>
            <p className="text-lg font-bold text-blue-600 text-center">${prod.price}</p>
            <p className="text-sm text-gray-600 text-center">Rating: {prod.rating.rate} (count: {prod.rating.count})</p>
          </div>
        ))}
      </div>

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 relative">
            <button className="absolute top-4 right-4 text-gray-700" onClick={closeModal}>X</button>
            <h2 className="text-2xl font-bold mb-4 text-center">{selectedProduct.title}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-64 object-contain mb-4 rounded" />
            <p className="text-gray-700 mb-2">{selectedProduct.description}</p>
            <p className="text-sm text-gray-600 mb-2">Category: {selectedProduct.category}</p>
            <p className="text-lg font-bold text-blue-600 mb-2">${selectedProduct.price}</p>
            <p className="text-sm text-gray-600 mb-2">Rating: {selectedProduct.rating.rate} (count: {selectedProduct.rating.count})</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetApi;
