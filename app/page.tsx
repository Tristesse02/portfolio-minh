// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Play, Pause, Heart, MessageCircle, Share } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import Image from "next/image";

// interface ContentItem {
//   id: string;
//   title: string;
//   category: "about" | "projects" | "experience";
//   description: string;
//   audioUrl: string;
//   imageUrl: string;
//   likes: number;
//   comments: number;
// }

// interface Testimonial {
//   name: string;
//   role: string;
//   company: string;
//   message: string;
//   avatar: string;
// }

// const contentItems: ContentItem[] = [
//   {
//     id: "about-me",
//     title: "About me",
//     category: "about",
//     description:
//       "Passionate full-stack developer with a love for creating innovative solutions. I enjoy turning complex problems into simple, beautiful designs.",
//     audioUrl: "/placeholder-audio.mp3",
//     imageUrl: "/placeholder.svg?height=400&width=600",
//     likes: 124,
//     comments: 23,
//   },
//   {
//     id: "free-time",
//     title: "My Free Time",
//     category: "about",
//     description:
//       "When I'm not coding, you'll find me exploring new music, hiking trails, or experimenting with photography. I believe in work-life balance.",
//     audioUrl: "/placeholder-audio.mp3",
//     imageUrl: "/placeholder.svg?height=400&width=600",
//     likes: 89,
//     comments: 15,
//   },
//   {
//     id: "umass",
//     title: "My Time at UMass",
//     category: "about",
//     description:
//       "Computer Science graduate from UMass Amherst. Active in hackathons, coding competitions, and tech communities.",
//     audioUrl: "/placeholder-audio.mp3",
//     imageUrl: "/placeholder.svg?height=400&width=600",
//     likes: 156,
//     comments: 31,
//   },
//   {
//     id: "operating-system",
//     title: "Operating System",
//     category: "projects",
//     description:
//       "Built a custom operating system kernel with memory management, process scheduling, and file system implementation.",
//     audioUrl: "/placeholder-audio.mp3",
//     imageUrl: "/placeholder.svg?height=400&width=600",
//     likes: 203,
//     comments: 45,
//   },
//   {
//     id: "web-dev",
//     title: "Web Dev",
//     category: "projects",
//     description:
//       "Full-stack e-commerce platform with React, Node.js, and PostgreSQL. Handles 10k+ concurrent users.",
//     audioUrl: "/placeholder-audio.mp3",
//     imageUrl: "/placeholder.svg?height=400&width=600",
//     likes: 178,
//     comments: 38,
//   },
//   {
//     id: "ml-project",
//     title: "ML Project",
//     category: "projects",
//     description:
//       "Machine learning model for predictive analytics using Python, TensorFlow, and deployed on AWS.",
//     audioUrl: "/placeholder-audio.mp3",
//     imageUrl: "/placeholder.svg?height=400&width=600",
//     likes: 234,
//     comments: 52,
//   },
//   {
//     id: "meta",
//     title: "Meta",
//     category: "experience",
//     description:
//       "Software Engineer Intern - Worked on React Native components for Instagram, improving user engagement by 15%.",
//     audioUrl: "/placeholder-audio.mp3",
//     imageUrl: "/placeholder.svg?height=400&width=600",
//     likes: 312,
//     comments: 67,
//   },
//   {
//     id: "google",
//     title: "Google",
//     category: "experience",
//     description:
//       "Frontend Developer - Contributed to Google Cloud Console, optimizing performance and user experience.",
//     audioUrl: "/placeholder-audio.mp3",
//     imageUrl: "/placeholder.svg?height=400&width=600",
//     likes: 289,
//     comments: 54,
//   },
//   {
//     id: "amazon",
//     title: "Amazon",
//     category: "experience",
//     description:
//       "Full Stack Developer - Built internal tools for AWS team, reducing deployment time by 40%.",
//     audioUrl: "/placeholder-audio.mp3",
//     imageUrl: "/placeholder.svg?height=400&width=600",
//     likes: 267,
//     comments: 43,
//   },
// ];

// const testimonials: Testimonial[] = [
//   {
//     name: "Bao Dang",
//     role: "Software Engineer",
//     company: "Google",
//     message: "Minh is a really passionate person when it comes to his job list",
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     name: "Nina Vo",
//     role: "Software Engineer",
//     company: "Meta",
//     message: "Minh is a really passionate person when it comes to his job list",
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     name: "ZipZop",
//     role: "Software Engineer",
//     company: "Nvidia",
//     message: "Minh is a really passionate person when it comes to his job list",
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
// ];

