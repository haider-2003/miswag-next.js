"use client";
import CartItem from "@/components/CartItem";
import EmptyCart from "@/components/EmptyCart";
import Loader from "@/components/Loader";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishList";

export default function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const isLoading = useCartStore((state) => state.isLoading);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const handleIncrease = (item) => {
    addToCart({ ...item, quantity: 1 });
  };

  const handleDecrease = (item) => {
    removeFromCart({ ...item, quantity: 1 });
  };

  if (isLoading) return <Loader />;
  if (cartItems.length === 0) return <EmptyCart />;

  return (
    <div
      className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-5xl border mx-auto rounded-md bg-[#F5F5F5] border-gray-100"
      dir="rtl"
    >
      <div className="flex items-center gap-0.5">
        <div>
          <img
            src="/circle_logo.png"
            alt="logo"
            loading="lazy"
            className=" object-cover object-center w-8 h-8 rounded-full m-2"
          />
        </div>
        <h1 className="text-xl p-4">مخازن مسواك</h1>
      </div>
      <div className="w-full bg-white">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            toggleWishlist={toggleWishlist}
            inWishlist={isInWishlist(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
