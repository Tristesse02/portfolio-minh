"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  ArrowLeft,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface ArticleContent {
  id: string;
  title: string;
  category: "about" | "projects" | "experience";
  description: string;
  fullContent: {
    introduction: string;
    sections: {
      title: string;
      content: string;
      image?: string;
    }[];
    conclusion: string;
    technologies?: string[];
    links?: {
      github?: string;
      demo?: string;
      website?: string;
    };
  };
  audioUrl: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

export const articleData: Record<string, ArticleContent> = {
  "about-me": {
    id: "about-me",
    title: "About me",
    category: "about",
    description:
      "Passionate full-stack developer with a love for creating innovative solutions.",
    fullContent: {
      introduction:
        "Welcome to my world of code and creativity! I'm a passionate full-stack developer who believes in the power of technology to transform ideas into reality.",
      sections: [
        {
          title: "My Journey",
          content:
            "My coding journey started in college when I wrote my first 'Hello World' program. What began as curiosity quickly evolved into a deep passion for problem-solving and building digital experiences that matter.",
          image: "/placeholder.svg?height=300&width=500",
        },
        {
          title: "Philosophy",
          content:
            "I believe that great software is not just about clean code, but about understanding user needs and creating solutions that are both functional and delightful. Every line of code I write is an opportunity to make someone's day a little better.",
        },
        {
          title: "Beyond Code",
          content:
            "When I'm not coding, you'll find me exploring new music genres, hiking mountain trails, or experimenting with photography. I believe that diverse experiences fuel creativity and make me a better developer.",
          image: "/placeholder.svg?height=300&width=500",
        },
      ],
      conclusion:
        "I'm always excited to take on new challenges and collaborate with like-minded individuals who share a passion for innovation and excellence.",
      technologies: [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Python",
        "AWS",
      ],
    },
    audioUrl: "/placeholder-audio.mp3",
    imageUrl: "/placeholder.svg?height=400&width=600",
    likes: 124,
    comments: 23,
  },
  "web-dev": {
    id: "web-dev",
    title: "E-Commerce Platform",
    category: "projects",
    description:
      "Full-stack e-commerce platform with React, Node.js, and PostgreSQL.",
    fullContent: {
      introduction:
        "This project was born out of a need to create a scalable, user-friendly e-commerce solution that could handle high traffic while providing an exceptional shopping experience.",
      sections: [
        {
          title: "The Challenge",
          content:
            "The client needed a platform that could handle 10,000+ concurrent users during peak shopping seasons while maintaining fast load times and a smooth checkout process.",
          image: "/placeholder.svg?height=300&width=500",
        },
        {
          title: "Technical Architecture",
          content:
            "I designed a microservices architecture using React for the frontend, Node.js with Express for the API layer, and PostgreSQL for data persistence. Redis was implemented for caching and session management.",
          image: "/placeholder.svg?height=300&width=500",
        },
        {
          title: "Key Features",
          content:
            "The platform includes real-time inventory management, advanced search with filters, personalized recommendations, secure payment processing with Stripe, and an admin dashboard for analytics.",
        },
        {
          title: "Performance Optimization",
          content:
            "Implemented lazy loading, image optimization, database indexing, and CDN integration. The result was a 40% improvement in page load times and 99.9% uptime.",
          image: "/placeholder.svg?height=300&width=500",
        },
      ],
      conclusion:
        "This project taught me the importance of scalable architecture and user-centered design. The platform now serves thousands of customers daily and has processed over $2M in transactions.",
      technologies: [
        "React",
        "Node.js",
        "PostgreSQL",
        "Redis",
        "Stripe",
        "AWS",
        "Docker",
      ],
      links: {
        github: "https://github.com/your-username/ecommerce-platform",
        demo: "https://demo.yourproject.com",
      },
    },
    audioUrl: "/placeholder-audio.mp3",
    imageUrl: "/placeholder.svg?height=400&width=600",
    likes: 178,
    comments: 38,
  },
  meta: {
    id: "meta",
    title: "Software Engineer Intern at Meta",
    category: "experience",
    description:
      "Worked on React Native components for Instagram, improving user engagement by 15%.",
    fullContent: {
      introduction:
        "My internship at Meta was a transformative experience where I contributed to one of the world's most popular social media platforms, reaching billions of users globally.",
      sections: [
        {
          title: "The Team",
          content:
            "I joined the Instagram Mobile team, working alongside senior engineers, designers, and product managers to enhance the user experience for Instagram's mobile app.",
          image: "/placeholder.svg?height=300&width=500",
        },
        {
          title: "Project: Enhanced Story Features",
          content:
            "My main project involved developing new React Native components for Instagram Stories, focusing on improving user engagement and content creation tools.",
        },
        {
          title: "Technical Implementation",
          content:
            "I built reusable components using React Native, implemented smooth animations with Reanimated, and optimized performance for both iOS and Android platforms.",
          image: "/placeholder.svg?height=300&width=500",
        },
        {
          title: "Impact & Results",
          content:
            "The features I developed led to a 15% increase in user engagement with Stories and were rolled out to over 100 million users during my internship.",
        },
        {
          title: "Learning & Growth",
          content:
            "Working at Meta taught me about large-scale system design, A/B testing, and the importance of data-driven decision making in product development.",
          image: "/placeholder.svg?height=300&width=500",
        },
      ],
      conclusion:
        "This experience solidified my passion for mobile development and taught me how to build products that impact millions of users worldwide.",
      technologies: [
        "React Native",
        "JavaScript",
        "iOS",
        "Android",
        "GraphQL",
        "Relay",
      ],
    },
    audioUrl: "/placeholder-audio.mp3",
    imageUrl: "/placeholder.svg?height=400&width=600",
    likes: 312,
    comments: 67,
  },
};

