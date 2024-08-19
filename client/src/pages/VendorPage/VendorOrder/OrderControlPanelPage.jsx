import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout/Layout';
import { fetchOrders, updateOrderStatus as updateOrderStatusAPI } from '../../../API/vendorOrders';
import OrderDetailsModal from './OrderDetailsModal';
import OrderFilters from './OrderFilters';
import OrderActions from './OrderActions';
import OrderList from './OrderList';
import OrderPagination from './OrderPagination';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ordersState, selectedOrdersState, orderCurrentPageState } from '../../../recoil/orderControlPanel';

function OrderControlPanelPage() {
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [orders, setOrders] = useRecoilState(ordersState);
  const [selectedOrders, setSelectedOrders] = useRecoilState(selectedOrdersState);
  const setCurrentPage = useSetRecoilState(orderCurrentPageState);

  // Fetch orders from the backend
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchAllOrders();
  }, [setOrders]);

  const openOrderDetailsModal = (orderId) => {
    const order = orders.find(order => order.id === orderId);
    setSelectedOrderDetails(order);
    setIsModalOpen(true);
  };

  const closeOrderDetailsModal = () => {
    setIsModalOpen(false);
  };

  const toggleOrderSelection = (orderId) => {
    setSelectedOrders(prevSelectedOrders => {
      if (prevSelectedOrders.includes(orderId)) {
        return prevSelectedOrders.filter(id => id !== orderId);
      } else {
        return [...prevSelectedOrders, orderId];
      }
    });
  };

  const resetFilters = () => {
    setSelectedOrders([]);
    setCurrentPage(1);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatusAPI(orderId, newStatus);
      setOrders(orders.map(order => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      }));
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Control Panel</h1>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrderDetails && (
        <OrderDetailsModal order={selectedOrderDetails} closeModal={closeOrderDetailsModal} />
      )}

      <OrderFilters resetFilters={resetFilters} />
      <OrderActions />
      <OrderList
        toggleOrderSelection={toggleOrderSelection}
        openOrderDetailsModal={openOrderDetailsModal}
        handleUpdateOrderStatus={handleUpdateOrderStatus}
      />
      <OrderPagination />
    </div>
  );
}

export default () => (
  <Layout>
    <OrderControlPanelPage />
  </Layout>
);
