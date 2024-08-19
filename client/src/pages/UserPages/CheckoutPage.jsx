import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/Modal";
import PaymentList from "../../components/User/PaymentMethod/PaymentList";
import NewPaymentModal from "../../components/User/PaymentMethod/NewPaymentModal";
import AddressList from "../../components/User/Address/AddressList";
import NewAddressModal from "../../components/User/Address/NewAddressModal";

function CheckoutPage() {
  const handleLinkClick = () => {
    console.log("Submit button clicked");
  };
  const handleSubmitAddress = (event) => {
    // event.preventDefault();
  
    // const formData = new FormData(event.currentTarget);

    // const data = Object.fromEntries(formData.entries());
    // console.log("Form Data:", data);
    // Perform other actions with the data (optional)
    // setShowNewAddress(false)
    // console.log(event);
  }; 

  const [showPaymentList, setShowPaymentList] = useState(false);
  const [showNewPayment, setShowNewPayment] = useState(false);
  const [showAddressList, setShowAddressList] = useState(false);
  const [showNewAddress, setShowNewAddress] = useState(false);

  const openPaymentList = () => {
    setShowPaymentList(true);
  };

  const closePaymentList = () => {
    setShowPaymentList(false);
  };

  const openNewPayment = () => {
    setShowNewPayment(true);
  };

  const closeNewPayment = () => {
    setShowNewPayment(false);
  };

  const openAddressList = () => {
    setShowAddressList(true);
  };

  const closeAddressList = () => {
    setShowAddressList(false);
  };

  const openNewAddress = () => {
    setShowNewAddress(true);
  };

  const closeNewAddress = () => {
    setShowNewAddress(false);
  };

  return (
    <div className="font-noto">
      <div className="flex flex-row justify-between mx-48">
        <div className="flex flex-col gap-4">
          <div
            className="btn btn-outline btn-accent w-[450px] 2xl:w-[800px] h-24 no-animation "
            onClick={openNewAddress}
          >
            เพิ่มที่อยู่จัดส่ง
          </div>
          <div className="card w-[450px] 2xl:w-[800px] bg-primary text-primary-content card-bordered">
            <div className="card-body">
              <h2 className="card-title ">ที่อยู่จัดส่ง</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn" onClick={openAddressList}>เปลี่ยน</button>
              </div>
            </div>
          </div>
          <div className="card w-[450px] 2xl:w-[800px] bg-primary text-primary-content card-bordered">
            <div className="card-body">
              <h2 className="card-title">ช่องทางการชําระเงิน</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn" onClick={openPaymentList}>เปลี่ยน</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body ">
              <h2 className="card-title text-2xl mb-2">สรุปการสั่งซื้อ</h2>
              <div className="flex flex-row justify-between">
                <p>ยอดรวมสินค้า</p>
                <p className="font-bold text-right">ราคาสินค้า</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>ค่าจัดส่ง</p>
                <p className="font-bold text-right">ฟรี</p>
              </div>
              <div className="divider my-2"></div>
              <div className="flex flex-row justify-between mb-4">
                <h1 className="text-xl">ยอดสุทธิ</h1>
                <h1 className="text-xl font-bold text-right">ราคาสินค้า</h1>
              </div>
              <div className="card-actions justify-center ">
                <button className="btn btn-wide btn-error">
                  ทำการสั่งซื้อ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showPaymentList}
        onClose={closePaymentList}
        submit={handleLinkClick}
      >
        <PaymentList onClick={openNewPayment}/>
      </Modal>

      <Modal
        isOpen={showNewPayment}
        onClose={closeNewPayment}
        submit={handleLinkClick}
      >
        <NewPaymentModal/>
      </Modal>

      <Modal
        isOpen={showAddressList}
        onClose={closeAddressList}
        submit={handleLinkClick}
      >
        <AddressList onClick={handleLinkClick}/>
      </Modal>

      <Modal
        isOpen={showNewAddress}
        onClose={closeNewAddress}
        submit={handleLinkClick}
      >
        <NewAddressModal handleSubmit={handleLinkClick}/>
      </Modal>
    </div>
  );
}

export default () => (
  <Layout>
    <CheckoutPage />
  </Layout>
);
