import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const placeholderBlogs = [
  {
    id: "placeholder-1",
    title: "Getting Started with AI Engineering",
    intro: "A comprehensive guide to beginning your journey in AI engineering, covering essential skills and tools you need to know.",
    created_at: new Date().toISOString(),
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    title: "Building Scalable ML Systems",
    intro: "Learn the best practices for deploying machine learning models at scale, from development to production.",
    created_at: new Date().toISOString(),
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    title: "The Future of Computer Vision",
    intro: "Exploring the latest advancements in computer vision and their real-world applications across industries.",
    created_at: new Date().toISOString(),
    isPlaceholder: true,
  },
];

export const BlogPreviewSection = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(3);

    if (!error && data && data.length > 0) {
      setBlogs(data);
    } else {
      // Show placeholder blogs if no real blogs exist
      setBlogs(placeholderBlogs);
    }
  };

  const handleBlogClick = (blog: any) => {
    if (blog.isPlaceholder) {
      // Placeholder blogs always require login
      navigate("/auth");
    } else if (!user) {
      navigate("/auth");
    } else {
      navigate(`/blog/${blog.id}`);
    }
  };

  return (
    <section id="blog" className="min-h-screen flex items-center px-12 md:px-20 lg:px-24 py-20 bg-background">
      <div className="max-w-6xl w-full space-y-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">Latest Blog Posts</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="group p-6 border border-border rounded-lg bg-muted/30 hover:border-foreground transition-smooth cursor-pointer space-y-4"
              onClick={() => handleBlogClick(blog)}
            >
              {blog.isPlaceholder && (
                <span className="px-2 py-1 text-xs rounded-full bg-muted text-foreground/60">
                  Example Post
                </span>
              )}
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-foreground transition-smooth">
                    {blog.title}
                  </h3>

                  <p className="text-foreground/70 leading-relaxed line-clamp-3">{blog.intro}</p>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-foreground/50">
                  <Clock className="w-4 h-4" />
                  {new Date(blog.created_at).toLocaleDateString()}
                </div>
                <Button variant="ghost" size="sm" className="gap-2">
                  {blog.isPlaceholder ? "Login to Read" : user ? "Read" : "Login"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="hero-outline"
            size="lg"
            className="gap-2"
            onClick={() => navigate("/blogs")}
          >
            See More Blogs
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
