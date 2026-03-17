import React from 'react';

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-6 bg-gray-600 rounded-2xl shadow-lg border border-gray-100 max-w-md">
      <p className="text-[14px] text-white leading-relaxed">{content}</p>

      <div className="flex justify-end mt-6 gap-3">
        <button
          className="btn-small bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-200"
          type="button"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
