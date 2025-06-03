import ArticleClient from "./ArticleClient"; // your actual component
import articleData from "../../../data/articleData.json" assert { type: "json" };

type PageProps = {
  params: Promise<{ id: string }> & { id: string };
};

export default function Page(promise: PageProps) {
  const { params } = promise;
  console.log("minhdz", params);
  console.log("minhdz", articleData);
  return <ArticleClient params={params} />; // or pass just id if you prefer
}

export async function generateStaticParams() {
  return Object.keys(articleData).map((id) => ({ id }));
}
