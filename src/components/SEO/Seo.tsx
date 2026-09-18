import React from "react";
import Head from "next/head";

type SeoProps = {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  canonical?: string;
  twitterCard?: string;
  jsonLd?: object;
};

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  url,
  image,
  type = "website",
  canonical,
  twitterCard = "summary_large_image",
  jsonLd,
}) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content={type} />
    <meta property="og:url" content={url} />
    {image && <meta property="og:image" content={image} />}
    <meta name="twitter:card" content={twitterCard} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {image && <meta name="twitter:image" content={image} />}
    {canonical && <link rel="canonical" href={canonical} />}
    {jsonLd && (
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    )}
  </Head>
);

export default Seo;
