import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/RichTextEditor";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  intro: z.string().min(1, "Intro is required").max(500),
  content: z.string().min(1, "Content is required").max(50000),
});

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [blogs, setBlogs] = useState<any[]>([]);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!roleLoading && !isAdmin) {
      toast({ title: "Access denied", description: "You need admin privileges", variant: "destructive" });
      navigate("/");
    }
  }, [isAdmin, roleLoading, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchBlogs();
    }
  }, [isAdmin]);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBlogs(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      blogSchema.parse({ title, intro, content });

      if (editingBlog) {
        const { error } = await supabase
          .from("blogs")
          .update({ title, intro, content })
          .eq("id", editingBlog.id);

        if (error) throw error;
        toast({ title: "Blog updated successfully!" });
      } else {
        const { error } = await supabase
          .from("blogs")
          .insert({ title, intro, content, author_id: user?.id });

        if (error) throw error;
        toast({ title: "Blog created successfully!" });
      }

      resetForm();
      fetchBlogs();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setIntro(blog.intro);
    setContent(blog.content);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Blog deleted successfully!" });
      fetchBlogs();
    }
  };

  const togglePublish = async (blog: any) => {
    const { error } = await supabase
      .from("blogs")
      .update({ published: !blog.published })
      .eq("id", blog.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: blog.published ? "Blog unpublished" : "Blog published" });
      fetchBlogs();
    }
  };

  const resetForm = () => {
    setEditingBlog(null);
    setTitle("");
    setIntro("");
    setContent("");
  };

  if (authLoading || roleLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
        </div>

        <div className="bg-muted/30 p-8 rounded-lg border border-border mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="intro">Short Introduction</Label>
              <Textarea
                id="intro"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                placeholder="Brief intro for preview (max 500 characters)"
                className="min-h-[80px]"
                maxLength={500}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Full Content</Label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Write your blog content here... (Markdown supported)"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : editingBlog ? "Update Blog" : "Create Blog"}
              </Button>
              {editingBlog && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">All Blog Posts</h2>
          {blogs.length === 0 ? (
            <p className="text-foreground/70">No blogs yet. Create your first one above!</p>
          ) : (
            <div className="grid gap-4">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="p-6 border border-border rounded-lg bg-background hover:border-foreground transition-smooth"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{blog.title}</h3>
                      <p className="text-foreground/70 text-sm mb-2">{blog.intro}</p>
                      <p className="text-xs text-foreground/50">
                        Created: {new Date(blog.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePublish(blog)}
                        title={blog.published ? "Unpublish" : "Publish"}
                      >
                        {blog.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(blog)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(blog.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        blog.published
                          ? "bg-green-500/20 text-green-300"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
