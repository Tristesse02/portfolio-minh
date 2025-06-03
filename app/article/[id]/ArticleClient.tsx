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
import articleData from "../../../data/articleData.json" assert { type: "json" };

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

export default function ArticleClient({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const [isPlaying, setIsPlaying] = useState(
    searchParams.get("playing") === "true"
  );
  const [article, setArticle] = useState(sampleObject);
  const [currentTime, setCurrentTime] = useState(
    Number.parseInt(searchParams.get("time") || "0")
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [duration, setDuration] = useState(180);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    function loadArticle() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resolvedParams: any = params;
      console.log("Received ID:", params);
      const parsed: { id: keyof typeof articleData } = JSON.parse(
        resolvedParams.value
      );
      const value = articleData[parsed.id];
      setArticle(value as ArticleContent);
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
