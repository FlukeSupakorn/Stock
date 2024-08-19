import axios from 'axios';

const API_URL = 'http://localhost:3333/admin/products';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/see`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/category-see`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/add`, product, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.product;
  } catch (error) {
    console.error('Failed to add product:', error);
    throw error;
  }
};

export const deleteProducts = async (productIDs) => {
  try {
    await axios.delete(`${API_URL}/delete`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { productIDs },
    });
  } catch (error) {
    console.error('Failed to delete products:', error);
    throw error;
  }
};

export const updateProduct = async (product) => {
    try {
      await axios.put(`${API_URL}/update`, product, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Failed to update product:', error);
      throw error;
    }
};  

export const addProductImage = async (productId, imageUrl) => {
  try {
    const response = await axios.post(`${API_URL}/add-image`, {
      productId,
      imageUrl,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.image;
  } catch (error) {
    console.error('Failed to add image:', error);
    throw error;
  }
};

export const removeProductImage = async (imageId) => {
  try {
    await axios.delete(`${API_URL}/remove-image`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { imageId },
    });
  } catch (error) {
    console.error('Failed to remove image:', error);
    throw error;
  }
};
