import { createContext, useContext, useReducer, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { CartItem, Product } from "@shared/schema";

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartState {
  items: CartItem[];
  products: { [key: string]: Product };
}

type CartAction =
  | { type: "SET_ITEMS"; items: CartItem[] }
  | { type: "SET_PRODUCTS"; products: Product[] }
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; itemId: string }
  | { type: "UPDATE_ITEM"; itemId: string; quantity: number }
  | { type: "CLEAR_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.items };
    case "SET_PRODUCTS":
      const productsMap = action.products.reduce((acc, product) => {
        acc[product.id] = product;
        return acc;
      }, {} as { [key: string]: Product });
      return { ...state, products: productsMap };
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.item] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.itemId),
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.itemId ? { ...item, quantity: action.quantity } : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

function getSessionId(): string {
  let sessionId = localStorage.getItem("cart-session-id");
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("cart-session-id", sessionId);
  }
  return sessionId;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    products: {},
  });

  const queryClient = useQueryClient();
  const sessionId = getSessionId();

  // Fetch cart items
  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["/api/cart", sessionId],
    enabled: !!sessionId,
  });

  // Fetch products for cart items
  const { data: products = [] } = useQuery({
    queryKey: ["/api/products"],
  });

  useEffect(() => {
    dispatch({ type: "SET_ITEMS", items: cartItems });
  }, [cartItems]);

  useEffect(() => {
    dispatch({ type: "SET_PRODUCTS", products });
  }, [products]);

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
      const response = await apiRequest("POST", "/api/cart", {
        sessionId,
        productId,
        quantity,
      });
      return response.json();
    },
    onSuccess: (newItem) => {
      dispatch({ type: "ADD_ITEM", item: newItem });
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (itemId: string) => {
      await apiRequest("DELETE", `/api/cart/${itemId}`);
    },
    onSuccess: (_, itemId) => {
      dispatch({ type: "REMOVE_ITEM", itemId });
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  // Update quantity mutation
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      const response = await apiRequest("PUT", `/api/cart/${itemId}`, { quantity });
      return response.json();
    },
    onSuccess: (_, { itemId, quantity }) => {
      dispatch({ type: "UPDATE_ITEM", itemId, quantity });
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/cart/session/${sessionId}`);
    },
    onSuccess: () => {
      dispatch({ type: "CLEAR_CART" });
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => {
    const product = state.products[item.productId];
    return sum + (product ? parseFloat(product.price) * item.quantity : 0);
  }, 0);

  const value: CartContextType = {
    items: state.items,
    addToCart: (productId, quantity) => addToCartMutation.mutate({ productId, quantity }),
    removeFromCart: (itemId) => removeFromCartMutation.mutate(itemId),
    updateQuantity: (itemId, quantity) => updateQuantityMutation.mutate({ itemId, quantity }),
    clearCart: () => clearCartMutation.mutate(),
    totalItems,
    totalPrice,
    isLoading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
