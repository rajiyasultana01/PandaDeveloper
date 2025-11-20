import { VerticalNavbar } from "@/components/VerticalNavbar";
import { HeroSection } from "@/components/HeroSection";
import { PortraitSection } from "@/components/PortraitSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { BlogPreviewSection } from "@/components/BlogPreviewSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [isCodeMode, setIsCodeMode] = useState(false);

  useEffect(() => {
    if (isCodeMode) {
      document.documentElement.classList.add("code-panda-mode");
    } else {
      document.documentElement.classList.remove("code-panda-mode");
    }
  }, [isCodeMode]);

  return (
    <div className="bg-background transition-all duration-500">
      {/* Vertical Navigation */}
      <VerticalNavbar />
      
      {/* Hero Section - Full screen with split layout */}
      <div className="flex min-h-screen w-full ml-20 relative">
        {/* CodePanda Mode Button - Top Right of Hero */}
        <div className="absolute top-8 right-8 z-50">
          <Button 
            variant={isCodeMode ? "default" : "hero"}
            size="lg"
            onClick={() => setIsCodeMode(!isCodeMode)}
            className="transition-all duration-300"
          >
            <Code className="w-4 h-4" />
            {isCodeMode ? "Exit CodePanda" : "CodePanda"}
          </Button>
        </div>

        {/* Left Side: Hero Content */}
        <div className="flex-1">
          <HeroSection />
        </div>
        
        {/* Right Side: Round Portrait */}
        <div className="hidden lg:flex">
          <PortraitSection />
        </div>
      </div>

      {/* Content Sections */}
      <div className="ml-20">
        <AboutSection />
        <ProjectsSection />
        <BlogPreviewSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
