import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishList";
import { formatPrice, parsePrice } from "@/utils/formatters";

export default function ProductCell({ product, properties }) {
  //this log is just to check virtulization in the log better than deeply nested divs
  // console.log("product renderd " + product.id);

  const { openModal } = useCartStore();
  const { toggleWishlist, isInWishlist, wishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  //from cart store
  const handleAddToCart = () => {
    openModal(product);
  };

  // from wishlist store
  const handleWishlistToggle = () => {
    console.log(wishlist);

    toggleWishlist(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col p-3 ">
      {/* Product Image */}
      {product.image && (
        <div
          className="w-full bg-white flex items-center justify-center p-3 relative"
          style={{ aspectRatio: properties?.image_ratio || "1" }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain rounded"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Start Tag - positioned on image container */}
          {product.start_tag && product.start_tag.title && (
            <div
              className="absolute top-2 left-2 px-2 py-1 rounded-2xl text-xs font-bold flex items-center gap-1 z-10"
              style={{
                backgroundColor: product.start_tag.bg_color,
                color: product.start_tag.color,
              }}
            >
              {product.start_tag.icon && (
                <img src={product.start_tag.icon} alt="" className="w-3 h-3" />
              )}
              {product.start_tag.title}
            </div>
          )}

          {/*the API returns an end_tag field, but the Figma design doesn't show a place for it. this logic is currently commented out because it's overridden by the "has_favourite_btn" flag*/}
          {/* End Tag - positioned on image container */}
          {/* {product.end_tag && (
            <div
              className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold flex items-center gap-1 z-10"
              style={{
                backgroundColor: product.end_tag.bg_color,
                color: product.end_tag.color,
              }}
            >
              {product.end_tag.icon && (
                <img src={product.end_tag.icon} alt="" className="w-3 h-3" />
              )}
              {product.end_tag.title}
            </div>
          )} */}

          {/* heart icon */}
          {properties?.has_favourite_btn && (
            <button
              className="absolute top-2 right-2 w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center z-10 transition-colors duration-200 shadow-lg cursor-pointer"
              onClick={handleWishlistToggle}
            >
              <img
                src={inWishlist ? "/clicked-heart.png" : "/heart.png"}
                alt="heart-icon"
                className="w-4 h-4"
              />
            </button>
          )}

          <button className="absolute bottom-2 right-2 w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center z-10 transition-colors duration-200 shadow-lg cursor-pointer">
            <img
              src="/shopping-cart.png"
              alt="shopping-cart"
              className="w-4 h-4"
            />
          </button>

          {/* rating */}
          {properties?.should_show_rating && (
            <div className=" absolute bottom-2 left-2 bg-gray-50 p-1 rounded-md flex items-center gap-1.5">
              <span className="text-sm  text-gray-600">{product.rating}</span>
              <img src="/star.png" alt="" />
            </div>
          )}
          {/* Cart Button - positioned on image container */}
          {/* this button should be conditionally rendered based on `properties.has_cart_btn` but since the api either returns `false` or doesn't include this property at all i'm rendering it anyway to implement the cart functionality. */}
          <button
            className="absolute bottom-2 right-2 w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center z-10 transition-colors duration-200 shadow-lg cursor-pointer"
            onClick={handleAddToCart}
          >
            <img
              src="/shopping-cart.png"
              alt="shopping-cart"
              className="w-4 h-4"
            />
          </button>

          <div className="hidden w-full h-full bg-gray-200 rounded items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        </div>
      )}

      {/* Product Content */}
      <div dir="rtl" className="p-4 flex flex-col flex-grow relative">
        <h2 className="text-sm sm:text-base text-gray-800 mb-2 line-clamp-2">
          <span className="font-bold">{product.brand}</span> {product.title}
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed flex-grow line-clamp-3">
          {product.description}
        </p>

        <h4 className="inline-flex text-black text-sm md:text-lg font-semibold">
          {product.price.currency} {formatPrice(product.price.value)}
        </h4>
        {parsePrice(product.price.value) !==
          parsePrice(product.price.original_value) && (
          <h5 className="inline-flex text-gray-400 font-bold text-xs md:text-sm line-through">
            {product.price.currency} {formatPrice(product.price.original_value)}
          </h5>
        )}

        {/* colors */}
        {product.colors &&
          Array.isArray(product.colors) &&
          product.colors.length > 0 && (
            <div className="absolute bottom-2 bg-white flex flex-col left-2 transform -translate-x-1/2  gap-1 z-10">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full shadow-sm cursor-pointer"
                  style={{ backgroundColor: color }}
                  title={`Color: ${color}`}
                />
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
