if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise((async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]}))},s=(s,a)=>{Promise.all(s.map(e)).then((e=>a(1===e.length?e[0]:e)))},a={require:Promise.resolve(s)};self.define=(s,c,n)=>{a[s]||(a[s]=Promise.resolve().then((()=>{let a={};const i={uri:location.origin+s.slice(1)};return Promise.all(c.map((s=>{switch(s){case"exports":return a;case"module":return i;default:return e(s)}}))).then((e=>{const s=n(...e);return a.default||(a.default=s),a}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/DessertFit.png",revision:"d9b16a9ba1302c10d4a3bffb752d0f71"},{url:"/_next/static/6iLahWS73cosrhA_gE4Qn/_buildManifest.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/6iLahWS73cosrhA_gE4Qn/_ssgManifest.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/004f0e2a7f49777201a1e2053ee5f3bea23dbb8f.e851dfa57923259d9214.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/03af09f957610b660f1d942b739f8094a65c1ef6.5c496881fb5bffcd7e1d.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/0d6e408291dee332384b218f40e10da5617dbbae_CSS.6164c81b6ed04bb13dbd.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/12d407f68f9a231e0471f75d34700fb87023a328.6abe5240231900b8380f.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/13e41420.34e373399cdc573d23ed.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/148e34b101db4cdafd169a0dc84e4220989c0f64.ecfc93a8a70d10fdac15.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/1d87c901ca5a05e4de9677cc6e3c31e6ec2c9d02.e1951cc526b19b708815.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/2caa94ae2632b55f066bc0f24ee653be7000ea43.39f38508d9d4aa69ef7c.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/38a48d59c907bf4a771ab1a96b3fc6ced7d14d17.aa02023da540f4ea823b.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/4891fc7d0b68af804c71c04d571351e7f03645a5.dfa914a9fede65c3efd4.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/53a805019b08508e0051953ee5606b7280b8a31d.86dace780520329e8722.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/57b6a47beb9b964c5ac7334775f18badf243a497.22c4f8ac1addd43ad2e4.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/62857bbd635a9cd75b326bbd0bb664a638366f5a.8b919b1980cb9c623423.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/871e7aec2ba139d8a390489d62efb1c97ff072a3.69a67fc6c16abab15b9f.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/8afbdf6ae37782afdc78c4b4fcb70dcb0e8da85a.887be5d3178b5ce03e07.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/91a11f48e699d6c3f510aa871b020002e496075e.7b3a0ade7eed17292aee.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/b209827f5a4fa20a9c9273311e444a66606aecff.a8a21e638a6a7fe6c90d.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/b211c89e0fd9d179485e28e4331c7bd9b3ff35a0.03725bef0a7ab1fa93ae.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/b3639001f3ac5deeb954695806d06fef0e400926.d6c65bed1e5b1578b4c6.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/b3a00ef74e6ed9c46e74ea2865fb605ab8d9fd06.82bbb7c074005aa29bab.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/cb4b5a268dd513ac3df5678068bcd1154f434437.612d3c7e4b9a3817fd36.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/da2219c58ae5dba030686d825122b57aad835dc5.2e7d76dd558ba6bd3983.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/e0645c731d00d4e0fefb4f6926cd28a9a32022ef.3d4a24cbf36d05e72038.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/e4388186fc884be3644b22fea5e2d49cb8a825c6.8e77ae29a778cc61978e.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/feb0ec0347b6f0220ddae0a7463f153416bdf6fe.32b49503c2f14446b019.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/framework.f8bd46fc02868c500bda.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/main-d662e107a91ba226ddc9.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/_app-3dcbec5f5108d17a45dd.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/_error-06fd636169c914586f5b.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/auth-cb5702fa9f4a4dc6c199.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/cart-dfef74e10083b1ce2d20.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/category-eaaa69460bbcb8339ece.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/feed-70029b4676cdcc41471d.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/feed/%5Bid%5D-15e0d87ac1a3c59631d9.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/feed/%5Bid%5D/%5Bcomments%5D-f4a1efecc01185c27d10.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/find/email-88c4180d6074ddfbb548.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/find/password-6e17fa9135f694a098f8.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/index-505ed2fc64cf4d566155.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/login-79b4af81a6e77ddae5a9.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/order-f0f8066edad95c6a448f.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/register-2bed07d37595dcd6219b.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/review-feed-4547bc4c90b6945483a6.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/search-be2609d9eacbe8246b78.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/search/%5Bquery%5D-53d96ee38d07882cd51f.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/stores/%5Bname%5D-14ac3102848fbec39335.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/stores/%5Bname%5D/%5BnameId%5D-9dae2114b3b45a1cbcdc.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/stores/%5Bname%5D/feed-570877ad06959a62fde6.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/stores/%5Bname%5D/reviews-af0e505439ef0aa4bc9b.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/theme-a9c59c387a9c3ed3270f.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/users/%5Bname%5D-d90b75f02d6a87da5a64.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/users/%5Bname%5D/coupons-e789ea357ffa34499f54.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/users/%5Bname%5D/favorite-menus-0da972220674588581dd.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/users/%5Bname%5D/favorite-stores-2dc0385ed14025b8b217.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/users/%5Bname%5D/notifications-7d1ca2fda83e527bb487.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/users/%5Bname%5D/orders-42dcf4bbbbacdeff5890.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/users/%5Bname%5D/orders/%5Bid%5D-0975dea568afb71d1856.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/users/%5Bname%5D/payments-16df94fa2aba80eaa101.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/users/%5Bname%5D/point-ce60a26bcf247cafbca3.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/users/%5Bname%5D/preferences-02a66a6b891b450a7305.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/users/%5Bname%5D/regulars-5db23a2566375fe2e73f.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/users/%5Bname%5D/reviews-7f794cbbe0276de06302.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/pages/users/%5Bname%5D/reviews/%5Bid%5D-1989ce68c453bef80b6d.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/polyfills-3e2d6fec23558ca89ca3.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/css/539cb8ba46ca90095758.css",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/css/99e526295fa5c5516de4.css",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/css/f8d4ac3d9c7b9d7f2171.css",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/media/ajax-loader.fb6f3c230cb846e25247dfaa1da94d8f.gif",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/media/slick.2630a3e3eab21c607e21576571b95b9d.svg",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/media/slick.295183786cd8a138986521d9f388a286.woff",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/media/slick.a4e97f5a2a64f0ab132323fbeb33ae29.eot",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/_next/static/media/slick.c94f7671dcc99dce43e22a89f486f7c2.ttf",revision:"6iLahWS73cosrhA_gE4Qn"},{url:"/banner.png",revision:"9bbd774ed966952200fcd73fbf840bf2"},{url:"/favicon.ico",revision:"978a5b162c0221d8c2409478204e8d7c"},{url:"/manifest.json",revision:"03944f0c3e6cf1044376dc282779c1f1"},{url:"/mockdata/bridge_edge_scon.png",revision:"384149e3d34b6f7ee7b84358057f4b94"},{url:"/sindy.jpeg",revision:"55f7ab4b8bb944df32848714fe34efcf"},{url:"/splash.png",revision:"8296f7948cf21428e5b762aee159dd34"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
