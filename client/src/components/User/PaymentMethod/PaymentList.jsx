import React, { useState } from "react";
import ButtonRadio from "../../ButtonRadio";

function PaymentList({ onClick }) {
  const [selectedValue, setSelectedValue] = useState("option1");

  const handleRadioClick = (value) => {
    setSelectedValue(value);
    console.log(value);
  };

  return (
    <div className="flex flex-col m-4">
      <h1 className="font-bold text-2xl">ช่องทางการชําระเงิน</h1>
      <div className="form-control space-y-2 mt-4">
        <ButtonRadio
          label="ชำระเงินปลายทาง"
          value="option1"
          isSelected={selectedValue === "option1"}
          onClick={handleRadioClick}
        />
        <ButtonRadio
          label="ชำระด้วยบัตร [xxxx xxxx xxxx xxxx]"
          value="option2"
          isSelected={selectedValue === "option2"}
          onClick={handleRadioClick}
        />
        <button className="btn btn-outline btn-accent" onClick={onClick}>
          + เพิ่ม
        </button>
      </div>
    </div>
  );
}

export default PaymentList;
