import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/formatters";
import TrashIcon from "./TrashIcon";

export default function CartModal() {
  const { isModalOpen, selectedProduct, closeModal, addToCart } =
    useCartStore();

  // Local state for user selections
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  if (!isModalOpen || !selectedProduct) return null;

  const handleAddToCart = () => {
    // Create product with user's selections
    const productToAdd = {
      ...selectedProduct,
      quantity: selectedQuantity,
    };
    console.log(productToAdd);

    // Add to cart with selected quantity (store handles the quantity)
    addToCart(productToAdd);
  };

  const handleClose = () => {
    // Reset local state when closing
    setSelectedQuantity(1);
    closeModal();
  };

  const handleIncreaseQuantity = () => {
    setSelectedQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setSelectedQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <header className="flex items-center justify-between gap-2 p-1">
            <button
              onClick={handleClose}
              className=" text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h1 className="text-base font-semibold text-gray-800">
              {selectedProduct.title}
            </h1>
          </header>

          {/* Product Info */}
          <div className="flex items-start flex-col gap-4 mb-6" dir="rtl">
            {/* i implemented this since i dont have colored or multi color images */}
            <span className="text-gray-600">الالوان:</span>
            <div className="flex gap-2">
              {selectedProduct?.colors.map((color) => (
                <span
                  key={color}
                  className={`w-6 h-6 rounded-full cursor-pointer hover:scale-110 transition-transform`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* product image */}
            {/* border radius should be active only if the selected color === avilable color but again i don't have multi color images */}
            <div className=" w-[150px] shadow-md rounded-md overflow-hidden border border-red-500">
              <img
                src={selectedProduct?.image}
                alt={selectedProduct?.title}
                className="max-h-full w-full object-cover rounded-md"
                loading="lazy"
              />
            </div>

            <span className="text-lg">الحجم:</span>
            <div className="flex gap-2">
              {/* the api doesn't provide sizes here is how i would do it if there are sizes array*/}
              {/* {selectedProduct?.sizes.map((size) => (
                <span
                  key={size}
                  className="px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </span>
              ))} */}
              {/* for now this is simulated */}
              <span
                className={`flex justify-center border border-gray-300 p-3 px-4 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors`}
              >
                Default
              </span>
            </div>
            <div className="w-full flex items-center justify-between gap-2">
              <span className=" text-2xl">الكمية:</span>
              <div className="flex">
                <button
                  className="flex justify-center border border-gray-300 p-3 px-4 text-sm hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={handleIncreaseQuantity}
                >
                  +
                </button>

                <span className="flex  justify-center border border-gray-300 p-3 px-4 text-sm">
                  {selectedQuantity}
                </span>
                <button
                  className="flex justify-center border border-gray-300 p-3 px-4 text-sm hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={handleDecreaseQuantity}
                >
                  {/* if the quantity is greater than 1 show - if it is 1 show 1 show trash word */}
                  {selectedQuantity > 1 ? "-" : <TrashIcon />}
                </button>
              </div>
            </div>
          </div>

          {/* Question */}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-xl cursor-pointer"
            >
              اضف الى السلة
            </button>
            <div className="flex flex-col shadow-sm p-2 rounded-md">
              <span className="text-gray-600 text-sm line-through">
                {selectedProduct.price.currency}{" "}
                {formatPrice(selectedProduct.price.original_value)}
              </span>
              <span className="font-semibold ">
                {selectedProduct.price.currency}{" "}
                {formatPrice(selectedProduct.price.value)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
