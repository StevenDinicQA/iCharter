/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "icharter-files.s3.amazonaws.com",
      "openweathermap.org",
      "upload.wikimedia.org",
    ],
  },
  env: {
    BASE_API: process.env.BASE_API || "https://staging-api.icharterbooking.com",
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || "1210298266327414",
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID || "AKIAU5BNPOQFWCLAMRMU",
    S3_SECRET_ACCESS_KEY:
      process.env.S3_SECRET_ACCESS_KEY ||
      "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",
    S3_REGION: process.env.S3_REGION || "us-east-1",
    S3_BUCKET: process.env.S3_BUCKET || "icharter-files",
    FISHES_API_HOST:
      process.env.FISHES_API_HOST || "fish-species.p.rapidapi.com",
    FISHES_API_URL:
      process.env.FISHES_API_URL ||
      "https://fish-species.p.rapidapi.com/fish_api/fishes",
    FISHES_API_KEY:
      process.env.FISHES_API_KEY ||
      "0a2195048emsh937c448a73ca6dbp131df7jsn14378d08485a",
    WEATHER_API_URL:
      process.env.WEATHER_API_URL || "https://api.openweathermap.org/data/3.0",
    WEATHER_API_KEY:
      process.env.WEATHER_API_KEY || "484731ac7a04e07784fafa303baac956",
    WEATHER_ICON_URL:
      process.env.WEATHER_ICON_URL || "https://openweathermap.org/img/w",
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
      "AIzaSyDBy6kuMkID__5q8QouwIxw87u2v0DfR-E",
    BUGSNAG_API_KEY:
      process.env.BUGSNAG_API_KEY || "eb9b6da5b560e449d1d555f1d28324c4",
    NEXT_PUBLIC_STRIPE_API_KEY:
      process.env.NEXT_PUBLIC_STRIPE_API_KEY ||
      "pk_test_51O0UTKLPjaIICuBzEcaLA4hRtbmZf9x5MlDhFulgFrABx05li8Uj1hcCXfsIfKr1hyaf1tcwLlshox3ckrxOiHFK001c1gvs0V",
    MIXPANEL_TOKEN: process.env.MIXPANEL_TOKEN || "",
    OST_MIXPANEL: process.env.OST_MIXPANEL || "",
    NEXT_PUBLIC_APP_ENVIRONMENT: process.env.NEXT_PUBLIC_APP_ENVIRONMENT || "",
  },
};

module.exports = nextConfig;
