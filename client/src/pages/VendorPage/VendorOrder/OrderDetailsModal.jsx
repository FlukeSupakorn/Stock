import React from 'react';

const OrderDetailsModal = ({ order, closeModal }) => {
  const getProductDetails = (productId) => {
    return order.products.find(product => product.id === productId);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Order Details</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <div className="mb-4">
          <p className="mb-2"><strong>Order ID:</strong> {order.id}</p>
          <p className="mb-2"><strong>Customer:</strong> {order.customer}</p>
          <p className="mb-2"><strong>Total:</strong> {order.total}$</p>
          <p className="mb-2"><strong>Status:</strong> {order.status}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-4 mb-2">Products:</h3>
          <ul className="space-y-4">
            {order.products.map(product => {
              const productDetails = getProductDetails(product.id);
              const totalProductPrice = productDetails.price * product.count;
              return (
                <li key={product.id} className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-sm">
                  <img src={productDetails.image} alt={productDetails.name} className="w-16 h-16 rounded-lg" />
                  <div>
                    <p className="font-semibold">{productDetails.name}</p>
                    <p className="text-gray-700">Price: {productDetails.price}$</p>
                    <p className="text-gray-700">Quantity: {product.count}</p>
                    <p className="text-gray-700">Total Price: {totalProductPrice}$</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={closeModal} className="btn btn-primary">Close</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
