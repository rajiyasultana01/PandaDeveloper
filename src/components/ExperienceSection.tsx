const experiences = [
  {
    role: "Senior AI Engineer",
    company: "Tech Innovations Inc.",
    period: "2022 - Present",
    description: "Leading AI/ML initiatives, developing production-ready models, and mentoring junior engineers.",
  },
  {
    role: "AI Engineer",
    company: "DataTech Solutions",
    period: "2020 - 2022",
    description: "Built and deployed machine learning models for various client projects across different industries.",
  },
  {
    role: "Junior Data Scientist",
    company: "StartupX",
    period: "2018 - 2020",
    description: "Worked on data analysis, feature engineering, and prototype development for AI solutions.",
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="min-h-screen flex items-center px-12 md:px-20 lg:px-24 py-20">
      <div className="max-w-4xl w-full space-y-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">Experience</h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="relative pl-8 pb-8 border-l-2 border-border last:pb-0 hover:border-foreground transition-smooth"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-foreground border-2 border-background" />
              
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-foreground">
                  {exp.role}
                </h3>
                
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="font-medium">{exp.company}</span>
                  <span>•</span>
                  <span className="text-sm">{exp.period}</span>
                </div>
                
                <p className="text-foreground/70 leading-relaxed pt-2">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
