import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import type { Product } from "@shared/schema";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const getProduct = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 bg-cream">
        <div className="container mx-auto px-6 py-16">
          <motion.div 
            className="text-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="font-playfair text-3xl font-bold mb-4 text-elegant-dark">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Discover our luxury fragrances and add them to your cart.
            </p>
            <Link href="/products">
              <Button className="bg-luxury-gold hover:bg-yellow-600 text-white px-8 py-3" data-testid="button-shop-now">
                Shop Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-cream">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-playfair text-4xl font-bold mb-8 text-elegant-dark">
            Shopping Cart
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => {
              const product = getProduct(item.productId);
              if (!product) return null;

              const itemTotal = parseFloat(product.price) * item.quantity;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <Link href={`/products/${product.id}`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                          />
                        </Link>

                        <div className="flex-1">
                          <Link href={`/products/${product.id}`}>
                            <h3 className="font-playfair text-xl font-semibold mb-2 hover:text-luxury-gold cursor-pointer transition-colors" data-testid={`text-cart-item-name-${item.id}`}>
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-gray-600 mb-2">{product.category}</p>
                          <p className="text-luxury-gold font-bold text-lg" data-testid={`text-cart-item-price-${item.id}`}>
                            ${product.price}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-500 hover:text-red-500"
                            onClick={() => removeFromCart(item.id)}
                            data-testid={`button-remove-item-${item.id}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              data-testid={`button-decrease-quantity-${item.id}`}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <span className="w-12 text-center font-semibold" data-testid={`text-cart-item-quantity-${item.id}`}>
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              data-testid={`button-increase-quantity-${item.id}`}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="font-bold text-lg" data-testid={`text-cart-item-total-${item.id}`}>
                              ${itemTotal.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}

            {/* Clear Cart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: items.length * 0.1 }}
              className="text-center pt-4"
            >
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                data-testid="button-clear-cart"
              >
                Clear Cart
              </Button>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="sticky top-32">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Items ({totalItems})</span>
                  <span data-testid="text-subtotal">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-luxury-gold" data-testid="text-cart-total">
                    ${(totalPrice * 1.08).toFixed(2)}
                  </span>
                </div>

                <div className="space-y-3 pt-4">
                  <Link href="/checkout">
                    <Button className="w-full bg-luxury-gold hover:bg-yellow-600 text-white py-3 text-lg font-semibold" data-testid="button-checkout">
                      Proceed to Checkout
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                  
                  <Link href="/products">
                    <Button variant="outline" className="w-full" data-testid="button-continue-shopping">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Security & Shipping Info */}
                <div className="pt-6 text-xs text-gray-600 space-y-2">
                  <div className="flex items-center gap-2">
                    <span>🔒</span>
                    <span>Secure SSL Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🚚</span>
                    <span>Free shipping on orders over $100</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>↩️</span>
                    <span>30-day return policy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
