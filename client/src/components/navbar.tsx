import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useScrollDirection } from "@/hooks/use-parallax";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onCartClick: () => void;
}

export default function Navbar({ onCartClick }: NavbarProps) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { scrollY } = useScrollDirection();

  const isTransparent = location === "/" && scrollY < 100;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Collection" },
    { href: "/blog", label: "Blog" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500",
      isTransparent 
        ? "bg-transparent" 
        : "bg-white/90 backdrop-blur-xl shadow-2xl border-b border-luxury-gold/20"
    )}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className={cn(
              "text-2xl font-playfair font-bold transition-colors",
              isTransparent ? "text-white" : "text-luxury-gold"
            )}>
              Fragrance
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span className={cn(
                  "hover:text-luxury-gold transition-colors duration-300 cursor-pointer",
                  isTransparent ? "text-white" : "text-elegant-dark",
                  location === item.href && "text-luxury-gold"
                )}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "hover:text-luxury-gold transition-colors",
                isTransparent ? "text-white hover:bg-white/20" : "text-elegant-dark"
              )}
              data-testid="button-search"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "hover:text-luxury-gold transition-colors relative",
                isTransparent ? "text-white hover:bg-white/20" : "text-elegant-dark"
              )}
              onClick={onCartClick}
              data-testid="button-cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-luxury-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" data-testid="text-cart-count">
                  {totalItems}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "hover:text-luxury-gold transition-colors",
                isTransparent ? "text-white hover:bg-white/20" : "text-elegant-dark"
              )}
              data-testid="button-user"
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "md:hidden",
                isTransparent ? "text-white hover:bg-white/20" : "text-elegant-dark"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20">
            <div className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span 
                    className={cn(
                      "block hover:text-luxury-gold transition-colors duration-300 cursor-pointer",
                      isTransparent ? "text-white" : "text-elegant-dark",
                      location === item.href && "text-luxury-gold"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
