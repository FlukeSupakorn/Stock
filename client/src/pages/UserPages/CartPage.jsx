import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import ProductCart from "../../components/User/ProductCart";
import { useNavigate } from "react-router-dom";
import useCartActions from "../../API/userCartActions";
import {
  cartState,
  totalPriceState,
} from "../../recoil/cart";
import { useRecoilValue } from "recoil";

function CartPage() {
  const userId = useState(localStorage.getItem("userId"));
  const cart = useRecoilValue(cartState);
  const totalPrice = useRecoilValue(totalPriceState);
  const [loading, setLoading] = useState(true);
  const { fetchCart, updateCartQuantity, removeFromCart } = useCartActions(
    userId[0]
  );
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchCart().finally(() => setLoading(false));
  }, []);
  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleClick = () => {
    navigate("/products");
  };

  return (
    <div className="font-noto">
      <div className="flex flex-col justify-center content-center items-center w-1/3 mx-auto">
        <h1 className="text-5xl font-bold">Your Cart Items</h1>
        <div className="divider "></div>
        <button className="btn btn-wide btn-error" onClick={handleClick}>
          Back to Shop
        </button>
      </div>
      {cart.length === 0 ? (
        <div className="flex flex-col justify-center content-center items-center w-1/3 mx-auto">
          <h1 className="text-3xl mt-10">Your Cart is Empty</h1>
        </div>
      ): (
        <div className="flex flex-row justify-between mx-10 2xl:mx-48 ">
        <div className="overflow-x-auto mt-4">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <th >สินค้า</th>
                <th >ราคา</th>
                <th >จำนวน</th>
                <th >ราคาทั้งหมด</th>
                <th ></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    <div className="flex justify-center h-96">
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  </td>
                </tr>
              ) : (
                cart.map((cartItem) =>
                  cartItem.Products.map((product) => (
                    <ProductCart
                      key={product.ProductID}
                      avatar={
                        product.ProductImages.length > 0
                          ? product.ProductImages[0].Productimagecode
                          : ""
                      }
                      name={product.ProductName}
                      price={product.Price}
                      quantity={cartItem.Quantity}
                      onRemove={() => removeFromCart(product.ProductID)}
                      onQuantityChange={(newQuantity) =>
                        updateCartQuantity(product.ProductID, newQuantity)
                      }
                    />
                  ))
                )
              )}
            </tbody>
          </table>
        </div>
        <div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body ">
              <h2 className="card-title text-2xl mb-2">สรุปการสั่งซื้อ</h2>
              <div className="flex flex-row justify-between">
                <p>ยอดรวมสินค้า</p>
                <p className="font-bold text-right">฿{totalPrice}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>ค่าจัดส่ง</p>
                <p className="font-bold text-right">ฟรี</p>
              </div>
              <div className="divider my-2"></div>
              <div className="flex flex-row justify-between mb-4">
                <h1 className="text-xl">ยอดสุทธิ</h1>
                <h1 className="text-xl font-bold text-right">฿{totalPrice}</h1>
              </div>
              <div className="card-actions justify-center ">
                <button
                  className="btn btn-wide btn-error"
                  onClick={handleCheckout}
                >
                  ทำการสั่งซื้อ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default () => (
  <Layout>
    <CartPage />
  </Layout>
);
