export function generateSitemap(pages: string[]) {
  const baseUrl = "https://aminur-info.vercel.app";
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map(
      (page) => `<url>\n  <loc>${baseUrl}${page}</loc>\n  <changefreq>monthly</changefreq>\n  <priority>0.8</priority>\n</url>`
    )
    .join("\n")}\n</urlset>`;
}
