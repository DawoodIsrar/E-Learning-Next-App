import { useEffect, useState } from "react";

export function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Check if window is defined (this code is run on the client side)
    if (typeof window !== "undefined") {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      handleResize(); // Set initial width
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return { width };
}
