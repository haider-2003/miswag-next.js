import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      //these are like states in pinia
      isModalOpen: false,
      selectedProduct: null,

      cartItems: [],

      isLoading: true,

      // Cart actions / just like pinia actions

      setLoading: (loading) => set({ isLoading: loading }),

      openModal: (product) =>
        set({
          isModalOpen: true,
          selectedProduct: product,
        }),

      closeModal: () =>
        set({
          isModalOpen: false,
          selectedProduct: null,
        }),

      addToCart: (product) => {
        const { cartItems } = get();
        const existingItem = cartItems.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            cartItems: cartItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                : item
            ),
          });
        } else {
          set({
            cartItems: [
              ...cartItems,
              { ...product, quantity: product.quantity || 1 },
            ],
          });
        }

        // Close modal after adding
        set({ isModalOpen: false, selectedProduct: null });
      },

      getCartCount: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => total + item.quantity, 0);
      },
      //remove item from cart but check for quantity first if quantity is greater than 1 then just decrease the quantity by 1 otherwise remove the item from the cart
      removeFromCart: (product) => {
        const { cartItems } = get();
        const existingItem = cartItems.find((item) => item.id === product.id);

        if (existingItem) {
          const quantityToRemove = product.quantity || 1;

          if (existingItem.quantity > quantityToRemove) {
            set({
              cartItems: cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity - quantityToRemove }
                  : item
              ),
            });
          } else {
            set({
              cartItems: cartItems.filter((item) => item.id !== product.id),
            });
          }
        }
      },
    }),
    {
      name: "cart-storage",
      onRehydrateStorage: () => (state) => {
        // Set loading to false when rehydration is complete
        if (state) {
          state.setLoading(false);
        }
      },
    }
  )
);
