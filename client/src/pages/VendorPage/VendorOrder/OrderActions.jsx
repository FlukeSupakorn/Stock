import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedOrdersState, ordersState } from '../../../recoil/orderControlPanel';
import { deleteOrders } from '../../../API/vendorOrders';

const OrderActions = () => {
  const [selectedOrders, setSelectedOrders] = useRecoilState(selectedOrdersState);
  const [orders, setOrders] = useRecoilState(ordersState);

  const deleteSelectedOrders = async () => {
    try {
      await deleteOrders(selectedOrders);
      const updatedOrders = orders.filter(order => !selectedOrders.includes(order.id));
      setOrders(updatedOrders);
      setSelectedOrders([]);
    } catch (error) {
      console.error('Failed to delete orders:', error);
    }
  };

  return (
    <div className="flex items-center mb-2">
      <button onClick={deleteSelectedOrders} className="btn btn-danger mr-2">Delete Selected</button>
    </div>
  );
};

export default OrderActions;
