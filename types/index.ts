export interface ContentItem {
  id: string;
  title: string;
  category: "about" | "projects" | "experience";
  description: string;
  audioUrl: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  message: string;
  avatar: string;
}
