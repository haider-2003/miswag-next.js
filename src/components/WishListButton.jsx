"use client";
import { useWishlistStore } from "@/store/wishList";
import Link from "next/link";

export default function WishListButton() {
    
  const { getWishlistCount } = useWishlistStore();
  const wishlistCount = getWishlistCount();
  return (
    <Link
      href="/wishlist"
      className="relative p-2 rounded-lg transition-all duration-200 cursor-pointer"
    >
      <img src="/heart.png" alt="Wishlist" />
      <span className="absolute -top-1 left-0 w-4 h-4 bg-red-700 text-white text-xs rounded-full flex items-center justify-center font-bold">
        {wishlistCount}
      </span>
    </Link>
  );
}
