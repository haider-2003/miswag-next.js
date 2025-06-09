import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
      </Link>
    </div>
  );
}
