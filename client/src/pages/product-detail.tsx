import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Heart, Share2, ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", id],
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} ${product.name} added to your cart.`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 bg-cream">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-cream">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/products">
            <Button variant="ghost" className="mb-8" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Collection
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            
            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {product.tags?.map((tag) => (
                <Badge key={tag} className="text-xs font-semibold uppercase">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-lg p-8 shadow-lg"
          >
            <h1 className="font-playfair text-4xl font-bold mb-4 text-elegant-dark" data-testid="text-product-name">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-luxury-gold">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${
                      i < Math.floor(parseFloat(product.rating || "0")) 
                        ? "fill-current" 
                        : "text-gray-300"
                    }`} 
                  />
                ))}
              </div>
              <span className="text-gray-600" data-testid="text-product-rating">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-luxury-gold mb-6" data-testid="text-product-price">
              ${product.price}
            </div>

            {/* Description */}
            <p className="text-gray-700 text-lg leading-relaxed mb-6" data-testid="text-product-description">
              {product.description}
            </p>

            <Separator className="my-6" />

            {/* Ingredients */}
            {product.ingredients && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Key Notes</h3>
                <p className="text-gray-600">{product.ingredients}</p>
              </div>
            )}

            <Separator className="my-6" />

            {/* Quantity & Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    data-testid="button-decrease-quantity"
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold" data-testid="text-quantity">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    data-testid="button-increase-quantity"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-luxury-gold hover:bg-yellow-600 text-white py-6 text-lg font-semibold"
                  onClick={handleAddToCart}
                  data-testid="button-add-to-cart"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>

                <Button variant="outline" size="icon" className="py-6" data-testid="button-wishlist">
                  <Heart className="h-5 w-5" />
                </Button>

                <Button variant="outline" size="icon" className="py-6" data-testid="button-share">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-8 space-y-4 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Category:</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Stock Status:</span>
                <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>SKU:</span>
                <span>{product.id.slice(0, 8).toUpperCase()}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <motion.section
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="font-playfair text-3xl font-bold mb-8 text-center text-elegant-dark">
            You May Also Like
          </h2>
          
          <div className="text-center">
            <Link href="/products">
              <Button variant="outline" data-testid="button-view-more-products">
                View More Products
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
