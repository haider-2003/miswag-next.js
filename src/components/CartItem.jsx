import { formatPrice } from "@/utils/formatters";
import TrashIcon from "./TrashIcon";

export default function CartItem({
  item,
  handleIncrease,
  handleDecrease,
  toggleWishlist,
  inWishlist,
}) {
  const handleWishlistToggle = () => {
    toggleWishlist(item);
  };
  return (
    <div className="flex flex-row gap-2 justify-between relative p-4 border-b border-white px-4">
      <div className="flex items-center w-[150px] h-[150px]">
        <img
          src={item.image}
          alt={item.title}
          className="object-contain rounded-md w-full h-full"
        />
      </div>
      <button
        className="absolute top-2 left-2 w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center z-10 transition-colors duration-200 shadow-lg cursor-pointer"
        onClick={handleWishlistToggle}
      >
        <img
          src={inWishlist ? "/clicked-heart.png" : "/heart.png"}
          alt="heart-icon"
          className="w-4 h-4"
        />
      </button>
      <div className="flex flex-col justify-between w-full">
        <h2 className="text-lg font-semibold">{item.title}</h2>
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="m-3">
            <p className="text-gray-500 font-bold text-sm line-through my-2">
              {item.price.currency} {formatPrice(item.price.original_value)}
            </p>
            <p className="font-bold">
              {item.price.currency}
              {formatPrice(item.price.value)}
            </p>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => handleIncrease(item)}
              className="flex justify-center border border-gray-300 p-3 px-4 text-sm hover:bg-gray-100 transition-colors cursor-pointer"
            >
              +
            </button>

            <span className="flex justify-center border border-gray-300 p-3 px-4 text-sm">
              {item.quantity}
            </span>

            <button
              onClick={() => handleDecrease(item)}
              className="flex justify-center border border-gray-300 p-3 px-4 text-sm hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {item.quantity > 1 ? "-" : <TrashIcon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
