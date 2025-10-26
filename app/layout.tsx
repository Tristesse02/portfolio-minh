import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const site = "https://tminhvu.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "Minh Vu — Portfolio",
    template: "%s | Minh Vu",
  },
  description:
    "Minh Vu — Full-stack & AI/ML engineer. Projects, experiences, and resume.",
  alternates: { canonical: site },
  icons: { icon: "/music.svg" },
  openGraph: {
    title: "Minh Vu — Portfolio",
    description:
      "Full-stack & AI/ML engineer. Projects, experiences, and resume.",
    url: site,
    siteName: "Minh Vu — Portfolio",
    images: [{ url: "/image/AboutMe.jpg" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Minh Vu — Portfolio",
    description:
      "Full-stack & AI/ML engineer. Projects, experiences, and resume.",
    images: ["/image/AboutMe.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Global AI-readable entities
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": site + "#me",
    name: "Minh Vu",
    email: "mailto:vtaminh02@gmail.com",
    url: site,
    alumniOf: { "@type": "CollegeOrUniversity", name: "UMass Amherst" },
    sameAs: [
      "https://www.linkedin.com/in/tminhvu/",
      "https://github.com/Tristesse02",
    ],
    jobTitle: ["Full-stack Engineer", "AI/ML Engineer"],
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Minh Vu — Portfolio",
    url: site,
    publisher: { "@id": site + "#me" },
    potentialAction: {
      "@type": "SearchAction",
      target: site + "/?q={query}",
      "query-input": "required name=query",
    },
  };

  return (
    <html lang="en">
      <head>
        <JsonLd json={person} />
        <JsonLd json={webSite} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
