import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="min-h-screen flex items-center px-12 md:px-20 lg:px-24 py-20 bg-muted/30">
      <div className="max-w-4xl w-full space-y-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">Get In Touch</h2>
        
        <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
          <p>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          
          <p>
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </div>
        
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-foreground" />
            <a 
              href="mailto:rajiya.sultana@example.com" 
              className="text-lg text-foreground hover:underline transition-smooth"
            >
              rajiya.sultana@example.com
            </a>
          </div>
          
          <div className="flex gap-4 pt-4">
            <Button variant="outline" size="lg" className="gap-2">
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </Button>
            
            <Button variant="outline" size="lg" className="gap-2">
              <Github className="w-5 h-5" />
              GitHub
            </Button>
            
            <Button variant="outline" size="lg" className="gap-2">
              <Twitter className="w-5 h-5" />
              Twitter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
