import { useEffect, useState } from "react";

interface ParallaxOptions {
  speed?: number;
  offset?: number;
}

export function useParallax({ speed = 0.5, offset = 0 }: ParallaxOptions = {}) {
  const [transform, setTransform] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const translateY = (scrolled * speed) + offset;
      setTransform(`translateY(${translateY}px)`);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, offset]);

  return transform;
}

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      
      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDirection(direction);
      }
      
      setScrollY(scrollY);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [scrollDirection]);

  return { scrollDirection, scrollY };
}