// export default function SocialMusicPortfolio() {
//   const [activeTab, setActiveTab] = useState<
//     "about" | "projects" | "experience"
//   >("about");
//   const [currentContent, setCurrentContent] = useState<ContentItem>(
//     contentItems[0]
//   );
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(180); // 3 minutes placeholder
//   const audioRef = useRef<HTMLAudioElement>(null);

//   const filteredContent = contentItems.filter(
//     (item) => item.category === activeTab
//   );

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//     // Audio logic would go here
//   };

//   const playContent = (content: ContentItem) => {
//     setCurrentContent(content);
//     setIsPlaying(true);
//     setCurrentTime(0);
//   };

//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//   };

//   useEffect(() => {
//     if (isPlaying) {
//       const interval = setInterval(() => {
//         setCurrentTime((prev) => {
//           if (prev >= duration) {
//             setIsPlaying(false);
//             return 0;
//           }
//           return prev + 1;
//         });
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [isPlaying, duration]);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 px-4 py-3">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-sm">MV</span>
//             </div>
//             <span className="font-semibold text-lg">Minh Vu</span>
//           </div>

//           <nav className="flex gap-8">
//             <button
//               onClick={() => setActiveTab("about")}
//               className={`font-medium ${
//                 activeTab === "about"
//                   ? "text-purple-600 border-b-2 border-purple-600"
//                   : "text-gray-600"
//               }`}
//             >
//               About Me
//             </button>
//             <button
//               onClick={() => setActiveTab("projects")}
//               className={`font-medium ${
//                 activeTab === "projects"
//                   ? "text-purple-600 border-b-2 border-purple-600"
//                   : "text-gray-600"
//               }`}
//             >
//               Projects
//             </button>
//             <button
//               onClick={() => setActiveTab("experience")}
//               className={`font-medium ${
//                 activeTab === "experience"
//                   ? "text-purple-600 border-b-2 border-purple-600"
//                   : "text-gray-600"
//               }`}
//             >
//               Work Experiences
//             </button>
//           </nav>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-6">
//         {/* Left Sidebar */}
//         <div className="col-span-3 space-y-4">
//           <Card className="p-4">
//             <div className="text-center">
//               <Avatar className="w-20 h-20 mx-auto mb-3">
//                 <AvatarImage src="/placeholder.svg?height=80&width=80" />
//                 <AvatarFallback>MV</AvatarFallback>
//               </Avatar>
//               <h3 className="font-semibold">Minh Vu</h3>
//               <p className="text-sm text-gray-600">Full Stack Developer</p>
//             </div>

//             <div className="flex justify-center gap-4 mt-4">
//               <Button variant="ghost" size="sm" asChild>
//                 <a
//                   href="https://linkedin.com/in/your-profile"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <svg
//                     className="w-4 h-4"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//                   </svg>
//                 </a>
//               </Button>
//               <Button variant="ghost" size="sm" asChild>
//                 <a
//                   href="https://github.com/your-username"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <svg
//                     className="w-4 h-4"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
//                   </svg>
//                 </a>
//               </Button>
//               <Button variant="ghost" size="sm" asChild>
//                 <a
//                   href="https://leetcode.com/your-username"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <svg
//                     className="w-4 h-4"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
//                   </svg>
//                 </a>
//               </Button>
//               <Button variant="ghost" size="sm">
//                 <MessageCircle className="w-4 h-4" />
//               </Button>
//               <Button variant="ghost" size="sm">
//                 <Share className="w-4 h-4" />
//               </Button>
//             </div>
//           </Card>
//         </div>

//         {/* Main Content */}
//         <div className="col-span-6">
//           {/* Media Player */}
//           <Card className="mb-6 overflow-hidden">
//             <div className="relative">
//               <Image
//                 src={currentContent.imageUrl || "/placeholder.svg"}
//                 alt={currentContent.title}
//                 width={600}
//                 height={400}
//                 className="w-full h-80 object-cover"
//               />

