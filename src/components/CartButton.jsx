"use client";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

export default function CartButton() {
  const { getCartCount } = useCartStore();
  const cartCount = getCartCount();
  return (
    <Link
      href="/cart"
      className="relative p-2 bg-red-50 rounded-lg transition-all duration-200 cursor-pointer"
    >
      <img src="/navbar-cart.png" alt="Cart" />
      <span className="absolute -top-1 left-0 w-4 h-4 bg-red-700 text-white text-xs rounded-full flex items-center justify-center font-bold">
        {cartCount}
      </span>
    </Link>
  );
}
