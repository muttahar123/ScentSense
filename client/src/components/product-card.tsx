import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const getBadgeVariant = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "bestseller":
      case "luxury":
        return "default";
      case "limited":
      case "new":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <Link href={`/products/${product.id}`}>
        <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover-lift">
          <div className="relative overflow-hidden bg-cream">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {product.tags?.map((tag) => (
                <Badge 
                  key={tag}
                  variant={getBadgeVariant(tag)}
                  className="text-xs font-semibold uppercase"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Add to Cart Button */}
            <Button
              size="icon"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white hover:bg-luxury-gold hover:text-white text-elegant-dark rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
              onClick={handleAddToCart}
              data-testid={`button-add-to-cart-${product.id}`}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6">
            <h3 className="font-playfair text-2xl font-semibold mb-2 text-elegant-dark" data-testid={`text-product-name-${product.id}`}>
              {product.name}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2" data-testid={`text-product-description-${product.id}`}>
              {product.description}
            </p>

            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-luxury-gold" data-testid={`text-product-price-${product.id}`}>
                ${product.price}
              </span>
              
              <div className="flex items-center gap-1">
                <div className="flex text-luxury-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(parseFloat(product.rating || "0")) 
                          ? "fill-current" 
                          : "text-gray-300"
                      }`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 text-sm" data-testid={`text-product-rating-${product.id}`}>
                  ({product.rating})
                </span>
              </div>
            </div>

            {/* Ingredients */}
            {product.ingredients && (
              <p className="text-xs text-gray-500 border-t pt-3">
                <span className="font-medium">Key Notes:</span> {product.ingredients}
              </p>
            )}
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
