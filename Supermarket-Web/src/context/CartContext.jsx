import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
const CART_KEY = "supermarketCart";

function loadInitialCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadInitialCart);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.productID === product.productID);
      if (exist) {
        return prev.map((item) =>
          item.productID === product.productID
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productID === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productID === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.productID !== id));
  };

  const clearCart = () => setCart([]);

  // Per-line pricing, accounting for an active promotion percent if present.
  const lineDiscount = (item) =>
    item.promotionPercent ? item.price * (item.promotionPercent / 100) : 0;

  const lineFinalPrice = (item) => item.price - lineDiscount(item);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const totalDiscount = cart.reduce(
    (sum, item) => sum + lineDiscount(item) * item.qty,
    0
  );

  const totalPrice = subtotal - totalDiscount;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
        totalItems,
        subtotal,
        totalDiscount,
        totalPrice,
        lineFinalPrice,
        lineDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);