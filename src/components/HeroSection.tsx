import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="flex flex-col justify-center h-screen px-12 md:px-20 lg:px-24 max-w-3xl animate-in fade-in duration-700">
      <div className="space-y-8">
        {/* Name */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
          Rajiya Sultana
        </h1>
        
        {/* Introduction */}
        <div className="space-y-4 text-base md:text-lg lg:text-xl text-foreground/80 font-light leading-relaxed">
          <p>Hi there, welcome!</p>
          <p>
            I'm Rajiya Sultana — an <span className="font-medium text-foreground">AI Engineer</span>, 
            <span className="font-medium text-foreground"> Builder</span>, and 
            <span className="font-medium text-foreground"> Curious Problem Solver</span>.
          </p>
          <p>
            I explore real-world challenges and create meaningful, human-centered AI systems.
          </p>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-wrap gap-4 pt-2">
          <Button 
            variant="hero" 
            size="lg" 
            className="group"
          >
            <Download className="w-4 h-4 transition-smooth group-hover:scale-110" />
            Download CV
          </Button>
          
          <Button 
            variant="hero-outline" 
            size="lg"
            className="group"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Projects
            <ArrowRight className="w-4 h-4 transition-smooth group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
