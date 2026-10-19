// The full web address of the site. Social previews need ABSOLUTE urls.
// Locally it is localhost. On Vercel it uses your real domain automatically.
// You can also set SITE_URL yourself (for example https://Addis-Ecommerce.vercel.app).
export const SITE_URL =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL
    : 'http://localhost:3000')