export const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen flex items-center px-12 md:px-20 lg:px-24 py-20">
      <div className="max-w-4xl space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">About Me</h2>
        
        <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
          <p>
            I'm an AI Engineer passionate about building intelligent systems that solve real-world problems. 
            My work focuses on creating human-centered AI solutions that are both powerful and accessible.
          </p>
          
          <p>
            With a strong foundation in machine learning, natural language processing, and computer vision, 
            I've worked on diverse projects ranging from recommendation systems to predictive analytics platforms.
          </p>
          
          <p>
            When I'm not coding, you'll find me exploring the latest AI research papers, contributing to 
            open-source projects, or sharing knowledge through technical writing and speaking engagements.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
          {["Python", "TensorFlow", "PyTorch", "Machine Learning", "NLP", "Computer Vision", "AWS", "Docker"].map((skill) => (
            <div 
              key={skill}
              className="px-4 py-3 border border-border rounded-lg text-center text-sm font-medium hover:border-foreground transition-smooth"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
