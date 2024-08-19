import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserLayout from "../../components/User/UserLayout";
import InformationCard from "../../components/User/InformationCard";
import Modal from "../../components/Modal";
import NewAddressModal from "../../components/User/Address/NewAddressModal";
import ApproveModal from "../../components/ApproveModal";

function UserAddressPage() {
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [showDeleteAddressModal, setShowDeleteAddressModal] = useState(false);

  const openAddAddressModal = () => {
    setShowAddAddressModal(true);
  };

  const closeAddAddressModal = () => {
    setShowAddAddressModal(false);
  };

  const openEditAddressModal = () => {
    setShowEditAddressModal(true);
  };

  const closeEditAddressModal = () => {
    setShowEditAddressModal(false);
  };

  const openDeleteAddressModal = () => {
    setShowDeleteAddressModal(true);
  };

  const closeDeleteAddressModal = () => {
    setShowDeleteAddressModal(false);
  };

  return (
    <div className="flex w-full">
      <div className="card w-full bg-primary card-bordered ">
        <div className="card-body">
          <h2 className="card-title flex flex-col items-start">
            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex font-bold text-xl">ที่อยู่ของฉัน</div>
              <button className="btn btn-accent" onClick={openAddAddressModal}>
                เพิ่มที่อยู่
              </button>
            </div>
            <div className="divider m-0"></div>
          </h2>
          <InformationCard
            onEditAddress={openEditAddressModal}
            onDeleteAddress={openDeleteAddressModal}
          />
        </div>
      </div>
      <Modal isOpen={showAddAddressModal} onClose={closeAddAddressModal}>
        <NewAddressModal />
      </Modal>

      <Modal isOpen={showEditAddressModal} onClose={closeEditAddressModal}>
        <NewAddressModal />
      </Modal>

      <ApproveModal
        isOpen={showDeleteAddressModal}
        onClose={closeDeleteAddressModal}
      />
    </div>
  );
}

export default () => (
  <Layout>
    <UserLayout>
      <UserAddressPage />
    </UserLayout>
  </Layout>
);
