import portraitImage from "@/assets/portrait.jpg";
import { useState } from "react";

export const PortraitSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen px-12">
      {/* Round Portrait Image */}
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-border">
          <img
            src={portraitImage}
            alt="Rajiya Sultana - AI Engineer"
            className={`w-full h-full object-cover transition-smooth ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          
          {/* Subtle overlay on hover */}
          <div 
            className={`absolute inset-0 bg-foreground/5 transition-smooth ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
};
