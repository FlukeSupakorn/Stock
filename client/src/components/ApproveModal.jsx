import React from "react";
import Modal from "./Modal";

function ApproveModal({ isOpen, onClose, submit }) {
  if (!isOpen) return null;
  return (
    <div>
      <dialog className="modal modal-open">
        <div className="modal-box ">
          <h3 className="font-bold text-lg text-center">คุณต้องการลบข้อมูลนี้ใช่หรือไม่ ?</h3>
          <div className="modal-action justify-around">
            <form method="dialog">
              <button className="btn btn-accent btn-ghost btn-lg" onClick={onClose}>
                ยกเลิก
              </button>
              <button className="btn btn-error btn-lg" onClick={submit}>
                ยืนยัน
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ApproveModal;