const sampleObject: ArticleContent = {
  id: "",
  title: "",
  category: "experience",
  description: "",
  fullContent: {
    introduction: "",
    sections: [
      {
        title: "",
        content: "",
        image: undefined,
      },
    ],
    conclusion: "",
    technologies: [],
    links: {
      github: "",
      demo: "",
      website: "",
    },
  },
  audioUrl: "",
  imageUrl: "",
  likes: 0,
  comments: 0,
};

export default function ArticleClient({
  params,
}: {
  params: { value: string };
}) {
  const searchParams = useSearchParams();
  const [isPlaying, setIsPlaying] = useState(
    searchParams.get("playing") === "true"
  );
  const [article, setArticle] = useState(sampleObject);
  const [currentTime, setCurrentTime] = useState(
    Number.parseInt(searchParams.get("time") || "0")
  );
  const [duration, setDuration] = useState(180);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    function loadArticle() {
      const resolvedParams = params;
      console.log("Received ID:", params);
      const parsed = JSON.parse(resolvedParams.value);
      const value = articleData[parsed.id];
      setArticle(value);
    }

    loadArticle();
  }, [params]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MV</span>
            </div>
            <span className="font-semibold">Minh Vu</span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium capitalize">
              {article.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">{article.description}</p>

          <Image
            src={article.imageUrl || "/placeholder.svg"}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Article Body */}
        <article className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {article.fullContent.introduction}
          </p>

          {article.fullContent.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {section.content}
              </p>
              {section.image && (
                <Image
                  src={section.image || "/placeholder.svg"}
                  alt={section.title}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
                />
              )}
            </div>
          ))}

          {article.fullContent.technologies && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {article.fullContent.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {article.fullContent.links && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Links</h2>
              <div className="flex gap-4">
                {article.fullContent.links.github && (
                  <Button asChild>
                    <a
                      href={article.fullContent.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on GitHub
                    </a>
                  </Button>
                )}
                {article.fullContent.links.demo && (
                  <Button variant="outline" asChild>
                    <a
                      href={article.fullContent.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              {article.fullContent.conclusion}
            </p>
          </div>
        </article>

        {/* Engagement Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button variant="ghost" className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>{article.likes} likes</span>
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>{article.comments} comments</span>
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <Share className="w-5 h-5" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Music Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Image
                src={article.imageUrl || "/placeholder.svg"}
                alt={article.title}
                width={48}
                height={48}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold text-sm">{article.title}</h4>
                <p className="text-xs text-gray-600">Now Playing</p>
              </div>
            </div>

            <div className="flex-1 flex items-center gap-4">
              <Button
                onClick={togglePlay}
                size="sm"
                className="w-8 h-8 rounded-full"
              >
                {isPlaying ? (
                  <Pause className="w-3 h-3" />
                ) : (
                  <Play className="w-3 h-3 ml-0.5" />
                )}
              </Button>

              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-purple-600 h-1 rounded-full transition-all duration-1000"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              </div>

              <span className="text-xs text-gray-600">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={article.audioUrl} preload="metadata" />
    </div>
  );
}
