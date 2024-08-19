import React, { useState } from "react";

const ProductImage = ({ thumbnailImages }) => {
  const [selectedImage, setSelectedImage] = useState(thumbnailImages[0]);

  const handleClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="flex flex-col md:w-[450px] md:h-[450px]">
      <div id="main" className="mb-4 h-full w-full overflow-hidden">
        <img
          src={selectedImage}
          alt="image"
          className="object-contain rounded-xl w-full h-full cursor-pointer "
          onClick={()=>document.getElementById('my_modal_2').showModal()}
        />
      </div>
      <div className="flex flex-row mt-3 overflow-x-auto md:overflow-x-visible justify-evenly">
        {thumbnailImages.map((image, index) => (
          <picture key={index} className="w-24 h-24">
            <img
              src={image}
              alt={`image ${index + 1}`}
              className={`object-contain w-full h-full rounded-xl cursor-pointer ${
                selectedImage === image
                  ? "border-4 border-blue-500"
                  : "opacity-50"
              }`}
              onClick={() => handleClick(image)}
            />
          </picture>
        ))}
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box flex flex-col">
          <img
            src={selectedImage}
            alt="Shoes"
            className="rounded-xl max-w-full "
          />
          {/* <p className="py-4">Click outside to close.</p> */}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ProductImage;
