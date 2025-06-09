import { create } from "zustand";
import { persist } from "zustand/middleware";
//zustand is like pinia with little bit diffrnece

export const useWishlistStore = create(
  //persist is just zustand middleare to save to localstorage i tried to simulate
  //miswag.com/cart etc.
  persist(
    (set, get) => ({
      //state
      wishlist: [],

      //actions
      addToWishlist: (product) =>
        set((state) => {
          const isAlreadyInWishlist = state.wishlist.some(
            (item) => item.id === product.id
          );

          if (isAlreadyInWishlist) {
            return state;
          }

          return {
            wishlist: [...state.wishlist, product],
          };
        }),

      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== productId),
        })),

      toggleWishlist: (product) => {
        const { wishlist } = get();
        const isInWishlist = wishlist.some((item) => item.id === product.id);

        if (isInWishlist) {
          get().removeFromWishlist(product.id);
        } else {
          get().addToWishlist(product);
        }
      },

      // check if product is in wishlist
      isInWishlist: (productId) => {
        const { wishlist } = get();
        return wishlist.some((item) => item.id === productId);
      },

      getWishlistCount: () => get().wishlist.length,

      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: "wishlist-storage",
    }
  )
);
