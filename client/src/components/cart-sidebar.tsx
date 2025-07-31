import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const getProduct = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  if (items.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="font-playfair text-2xl">Shopping Cart</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Discover our luxury fragrances and add them to your cart.</p>
            <Link href="/products">
              <Button onClick={onClose} data-testid="button-shop-now">
                Shop Now
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-[400px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-playfair text-2xl">Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            {items.map((item) => {
              const product = getProduct(item.productId);
              if (!product) return null;

              const itemTotal = parseFloat(product.price) * item.quantity;

              return (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm" data-testid={`text-cart-item-name-${item.id}`}>
                      {product.name}
                    </h4>
                    <p className="text-luxury-gold font-bold" data-testid={`text-cart-item-price-${item.id}`}>
                      ${product.price}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        data-testid={`button-decrease-quantity-${item.id}`}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <span className="w-8 text-center" data-testid={`text-cart-item-quantity-${item.id}`}>
                        {item.quantity}
                      </span>
                      
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        data-testid={`button-increase-quantity-${item.id}`}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-gray-500 hover:text-red-500"
                      onClick={() => removeFromCart(item.id)}
                      data-testid={`button-remove-item-${item.id}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold text-sm" data-testid={`text-cart-item-total-${item.id}`}>
                      ${itemTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total ({totalItems} items)</span>
            <span className="text-2xl font-bold text-luxury-gold" data-testid="text-cart-total">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="space-y-2">
            <Link href="/cart">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={onClose}
                data-testid="button-view-cart"
              >
                View Cart
              </Button>
            </Link>
            <Link href="/checkout">
              <Button 
                className="w-full bg-luxury-gold hover:bg-yellow-600" 
                onClick={onClose}
                data-testid="button-checkout"
              >
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
