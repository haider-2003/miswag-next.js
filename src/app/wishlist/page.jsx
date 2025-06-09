"use client";

import EmptyWishlist from "@/components/EmptyWishlist";
import WishlistItem from "@/components/WishlistItem";
import { useWishlistStore } from "@/store/wishList";

export default function WishlistPage() {
  const { wishlist, isInWishlist, toggleWishlist } = useWishlistStore();

  if (wishlist.length === 0) return <EmptyWishlist />;

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
            className="object-cover object-center w-8 h-8 rounded-full m-2"
          />
        </div>
        <h1 className="text-xl p-4">قائمة المفضلة</h1>
      </div>
      <div className="w-full bg-white">
        {wishlist.map((item) => (
          <WishlistItem
            key={item.id}
            item={item}
            inWishlist={isInWishlist(item.id)}
            toggleWishlist={toggleWishlist}
          />
        ))}
      </div>
    </div>
  );
}
