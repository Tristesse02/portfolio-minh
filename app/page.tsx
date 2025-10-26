import SocialMusicPortfolio from "../components/SocialMusicPortfolio";
import JsonLd from "@/components/JsonLd";
import items from "@/data/contentItems.json";

const site = "https://tminhvu.xyz";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toCreativeWork(item: any) {
  const url = `${site}#${item.id}`;
  const timeRequired =
    typeof item.readTime === "number"
      ? `PT${Math.round(item.readTime)}M`
      : undefined;

  return {
    "@type": "CreativeWork",
    name: item.title,
    alternateName: item.altTitle,
    description: item.description,
    image:
      item.imageUrl &&
      (item.imageUrl.startsWith("http") ? item.imageUrl : site + item.imageUrl),
    inLanguage: "en",
    keywords: (item.tags || []).join(", "),
    about: item.category,
    url: url,
    ...(timeRequired ? { timeRequired: timeRequired } : {}),
  };
}

export default function HomePage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Highlights — Blogs, Projects, Experiences",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    itemListElement: (items as any[]).map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${site}#${it.id}`,
      item: toCreativeWork(it),
    })),
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Minh Vu — Portfolio",
    url: site,
    isPartOf: { "@type": "WebSite", url: site },
    about: { "@id": site + "#me" },
    mainEntity: itemList,
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
      <JsonLd json={itemList} />
      <JsonLd json={webPage} />
    </>
  );
}
