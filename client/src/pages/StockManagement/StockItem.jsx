import React from "react";

function StockItem({ item, onEdit, onRemove }) {
  return (
    <tr className="bg-white border-b">
      <td className="border p-2">{item.name}</td>
      <td className="border p-2">{item.quantity}</td>
      <td className="border p-2">
        <button
          onClick={onEdit}
          className="btn px-4 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 transition-colors mr-2"
        >
          Edit
        </button>
        <button
          onClick={onRemove}
          className="btn px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default StockItem;
