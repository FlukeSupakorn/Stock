import axios from 'axios';
const API_URL = 'http://localhost:3333/admin/stock/';
export const fetchTotalSalesData = async () => {
    try {
        const response = await axios.get(`${API_URL}/see/totalprice`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the total sales data!", error);
        return [];
    }
};
export const fetchStock = async () => {
    try {
        const response = await axios.get(`${API_URL}/see`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the total sales data!", error);
        return [];
    }
};