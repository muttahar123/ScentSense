import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-elegant-dark text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-6 text-luxury-gold">
              Aurum Fragrances
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Creating luxury fragrances that tell stories and evoke emotions since 1990.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-luxury-gold transition-colors" data-testid="link-facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-luxury-gold transition-colors" data-testid="link-instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-luxury-gold transition-colors" data-testid="link-twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-luxury-gold transition-colors" data-testid="link-youtube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products">
                  <span className="text-gray-300 hover:text-luxury-gold transition-colors cursor-pointer">
                    Our Collection
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products?category=new">
                  <span className="text-gray-300 hover:text-luxury-gold transition-colors cursor-pointer">
                    New Arrivals
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products?category=bestseller">
                  <span className="text-gray-300 hover:text-luxury-gold transition-colors cursor-pointer">
                    Best Sellers
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="text-gray-300 hover:text-luxury-gold transition-colors cursor-pointer">
                    Blog
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Customer Care</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-1 text-luxury-gold" />
                <span>123 Luxury Avenue<br />New York, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-luxury-gold" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-luxury-gold" />
                <span>hello@aurumfragrances.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2024 Aurum Fragrances. All rights reserved. |{" "}
            <a href="#" className="hover:text-luxury-gold transition-colors">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-luxury-gold transition-colors">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
