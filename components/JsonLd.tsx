// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function JsonLd({ json }: { json: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
