import React from "react";

const ButtonRadio = ({
  label,
  value,
  isSelected,
  onClick,
  content,
  isContent,
}) => {
  return (
    <div>
      {isContent ? (
        <div
          className={`btn flex justify-start h-fit gap-4 ${
            isSelected ? "btn-accent" : ""
          }`}
          onClick={() => onClick(value)}
        >
          <div className="flex flex-row m-4">
            <input
              type="radio"
              name="paymentOptions"
              value={value}
              className={`radio ${isSelected ? "radio-accent" : ""}`}
              checked={isSelected}
              onChange={() => onChange(value)}
            />
            <div className="flex flex-col ml-4">
              <div className="flex font-bold text-xl ">{label}</div>
              <div className="text-left text-base mt-2">{content}</div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`btn flex justify-start h-fit gap-4 ${
            isSelected ? "btn-accent" : ""
          }`}
          onClick={() => onClick(value)}
        >
          <input
            type="radio"
            name="paymentOptions"
            value={value}
            className={`radio ${isSelected ? "radio-accent" : ""}`}
            checked={isSelected}
            onChange={() => onChange(value)}
          />
          <div className="text-base">{label}</div>
        </div>
      )}
    </div>
  );
};
export default ButtonRadio;
