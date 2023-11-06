// next.config.js
const redirects = require('./redirects')

const isProd = process.env.NODE_ENV === 'production'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      process.env.NEXT_PUBLIC_AZURE_BLOB_URL.replace(/(^\w+:|^)\/\//, ''),
    ]
  },
  redirects: isProd ? redirects : [],
})

module.exports = nextConfig
