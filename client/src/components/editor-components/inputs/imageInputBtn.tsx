import React from "react";

interface ImageSelectButtonProps {
  selectedImgUrl: string;
  onClick?: () => void;
}

const ImageSelectButton: React.FC<ImageSelectButtonProps> = ({
  selectedImgUrl,
  onClick,
}) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className="size-30 md:size-40 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-blue-500 hover:scale-110 transition flex items-center justify-center overflow-hidden cursor-pointer"
    >
      {selectedImgUrl ? (
        <img
          src={selectedImgUrl}
          alt="Selected"
          className="object-cover w-full h-full rounded-lg"
        />
      ) : (
        <span className="text-gray-400 text-sm">Select Image</span>
      )}
    </div>
  );
};

export default ImageSelectButton;
