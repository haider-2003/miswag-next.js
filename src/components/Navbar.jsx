import SearchBar from "./SearchBar";
import Logo from "./Logo";
import dynamic from "next/dynamic";


const CartButton = dynamic(() => import("./CartButton"), {
  ssr: false,
});
const WishListButton = dynamic(() => import("./WishListButton"), {
  ssr: false,
});


export default function Navbar() {
  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 space-x-4">
          {/* Left Section - Cart & Wishlist */}
          <div className="flex items-center space-x-3">
            <CartButton />
            <WishListButton />
          </div>

          {/* Middle Section - Search Bar */}
          <div className="flex-1 mx-4">
            <SearchBar />
          </div>

          {/* Right Section - Logo */}
          <Logo />
        </div>
      </div>
    </nav>
  );
}
