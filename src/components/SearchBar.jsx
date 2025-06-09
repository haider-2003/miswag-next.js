"use client";

import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault(); // Prevent full page reload

    const formData = new FormData(e.target);
    const product = formData.get("query"); // get the input value

    if (product) {
      // Redirect to URL with ?product=your-query
      router.push(`?product=${encodeURIComponent(product)}`);
    } else {
      // If query is empty, remove the query string entirely
      router.push(window.location.pathname);
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 text-sm"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600 transition-colors">
          <img src="/search-icon.png" alt="Search" className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
