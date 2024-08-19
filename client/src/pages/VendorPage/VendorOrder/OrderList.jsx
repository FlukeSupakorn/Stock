import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentOrdersState, selectedOrdersState } from '../../../recoil/orderControlPanel';

const OrderList = ({ toggleOrderSelection, openOrderDetailsModal, handleUpdateOrderStatus }) => {
  const currentOrders = useRecoilValue(currentOrdersState);
  const selectedOrders = useRecoilValue(selectedOrdersState);

  const statuses = ['All', 'Processing', 'Shipped', 'Delivered'];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">Order List</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2"></th>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Expected Date</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map(order => (
            <tr key={order.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => toggleOrderSelection(order.id)}
                />
              </td>
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.expectedDate}</td>
              <td className="border px-4 py-2">{order.products.reduce((acc, product) => acc + product.price * product.count, 0)}$</td>
              <td className="border px-4 py-2">
                <select
                  value={order.status}
                  onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                  className="input"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td className="border px-4 py-2">
                <button onClick={() => openOrderDetailsModal(order.id)} className="btn btn-primary">View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
