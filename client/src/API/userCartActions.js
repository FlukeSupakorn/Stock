// useCartActions.js
import { useRecoilState } from "recoil";
import axios from "axios";
import { cartState,cartStatusState } from "../recoil/cart";

const url = "http://localhost:3333/";
const useCartActions = (userId) => {
  const [cart, setCart] = useRecoilState(cartState);
  const [status, setStatus] = useRecoilState(cartStatusState);
  const fetchCart = async () => {
    try {
      const response = await axios.get(url + "cart/" + userId);
      if (response.data.status === "ok") {
        setCart(response.data.data);
      } else {
        console.error("Error fetching cart data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (product, quantity) => {
    try {
      await axios.post(url + "cart", {
        userId,
        productId: product,
        quantity,
      });
      setStatus({visible: true, type: 'success', message: 'เพิ่มสินค้าลงตะกร้าแล้ว'});
      await fetchCart();
    } catch (error) {
      setStatus({ visible: true, type: 'error', message: 'Error adding to cart.' });
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(url + "cart", {
        data: { userId, productId },
      });
      await fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    try {
      await axios.patch(url + "cart", {
        userId,
        productId,
        quantity,
      });
      await fetchCart();
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  return {
    cart,
    fetchCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
  };
};

export default useCartActions;
