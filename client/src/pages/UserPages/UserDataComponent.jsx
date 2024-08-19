import React from "react";

function UserDataComponent({ label, value, editMode, name }) {
  return (
    <div className="grid grid-cols-3 items-center space-y-2">
      <div>{label}</div>
      <div className="col-span-2">
        <input
          type="text"
          defaultValue={value}
          className="input input-bordered w-full max-w-xs"
          name={name}
          disabled={!editMode}
        />
      </div>
    </div>
  );
}

export default UserDataComponent;
