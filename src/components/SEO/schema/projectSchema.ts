export function projectSchema({ name, description, url, image }: { name: string; description: string; url: string; image: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url,
    image,
    author: {
      "@type": "Person",
      name: "Aminur Rahman"
    }
  };
}
