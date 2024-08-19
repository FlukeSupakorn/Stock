import axios from 'axios';

const API_URL = 'http://localhost:3333/admin/orders';

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/see`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    await axios.put(`${API_URL}/update`, { orderId, status });
  } catch (error) {
    console.error('Failed to update order status:', error);
    throw error;
  }
};

export const deleteOrders = async (orderIDs) => {
  try {
    await axios.delete(`${API_URL}/delete`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { orderIDs },
    });
  } catch (error) {
    console.error('Failed to delete orders:', error);
    throw error;
  }
};
