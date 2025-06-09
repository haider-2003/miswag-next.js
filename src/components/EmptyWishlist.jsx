import Link from "next/link";

export default function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div>
        <img
          src="/empty-wishlist.png"
          className="object-contain"
          alt="المفضلة فارغة"
          loading="lazy"
        />
      </div>
      <h1 className="text-center text-black text-2xl font-bold mt-4">
        لم تقم بأضافة منتجات الى المفضلة
      </h1>
      <Link href="/" className="mt-4 text-white bg-red-600 p-4 rounded-md text-lg font-semibold hover:bg-red-700 transition-colors w-[300px] text-center">
        العودة للتسوق
      </Link>
    </div>
  );
}
