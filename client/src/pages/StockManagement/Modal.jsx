import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, items }) => {
  if (!isOpen) return null;

  const handleSave = () => {
    // Implement save logic here
    console.log("Save button clicked");
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-800 text-xl font-semibold">Edit Items</span>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div>
          {items.length === 0 ? (
            <p className="text-gray-600">No items available</p>
          ) : (
            items.map((item, index) => (
              <div key={item} className={`flex items-center justify-between py-2 border-b border-gray-200`}>
                <span className="text-gray-800 font-semibold">{item}</span>
                <input
                  type="number"
                  defaultValue="0"
                  className="text-gray-800 text-center w-24 border border-gray-300 rounded-md py-1 px-2"
                />
              </div>
            ))
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
