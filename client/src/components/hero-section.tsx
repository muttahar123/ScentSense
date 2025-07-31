import { Button } from "@/components/ui/button";
import { useParallax } from "@/hooks/use-parallax";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const parallaxTransform = useParallax({ speed: -0.5 });

  const scrollToProducts = () => {
    const element = document.getElementById("featured-collection");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen overflow-hidden" id="home">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
          transform: parallaxTransform,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <motion.div 
          className="max-w-2xl text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="font-playfair text-6xl md:text-7xl font-bold mb-6 leading-tight text-shadow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Discover Your
            <span className="text-luxury-gold block">Signature</span>
            Scent
          </motion.h1>
          
          <motion.p 
            className="text-xl mb-8 leading-relaxed opacity-90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Luxury fragrances crafted with the finest ingredients from around the world. 
            Each bottle tells a story of elegance, sophistication, and timeless beauty.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Button 
              className="bg-luxury-gold hover:bg-yellow-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              onClick={scrollToProducts}
              data-testid="button-explore-collection"
            >
              EXPLORE COLLECTION
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-white hover:bg-white hover:text-elegant-dark text-white px-8 py-4 text-lg font-semibold transition-all duration-300"
              data-testid="button-watch-story"
            >
              WATCH STORY
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
        onClick={scrollToProducts}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        data-testid="button-scroll-indicator"
      >
        <ChevronDown className="h-8 w-8" />
      </motion.div>
    </section>
  );
}
