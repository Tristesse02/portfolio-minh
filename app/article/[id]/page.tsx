import ArticleClient from "./ArticleClient"; // your actual component
import { articleData } from "./ArticleClient"; // adjust path if needed

type PageProps = {
  params: { value: string };
};

export default async function Page(promise: PageProps) {
  const { params } = promise; // ✅ unwrap the Promise
  console.log("minhdz", params);
  return <ArticleClient params={params} />; // or pass just id if you prefer
}

export async function generateStaticParams() {
  return Object.keys(articleData).map((id) => ({ id }));
}
