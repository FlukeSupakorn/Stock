import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { filteredOrdersState, orderCurrentPageState, ordersPerPageState } from '../../../recoil/orderControlPanel';

const OrderPagination = () => {
  const filteredOrders = useRecoilValue(filteredOrdersState);
  const currentPage = useRecoilValue(orderCurrentPageState);
  const ordersPerPage = useRecoilValue(ordersPerPageState);
  const setCurrentPage = useSetRecoilState(orderCurrentPageState);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const startOrderIndex = (currentPage - 1) * ordersPerPage + 1;
  const endOrderIndex = Math.min(currentPage * ordersPerPage, filteredOrders.length);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex justify-between items-center mt-4">
      <div>
        Showing {startOrderIndex} - {endOrderIndex} of {filteredOrders.length} orders
      </div>
      <ul className="flex">
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i} className="mx-1">
            <button onClick={() => paginate(i + 1)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">{i + 1}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderPagination;
