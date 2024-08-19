import React, { useEffect, useState } from "react";
import logo from "../../assets/png/logo-no-background-white.png";
import { totalPriceState, totalQuantityState } from "../../recoil/cart";
import { useRecoilValue } from "recoil";
import useCartActions from "../../API/userCartActions";

export default function Header() {
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const totalPrice = useRecoilValue(totalPriceState);
  const totalQuantity = useRecoilValue(totalQuantityState);
  const { fetchCart } = useCartActions(userId);
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location = "/";
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div>
      <div className="navbar bg-accent fixed top-0 z-40">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl text-primary" href="/">
            <img src={logo} alt="" className="w-8" />
            GadgetHouse
          </a>
        </div>
        <div className="navbar-center hidden md:flex">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" placeholder="Search" className="lg:w-96" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="navbar-end mr-4">
          {userId ? (
            <div className="flex">
              <a
                role="button"
                className="btn btn-ghost btn-circle mr-4"
                href="/wishlist"
              >
                <div className="indicator">
                  <svg
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </a>
                <details className="dropdown dropdown-end">
                  <summary
                    role="button"
                    className="btn btn-ghost btn-circle mr-4"
                  >
                    <div className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke="#FFFFFF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="badge badge-sm indicator-item">
                        {totalQuantity}
                      </span>
                    </div>
                  </summary>
                  <div
                    tabIndex={0}
                    className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-neutral shadow"
                  >
                    <div className="card-body">
                      <span className="font-bold text-lg text-primary">
                        {totalQuantity} Items
                      </span>
                      <span className="text-info">Subtotal: ฿{totalPrice}</span>
                      <div className="card-actions">
                        <a className="btn btn-accent btn-block" href="/cart">
                          ดูตะกร้า
                        </a>
                      </div>
                    </div>
                  </div>
                </details>
              

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a href="/user">บัญชีของฉัน</a>
                  </li>
                  <li>
                    <a href="/user/orders">การซื้อของฉัน</a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>ออกจากระบบ</a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <a
                href="/login"
                className="btn btn-primary btn-outline text-white w-24 mr-4"
              >
                Login
              </a>
              <a href="/register" className="btn btn-primary w-24">
                Register
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
