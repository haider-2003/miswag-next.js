"use client";

import CartModal from "@/components/CartModal";
import Error from "@/components/Error";
import GridBlock from "@/components/GridBlock";
import Loader from "@/components/Loader";
import ProductList from "@/components/ProductList";
import { useItems } from "@/hooks/useItems";
import { useSearchParams } from "next/navigation";

function App() {
  // i tried to simulate Nuxt.js useFetch so i used tanstack-query
  //this component can be server side by attaching aysnc keyword before the function
  //but again, i wanted to simulate Nuxt.js useFetch
  const { blocks, isLoading, error } = useItems();

  //since this is a client component, we can use next/navigation to get the search params if it was server side i would use searchParams props like App({ searchParams })
  const searchParams = useSearchParams();

  // will check if the user has searched for a product
  const query = searchParams.get("product")?.toLowerCase(); // normalize input

  const content = blocks?.content ?? [];

  if (isLoading) return <Loader />;

  if (error) return <Error />;

  // this function little bit complex and need extra work to understand
  // i did it this way because i dont have any endpoint for search from server side
  // like i dont have https://miswag.com/api/search?query=product
  // so i had to filter the products from the client side
  // function will pick only products type object and after picking them it will filter the products based on the query
  const filteredBlocks = query
    ? content.reduce((acc, block) => {
        if (block.type !== "products") return acc;

        const matchedProducts = block.content.filter((product) => {
          return (
            product.title?.toLowerCase().includes(query) ||
            product.brand?.toLowerCase().includes(query)
          );
        });

        if (matchedProducts.length > 0) {
          acc.push({
            ...block,
            content: matchedProducts,
          });
        }

        return acc;
      }, [])
    : content;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="space-y-8">
          {filteredBlocks.map((block, index) => (
            <div key={index} className="w-full">
              {block.type === "products" ? (
                <ProductList
                  products={block.content}
                  properties={block.properties}
                />
              ) : block.type === "grid" ? (
                <div className="pt-3 w-full">
                  <GridBlock
                    content={block.content}
                    properties={block.properties}
                  />
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <p className="text-red-500 text-center text-lg font-medium">
                    Unknown type
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal - placed at the app level */}
      <CartModal />
    </>
  );
}

export default App;
