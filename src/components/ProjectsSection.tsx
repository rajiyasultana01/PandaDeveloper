import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const ProjectsSection = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);

    if (!error && data) {
      setProjects(data);
    }
  };

  return (
    <section id="projects" className="min-h-screen flex items-center px-12 md:px-20 lg:px-24 py-20 bg-muted/30">
      <div className="max-w-6xl w-full space-y-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">Projects</h2>
        
        {projects.length === 0 ? (
          <p className="text-foreground/70">No projects available yet.</p>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={index}
                  className="group p-6 border border-border rounded-lg bg-background hover:border-foreground transition-smooth space-y-4"
                >
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-foreground transition-smooth">
                    {project.title}
                  </h3>
                  
                  <p className="text-foreground/70 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech: string) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 text-xs bg-muted text-foreground rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    {project.github_url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={() => window.open(project.github_url, "_blank")}
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </Button>
                    )}
                    {project.demo_url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={() => window.open(project.demo_url, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                variant="hero-outline"
                size="lg"
                className="gap-2"
                onClick={() => navigate("/projects")}
              >
                See More Projects
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