//               {/* Media Controls Overlay */}
//               <div className="absolute bottom-4 left-4 right-4">
//                 <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 opacity-30 hover:opacity-100 transition-opacity duration-300">
//                   <div className="flex items-center gap-4 mb-2">
//                     <Button
//                       onClick={togglePlay}
//                       size="sm"
//                       className="w-10 h-10 rounded-full bg-white text-black hover:bg-white/90"
//                     >
//                       {isPlaying ? (
//                         <Pause className="w-4 h-4" />
//                       ) : (
//                         <Play className="w-4 h-4 ml-0.5" />
//                       )}
//                     </Button>

//                     <div className="flex-1">
//                       <div className="w-full bg-white/20 rounded-full h-1">
//                         <div
//                           className="bg-white h-1 rounded-full transition-all duration-1000"
//                           style={{
//                             width: `${(currentTime / duration) * 100}%`,
//                           }}
//                         />
//                       </div>
//                     </div>

//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       className="text-white hover:bg-white/20"
//                     >
//                       <Heart className="w-4 h-4" />
//                     </Button>

//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       className="text-white hover:bg-white/20"
//                       onClick={() =>
//                         (window.location.href = `/article/${currentContent.id}?playing=${isPlaying}&time=${currentTime}`)
//                       }
//                     >
//                       <svg
//                         className="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                         />
//                       </svg>
//                     </Button>

//                     <span className="text-white text-sm">
//                       {formatTime(currentTime)} / {formatTime(duration)}
//                     </span>
//                   </div>

//                   <div className="text-white">
//                     <h3 className="font-semibold">{currentContent.title}</h3>
//                     <p className="text-sm text-white/80">Now Playing</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Card>

//           {/* Content Sections */}
//           <div className="space-y-6">
//             <div>
//               <h2 className="text-xl font-bold mb-4 capitalize">
//                 {activeTab === "about" ? "Get to know me" : activeTab}
//               </h2>

//               <div className="space-y-3">
//                 {filteredContent.map((item) => (
//                   <Card
//                     key={item.id}
//                     className={`p-4 cursor-pointer transition-all hover:shadow-md ${
//                       currentContent.id === item.id
//                         ? "ring-2 ring-purple-500"
//                         : ""
//                     }`}
//                     onClick={() => playContent(item)}
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="w-3 h-3 bg-green-400 rounded-full" />
//                       <span className="font-medium">{item.title}</span>
//                       <div className="ml-auto flex items-center gap-4 text-sm text-gray-500">
//                         <span className="flex items-center gap-1">
//                           <Heart className="w-4 h-4" />
//                           {item.likes}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <MessageCircle className="w-4 h-4" />
//                           {item.comments}
//                         </span>
//                       </div>
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="col-span-3 space-y-4">
//           {/* Description */}
//           <Card className="p-4 bg-pink-100">
//             <h3 className="font-bold text-lg mb-2">
//               Full Description of the projects/work experiences goes here!
//             </h3>
//             <p className="text-gray-700 mb-4">{currentContent.description}</p>
//             <p className="text-gray-600">Lorem Ipsum</p>
//           </Card>

//           {/* Engagement */}
//           <Card className="p-4">
//             <div className="flex justify-center gap-8 text-center">
//               <div>
//                 <div className="font-bold text-lg">{currentContent.likes}</div>
//                 <div className="text-sm text-gray-600">likes</div>
//               </div>
//               <div>
//                 <div className="font-bold text-lg">
//                   {currentContent.comments}
//                 </div>
//                 <div className="text-sm text-gray-600">replays</div>
//               </div>
//             </div>
//           </Card>

//           {/* Testimonials */}
//           <Card className="p-4">
//             <h3 className="font-bold mb-4">What people think about me</h3>
//             <div className="space-y-3">
//               {testimonials.map((testimonial, index) => (
//                 <div key={index} className="bg-gray-100 rounded-lg p-3">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Avatar className="w-8 h-8">
//                       <AvatarImage
//                         src={testimonial.avatar || "/placeholder.svg"}
//                       />
//                       <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <div className="font-semibold text-sm">
//                         {testimonial.name}
//                       </div>
//                       <div className="text-xs text-gray-600">
//                         {testimonial.role} {testimonial.company}
//                       </div>
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-700">{testimonial.message}</p>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* Hidden Audio Element */}
//       <audio ref={audioRef} src={currentContent.audioUrl} preload="metadata" />
//     </div>
//   );
// }

import SocialMusicPortfolio from "../components/SocialMusicPortfolio";

export default function HomePage() {
  return <SocialMusicPortfolio />;
}
