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
      't1.daumcdn.net',
      'img.insight.co.kr',
      'img1.daumcdn.net',
      'cgeimage.commutil.kr',
      'i.pinimg.com',
      'shop3.daumcdn.net',
      'search.pstatic.net',
      'scontent-ssn1-1.cdninstagram.com',
      'search.pstatic.net',
    ],
  },
  poweredByHeader: process.env.NODE_ENV === 'development',
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  reactStrictMode: process.env.NODE_ENV === 'development',
})
