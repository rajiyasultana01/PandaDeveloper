import { User, Briefcase, FolderOpen, Mail, Github, Linkedin, FileText } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { id: "about", icon: User, label: "About" },
  { id: "projects", icon: FolderOpen, label: "Projects" },
  { id: "blog", icon: FileText, label: "Blog" },
  { id: "experience", icon: Briefcase, label: "Experience" },
  { id: "contact", icon: Mail, label: "Contact" },
];

export const VerticalNavbar = () => {
  const [activeItem, setActiveItem] = useState("about");

  // Scroll spy to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveItem(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed left-0 top-0 h-screen w-20 flex flex-col items-center justify-between bg-background border-r border-border z-50 py-8">
      {/* Main Navigation */}
      <div className="flex-1 flex items-center">
        <ul className="flex flex-col gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative flex items-center justify-center w-12 h-12 transition-smooth ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                  aria-label={item.label}
                >
                  <Icon 
                    className={`w-5 h-5 transition-smooth ${
                      isActive 
                        ? "scale-110" 
                        : "group-hover:scale-105"
                    }`} 
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                  
                  {/* Tooltip */}
                  <span className="absolute left-full ml-4 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Social Media Icons */}
      <div className="flex flex-col gap-4">
        <a
          href="https://github.com/rajiyasultana"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 text-muted-foreground hover:text-foreground transition-smooth"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5 group-hover:scale-105 transition-smooth" />
          <span className="absolute left-full ml-4 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none whitespace-nowrap">
            GitHub
          </span>
        </a>
        
        <a
          href="https://linkedin.com/in/rajiyasultana"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 text-muted-foreground hover:text-foreground transition-smooth"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5 group-hover:scale-105 transition-smooth" />
          <span className="absolute left-full ml-4 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none whitespace-nowrap">
            LinkedIn
          </span>
        </a>
      </div>
    </nav>
  );
};
