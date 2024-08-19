import React from 'react'

function Toast({ message, type, onClose }) {
  return (
    <div className="toast toast-bottom toast-end fixed transform -translate-x-1/2 z-50">
    <div className={`card shadow-lg ${type === 'success' ? 'bg-success' : 'bg-error'} text-white`}>
        <div className="card-body">
          <div className="flex justify-between items-center">
            <span>{message}</span>
            <button onClick={onClose} className="ml-2 btn btn-xs btn-circle btn-primary">✕</button>
          </div>
        </div>
      </div>
  </div>
  )
}

export default Toast