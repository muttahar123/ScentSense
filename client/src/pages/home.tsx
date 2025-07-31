import HeroSection from "@/components/hero-section";
import ProductCard from "@/components/product-card";
import ParallaxSection from "@/components/parallax-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Leaf, Award, FlaskConical, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Product, BlogPost } from "@shared/schema";

export default function Home() {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    queryFn: async () => {
      const response = await fetch("/api/blog?published=true");
      return response.json();
    },
  });

  const featuredProducts = products.slice(0, 3);
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Collection */}
      <section id="featured-collection" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-5xl font-bold mb-6 text-elegant-dark">
              Featured Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most coveted fragrances, each one a masterpiece of olfactory artistry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link href="/products">
              <Button className="bg-elegant-dark hover:bg-luxury-gold text-white px-12 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105" data-testid="button-view-all-products">
                VIEW ALL PRODUCTS
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section with Parallax */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
        className="py-20"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair text-5xl font-bold mb-8 text-elegant-dark">
                Crafted with
                <span className="text-luxury-gold block">Passion</span>
              </h2>
              <p className="text-xl mb-6 leading-relaxed text-gray-700">
                For over three decades, we have been dedicated to creating exceptional fragrances that capture the essence of luxury and sophistication. Each perfume in our collection is meticulously crafted using the finest natural ingredients sourced from the most renowned perfume regions of the world.
              </p>
              <p className="text-lg mb-8 leading-relaxed text-gray-600">
                Our master perfumers blend traditional techniques with innovative approaches, ensuring every fragrance tells a unique story and evokes powerful emotions.
              </p>
              <Button className="bg-luxury-gold hover:bg-yellow-600 text-white px-8 py-4 font-semibold transition-all duration-300" data-testid="button-discover-story">
                DISCOVER OUR STORY
              </Button>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="text-center p-6 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <Leaf className="h-12 w-12 text-luxury-gold mx-auto mb-4" />
                  <h3 className="font-playfair text-xl font-semibold mb-2">Natural Ingredients</h3>
                  <p className="text-gray-600">Sourced from the finest botanical gardens worldwide</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 bg-white/80 backdrop-blur-sm mt-8">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 text-luxury-gold mx-auto mb-4" />
                  <h3 className="font-playfair text-xl font-semibold mb-2">Award Winning</h3>
                  <p className="text-gray-600">Recognized by international fragrance institutes</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <FlaskConical className="h-12 w-12 text-luxury-gold mx-auto mb-4" />
                  <h3 className="font-playfair text-xl font-semibold mb-2">Master Crafted</h3>
                  <p className="text-gray-600">Created by renowned perfumers with decades of experience</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 bg-white/80 backdrop-blur-sm mt-8">
                <CardContent className="pt-6">
                  <Heart className="h-12 w-12 text-luxury-gold mx-auto mb-4" />
                  <h3 className="font-playfair text-xl font-semibold mb-2">Made with Love</h3>
                  <p className="text-gray-600">Every bottle crafted with passion and attention to detail</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>

      {/* Blog Preview Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-5xl font-bold mb-6 text-elegant-dark">
              Fragrance Journal
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the world of perfumery through our curated articles and insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6">
                  <div className="text-luxury-gold text-sm font-semibold mb-2 uppercase">
                    {post.category}
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-3" data-testid={`text-blog-title-${post.id}`}>
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4" data-testid={`text-blog-excerpt-${post.id}`}>
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span data-testid={`text-blog-date-${post.id}`}>
                      {new Date(post.createdAt!).toLocaleDateString()}
                    </span>
                    <Link href={`/blog/${post.slug}`}>
                      <span className="text-luxury-gold hover:underline cursor-pointer flex items-center gap-1">
                        Read More <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link href="/blog">
              <Button className="bg-elegant-dark hover:bg-luxury-gold text-white px-12 py-4 font-semibold transition-all duration-300" data-testid="button-view-all-articles">
                VIEW ALL ARTICLES
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-luxury-gold">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl font-bold mb-6 text-white">
              Stay Enchanted
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to discover new fragrances, exclusive offers, and perfumery insights.
            </p>

            <div className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-white text-elegant-dark placeholder-gray-500"
                  data-testid="input-newsletter-email"
                />
                <Button className="bg-elegant-dark hover:bg-gray-800 text-white px-8 py-2 font-semibold transition-colors duration-300" data-testid="button-subscribe-newsletter">
                  SUBSCRIBE
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
