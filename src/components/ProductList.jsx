"use client";

import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useState, useEffect } from "react";
import ProductCell from "./ProductCell";

// i used tanstack virtual to virtualize the product list
// this will help to render only the visible items in the viewport
// and it will virtualize the rows (not each product)
export default function ProductList({ products, properties }) {
  // State to track items per row and in the beginig
  const [itemsPerRow, setItemsPerRow] = useState(5);

  const getItemsPerRow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 5; // pc: 5 cards
      if (window.innerWidth >= 768) return 3; // ipad or tab: 3 cards
      return 2; // Mobile: 2 cards
    }
    return 5;
  };

  // Update items per row on mount and window resize
  useEffect(() => {
    const updateItemsPerRow = () => {
      setItemsPerRow(getItemsPerRow());
    };

    updateItemsPerRow();

    window.addEventListener("resize", updateItemsPerRow);

    // Cleanup
    return () => window.removeEventListener("resize", updateItemsPerRow);
  }, []);

  //how many rows in total
  const rowCount = Math.ceil(products.length / itemsPerRow);

  // Virtualize rows instead of individual items
  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 380, //
    overscan: 10,
  });

  const virtualItems = virtualizer.getVirtualItems();

  if (virtualItems.length === 0) {
    return null;
  }

  return (
    <div
      className="relative px-4 "
      style={{
        height: `${virtualizer.getTotalSize()}px`,
        minHeight: "1px",
      }}
    >
      <div
        className="absolute top-0 left-0 w-full"
        style={{
          transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
        }}
      >
        {virtualItems.map((virtualItem) => {
          const startIndex = virtualItem.index * itemsPerRow;
          const endIndex = Math.min(startIndex + itemsPerRow, products.length);
          const rowProducts = products.slice(startIndex, endIndex);

          return (
            <div
              key={virtualItem.key}
              ref={virtualizer.measureElement}
              data-index={virtualItem.index}
              style={{
                minHeight: `${virtualItem.size}px`,
              }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {rowProducts.map((product, index) => (
                  <ProductCell
                    key={startIndex + index}
                    product={product}
                    properties={properties}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
