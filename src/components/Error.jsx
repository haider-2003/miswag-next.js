import Link from "next/link";

export default function Error({ message, showHomeRoute = false }) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div>
        <img
          src="/error.png"
          className="object-contain"
          alt="سلة التسوق فارغة"
          loading="lazy"
        />
      </div>
      <h1 className="text-center text-black text-2xl font-bold mt-4">
        {message ||
          `
        وقع خطأ أثناء تحميل الصفحة، يرجى المحاولة مرة أخرى لاحقًا. إذا استمرت
        المشكلة، يرجى التواصل مع الدعم الفني.
        `}
      </h1>
      {showHomeRoute && (
        <Link
          href="/"
          className="mt-4 text-white bg-red-600 p-4 rounded-md text-lg font-semibold hover:bg-red-700 transition-colors w-[300px] text-center"
        >
          العودة للتسوق
        </Link>
      )}
    </div>
  );
}
