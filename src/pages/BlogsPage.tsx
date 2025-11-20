import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
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

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      setBlogs(data);
    } else {
      // Show placeholder blogs if no real blogs exist
      setBlogs(placeholderBlogs);
    }
    setLoading(false);
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <Button variant="ghost" onClick={() => navigate("/")} size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold text-foreground">All Blog Posts</h1>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-foreground/70 text-lg">Loading blog posts...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="group p-6 border border-border rounded-lg bg-background hover:border-foreground transition-smooth cursor-pointer"
                onClick={() => handleBlogClick(blog)}
              >
                {blog.isPlaceholder && (
                  <span className="px-2 py-1 text-xs rounded-full bg-muted text-foreground/60 mb-3 inline-block">
                    Example Post
                  </span>
                )}
                <h2 className="text-2xl font-semibold text-foreground group-hover:text-foreground mb-3 transition-smooth">
                  {blog.title}
                </h2>
                <p className="text-foreground/70 mb-4 line-clamp-3">{blog.intro}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-foreground/50">
                    <Clock className="w-4 h-4" />
                    {new Date(blog.created_at).toLocaleDateString()}
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2">
                    {blog.isPlaceholder ? "Login to Read" : user ? "Read More" : "Login to Read"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
