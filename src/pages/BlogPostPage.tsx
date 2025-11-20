import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import ReactMarkdown from "react-markdown";

export default function BlogPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchBlog();
  }, [id, user, navigate]);

  const fetchBlog = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*, profiles(full_name)")
      .eq("id", id)
      .single();

    if (!error && data) {
      setBlog(data);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground/70 mb-4">Blog post not found</p>
          <Button onClick={() => navigate("/blogs")}>Back to Blogs</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/blogs")} size="sm" className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Button>

        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{blog.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-foreground/60 mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {blog.profiles?.full_name || "Admin"}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {new Date(blog.created_at).toLocaleDateString()}
            </div>
          </div>

          <div className="text-foreground/90 leading-relaxed">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3 text-foreground">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-bold mt-4 mb-2 text-foreground">{children}</h3>,
                p: ({ children }) => <p className="mb-4 text-foreground/80">{children}</p>,
                a: ({ children, href }) => <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                code: ({ children }) => <code className="bg-muted px-1 py-0.5 rounded text-sm">{children}</code>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
