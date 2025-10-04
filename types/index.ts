export interface ContentItem {
  id: string;
  title?: string;
  altTitle?: string;
  category?: "about" | "projects" | "experience";
  tags?: string[];
  description?: string;
  audioUrl?: string;
  imageUrl?: string;
  likes?: number;
  comments?: number;
  percentage?: number;
  readTime?: number;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  message: string;
  avatar: string;
}
