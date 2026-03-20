import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url, image }) => {
  const baseUrl = "https://mocktalk.vercel.app";
  const defaultImage = `${baseUrl}/og-image.png`;

  return (
    <Helmet>
      <title>{title} | MockTalk.AI</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url || baseUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url || baseUrl} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};

export default SEO;