import { formatPrice } from "@/utils/formatters";

export default function WishlistItem({ item, inWishlist, toggleWishlist }) {
  
  const handleWishlistToggle = () => {
    toggleWishlist(item);
  };

  return (
    <div className="flex flex-row gap-2 justify-between px-4 pt-4 border-y border-2 border-gray-200 relative ">
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
      <div className="flex flex-col  w-full">
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
        </div>
      </div>
    </div>
  );
}
