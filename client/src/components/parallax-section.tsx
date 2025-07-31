import { useParallax } from "@/hooks/use-parallax";
import { motion } from "framer-motion";

interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundImage: string;
  className?: string;
  speed?: number;
  overlay?: boolean;
}

export default function ParallaxSection({ 
  children, 
  backgroundImage, 
  className = "",
  speed = -0.5,
  overlay = true 
}: ParallaxSectionProps) {
  const parallaxTransform = useParallax({ speed });

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          transform: parallaxTransform,
        }}
      />
      
      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-white/90" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
