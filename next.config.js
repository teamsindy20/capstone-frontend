/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')

module.exports = withPWA({
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
  },
  images: {
    domains: [
      'gramho.com',
      'mp-seoul-image-production-s3.mangoplate.com',
      'cdn.crowdpic.net',
      'www.smlounge.co.kr',
      'image.newdaily.co.kr',
      'file.namu.moe',
      'upload.wikimedia.org',
      'ojsfile.ohmynews.com',
      'globalassets.starbucks.com',
      'post-phinf.pstatic.net',
      'mblogthumb-phinf.pstatic.net',
      'blogfiles.pstatic.net',
      'postfiles.pstatic.net',
      'cdn.pixabay.com',
      'search.pstatic.net/common',
    ],
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  reactStrictMode: true,
})
