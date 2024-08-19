import React, { useState, useRef } from "react";
import {
  ThailandAddressTypeahead,
  ThailandAddressValue,
} from "react-thailand-address-typeahead";

function NewAddressModal({ handleSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    subdistrict: "",
    district: "",
    province: "",
    postalCode: "",
  });
  const [val, setVal] = useState(ThailandAddressValue.empty());

  const handleNameChange = (event) => {
    setFormData({ ...formData, name: event.target.value });
  };

  const handleContactChange = (event) => {
    setFormData({ ...formData, contact: event.target.value });
  };

  const handleAddressChange = (event) => {
    setFormData({ ...formData, address: event.target.value });
  };
  const handleSubmitForm = (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget); // Extract data from form (e.g., using new FormData(event.currentTarget))
      handleSubmit(formData); // Pass data to parent component
      console.log(formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleThailandAddressChange = (val) => {
    setVal(val);
    setFormData({
      ...formData,
      subdistrict: val.subdistrict,
      district: val.district,
      province: val.province,
      postalCode: val.postalCode,
    });
  };

  return (
    <div className="flex flex-col m-4 w-[896px] h-[500px]">
      <h1 className="font-bold text-2xl">ที่อยู่จัดส่ง</h1>
      <form onSubmit={handleSubmitForm}>
        <div className="flex flex-row justify-between space-x-4 mt-4">
          <div className="flex flex-col w-full">
            <span className="text-sm mb-1">ชื่อ - นามสกุล</span>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full"
              value={formData.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <span className="text-sm mb-1">เบอร์ติดต่อ</span>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full"
              value={formData.contact}
              onChange={handleContactChange}
            />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-sm mb-1 ">ที่อยู่</span>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full h-16"
            value={formData.address}
            onChange={handleAddressChange}
          />
        </div>
        <ThailandAddressTypeahead
          value={val}
          onValueChange={handleThailandAddressChange}
        >
          <div className="flex flex-row justify-between space-x-4 mt-4">
            <div className="w-1/2">
              <span className="text-sm mb-1">ตำบล / แขวง</span>
              <ThailandAddressTypeahead.SubdistrictInput
                className="input input-bordered w-full"
                placeholder=""
              />
            </div>
            <div className="w-1/2">
              <span className="text-sm mb-1">อำเภอ / เขต</span>
              <ThailandAddressTypeahead.DistrictInput
                className="input input-bordered w-full"
                placeholder=""
              />
            </div>
          </div>
          <div className="flex flex-row justify-between space-x-4 mt-4">
            <div className="w-1/2 mt-2">
              <span className="text-sm mb-1">จังหวัด</span>
              <ThailandAddressTypeahead.ProvinceInput
                className="input input-bordered w-full"
                placeholder=""
              />
            </div>
            <div className="w-1/2 mt-2">
              <span className="text-sm mb-1">รหัสไปรษณีย์</span>
              <ThailandAddressTypeahead.PostalCodeInput
                className="input input-bordered w-full"
                placeholder=""
              />
            </div>
          </div>
          <ThailandAddressTypeahead.Suggestion
            containerProps={{
              className:
                "absolute max-h-40 overflow-y-auto bg-primary p-1 shadow-md rounded-md border border-gray-300",
            }}
            optionItemProps={{
              className: "text-lg cursor-pointer hover:bg-gray-300",
            }}
          />
        </ThailandAddressTypeahead>
      </form>
    </div>
  );
}

export default NewAddressModal;
