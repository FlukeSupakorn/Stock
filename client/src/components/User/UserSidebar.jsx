import React, { useState,useEffect} from "react";
import { Link, useLocation  } from "react-router-dom";

function UserSidebar() {
  const sidebarItems = [
    {
      title: "บัญชีของฉัน",
      svg: "user",
      subItems: [
        { label: "ประวัติ", href: "/user" },
        { label: "ที่อยู่จัดส่ง", href: "/user/address" },
        { label: "ช่องทางการชำระเงิน", href: "/user/payoption" },
      ],
    },
    {
      title: "การสั่งซื้อของฉัน",
      svg: "order",
     subItems: [
        { label: "รายการสั่งซื้อ", href: "/user/orders" },
        { label: "รายการที่ยกเลิก", href: "/user/ordercancel" },
      ],
    },
  ];
  
  return (
    <div className="flex flex-col w-1/4">
      <div className="join join-vertical w-full">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className="collapse collapse-open join-item border border-base-300" 
          >
            <input
              type="radio"
              id={`collapse-${index}`}
              name="collapse"
              className="peer"
              defaultChecked
            />

            <div className="collapse-title text-xl font-medium">
              <div className="flex flex-row ml-2">
                  {item.svg === "user" && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-6 h-6 mr-4">
                    <path fill="#000" fillRule="evenodd"
                      d="M16.563 18H3.438c-.706 0-1.228-.697-.961-1.338C3.713 13.698 6.617 12 10 12c3.384 0 6.288 1.698 7.524 4.662.267.641-.255 1.338-.961 1.338M5.917 6c0-2.206 1.832-4 4.083-4 2.252 0 4.083 1.794 4.083 4S12.252 10 10 10c-2.251 0-4.083-1.794-4.083-4m14.039 11.636c-.742-3.359-3.064-5.838-6.119-6.963 1.619-1.277 2.563-3.342 2.216-5.603-.402-2.623-2.63-4.722-5.318-5.028C7.023-.381 3.875 2.449 3.875 6c0 1.89.894 3.574 2.289 4.673-3.057 1.125-5.377 3.604-6.12 6.963C-.226 18.857.779 20 2.054 20h15.892c1.276 0 2.28-1.143 2.01-2.364" />
                  </svg>
                  )}
                  {item.svg === "order" && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon w-6 h-6 mr-4" viewBox="0 0 1024 1024">
                    <g>
                      <path d="M300 462.4h424.8v48H300v-48zm0 211.2h260v48H300v-48z" />
                      <path
                        d="M818.4 981.6H205.6c-12.8 0-24.8-2.4-36.8-7.2-11.2-4.8-21.6-11.2-29.6-20-8.8-8.8-15.2-18.4-20-29.6-4.8-12-7.2-24-7.2-36.8V250.4c0-12.8 2.4-24.8 7.2-36.8 4.8-11.2 11.2-21.6 20-29.6 8.8-8.8 18.4-15.2 29.6-20 12-4.8 24-7.2 36.8-7.2h92.8V204h-92.8c-25.6 0-47.2 20.8-47.2 47.2v637.6c0 25.6 20.8 47.2 47.2 47.2h612c25.6 0 47.2-20.8 47.2-47.2V250.4c0-25.6-20.8-47.2-47.2-47.2h-92V156h92.8c12.8 0 24.8 2.4 36.8 7.2 11.2 4.8 21.6 11.2 29.6 20 8.8 8.8 15.2 18.4 20 29.6 4.8 12 7.2 24 7.2 36.8v637.6c0 12.8-2.4 24.8-7.2 36.8-4.8 11.2-11.2 21.6-20 29.6-8.8 8.8-18.4 15.2-29.6 20-12 5.6-24 8-36.8 8z" />
                      <path
                        d="M747.2 297.6H276.8V144c0-32.8 26.4-59.2 59.2-59.2h60.8c21.6-43.2 66.4-71.2 116-71.2 49.6 0 94.4 28 116 71.2h60.8c32.8 0 59.2 26.4 59.2 59.2l-1.6 153.6zM324 250.4h376.8V144c0-6.4-5.6-12-12-12h-93.6l-5.6-16c-11.2-32.8-42.4-55.2-77.6-55.2-35.2 0-66.4 22.4-77.6 55.2l-5.6 16h-93.6c-6.4 0-12 5.6-12 12v106.4z" />
                    </g>
                  </svg>
                  )}
                {item.title}
              </div>
            </div>
            <div className="collapse-content">
              <ul className="menu menu-vertical bg-base-100 text-base-content">
                {item.subItems.map((subItem, index) => (
                  <li key={index}>
                    <a
                      href={subItem.href}
                      className="bg-primary text-primary-content text-lg"
                    >
                      {subItem.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-neutral text-neutral-content mt-12">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl">
            <div className="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                stroke="#fff"
                viewBox="-0.88 0 308 308"
                className="w-6 h-6 mr-4"
              >
                <path
                  d="M306.246 130.827a12.286 12.286 0 0 0-1.558-5.643l-36.515-69.051V11.849A11.81 11.81 0 0 0 256.153 0H50.2a11.816 11.816 0 0 0-12.027 11.849v44.276L1.661 125.169A12.405 12.405 0 0 0 0 130.828a28.769 28.769 0 0 0 12.173 23.136v126.22c0 15.372 12.856 27.82 28.081 27.82h225.579c15.371 0 28.34-12.449 28.34-27.821v-126.33a28.6 28.6 0 0 0 12.073-23.026ZM244.173 24v23h-182V24ZM57.501 71h191.338l32.364 61.6a3.7 3.7 0 0 1-3.017 1.7l-250.251.031a3.583 3.583 0 0 1-2.923-1.707Zm120.672 213h-50v-55.773a25 25 0 1 1 50 0Zm87.66 0h-63.66v-55.774a49.5 49.5 0 0 0-99 0v55.773H40.254c-1.864 0-3.081-1.809-3.081-3.82v-121.18h232v121.179a3.644 3.644 0 0 1-3.34 3.822Z"
                  data-name="Path 4"
                />
              </svg>
              สำหรับผู้ขาย
            </div>
          </h2>
          <p>เริ่มต้นขายสินค้ากับเรา</p>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary">Seller center</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSidebar;
