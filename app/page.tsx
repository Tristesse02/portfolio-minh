import SocialMusicPortfolio from "../components/SocialMusicPortfolio";
import JsonLd from "@/components/JsonLd";
import items from "@/data/contentItems.json";

const site = "https://tminhvu.xyz";

// map your cards to CreativeWork objects
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toCreativeWork(it: any) {
  const url = `${site}#${it.id}`;
  const timeRequired =
    typeof it.readTime === "number"
      ? `PT${Math.round(it.readTime)}M`
      : undefined;

  return {
    "@type": "CreativeWork",
    name: it.title,
    alternateName: it.altTitle,
    description: it.description,
    image:
      it.imageUrl &&
      (it.imageUrl.startsWith("http") ? it.imageUrl : site + it.imageUrl),
    inLanguage: "en",
    keywords: (it.tags || []).join(", "),
    about: it.category,
    url: url,
    ...(timeRequired ? { timeRequired: timeRequired } : {}),
  };
}

export default function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const creativeWorks = (items as any[]).map(toCreativeWork);

  // Use WebPage + hasPart (no ItemList → no Carousel validation)
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Minh Vu — Portfolio",
    url: site,
    isPartOf: { "@type": "WebSite", url: site },
    about: { "@id": site + "#me" },
    hasPart: creativeWorks,
    subjectOf: {
      "@type": "CreativeWork",
      name: "Resume (PDF)",
      encoding: {
        "@type": "MediaObject",
        fileFormat: "application/pdf",
        contentUrl: site + "/MinhVu_resume.pdf",
      },
    },
  };

  return (
    <>
      <SocialMusicPortfolio />
      {/* Single JSON-LD block is enough: the CreativeWorks are embedded via hasPart */}
      <JsonLd json={webPage} />

      {/* OPTIONAL: also emit each CreativeWork as its own node (keeps validators happy too) */}
      {creativeWorks.map((cw, i) => (
        <JsonLd key={i} json={{ "@context": "https://schema.org", ...cw }} />
      ))}
    </>
  );
}
