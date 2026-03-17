import React, { useRef, useState } from 'react';
import { LucideUser, LucideTrash, LucideUpload } from 'lucide-react';

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      //Update the Image
      setImage(file);

      //Generet preview URL from the file
      const preview = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(preview);
      }
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);

    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div
          className="relative w-24 h-24 rounded-full 
    bg-slate-700 flex items-center justify-center 
    border-2 border-dashed border-slate-500 
    hover:border-cyan-400 transition duration-300"
        >
          <LucideUser size={28} className="text-slate-400" />

          <button
            type="button"
            onClick={onChooseFile}
            className="absolute -bottom-1 -right-1 
        bg-cyan-500 hover:bg-cyan-600 
        p-1.5 rounded-full shadow transition"
          >
            <LucideUpload size={14} className="text-white" />
          </button>
        </div>
      ) : (
        <div className="relative w-24 h-24">
          <img
            src={preview || previewUrl}
            alt="Profile"
            className="w-24 h-24 object-cover 
        rounded-full border-2 border-cyan-500"
          />

          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-1 -right-1 
        bg-red-500 hover:bg-red-600 
        p-1.5 rounded-full shadow transition"
          >
            <LucideTrash size={12} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
