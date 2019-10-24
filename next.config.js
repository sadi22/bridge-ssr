// const path = require('path');
// const withSass = require('@zeit/next-sass');
// const withCSS = require('@zeit/next-css')
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const withTM = require('next-transpile-modules');

// // const nextConfig = withPlugins(withCSS(withSass({})));
// const nextConfig = withCSS(withSass(
//     withTM({
//         transpileModules: ['gsap'],
//     })
// ));
// module.exports = nextConfig;

// const path = require('path');
// const { PHASE_PRODUCTION_SERVER } = require('next/constants');
// module.exports = (phase, { defaultConfig }) => {
//   if (phase === PHASE_PRODUCTION_SERVER) {
//     return { target: "serverless" };
//   }
//   const withSass = require('@zeit/next-sass');
//   const withCSS = require('@zeit/next-css')
//   const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//   return withCSS(withSass({
//     target: "serverless",
//     webpack(config, options) {
//       config.module.rules.push({
//         test: /\.(raw)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//         use: 'raw-loader',
//       });
//       config.module.rules.push({
//         type: 'javascript/auto',
//         test: /\.modernizrrc(\.json)?$/,
//         use: ['expose-loader?Modernizr', 'modernizr-loader', 'json-loader'],
//       });
//       config.resolve = {
//         alias: {
//           modernizr$: path.resolve(__dirname, ".modernizrrc.json")
//         }
//       };
//       if (config.mode === 'production') {
//         if (Array.isArray(config.optimization.minimizer)) {
//           config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
//         }
//       }
//       return config;
//     }
//   }))
// };







const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const NextWorkboxPlugin = require('next-workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

module.exports = withCSS(withSass({
    targets: "serverless",
    webpack(config, { isServer, buildId, dev }) {
        // Fixes npm packages that depend on `fs` module
        config.node = {
          fs: 'empty',
        };
    
        if (!isServer) {
          config.module.rules.find(({ test }) => test.test('style.css')).use.push({
            loader: 'css-purify-webpack-loader',
            options: {
              includes: ['./pages/*.js', './components/*.js'],
            },
          });
        }
    
        const workboxOptions = {
          clientsClaim: true,
          skipWaiting: true,
          globPatterns: ['.next/static/*', '.next/static/commons/*'],
          modifyUrlPrefix: {
            '.next': '/_next',
          },
          runtimeCaching: [
            {
              urlPattern: '/',
              handler: 'networkFirst',
              options: {
                cacheName: 'html-cache',
              },
            },
            {
              urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
              handler: 'cacheFirst',
              options: {
                cacheName: 'image-cache',
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        };
    
        if (!isServer && !dev) {
          config.plugins.push(
            new NextWorkboxPlugin({
              buildId,
              ...workboxOptions,
            }),
            new WebpackPwaManifest({
              filename: 'static/manifest.json',
              name: 'Next PWA',
              short_name: 'Next-PWA',
              description: 'A Movie browsing PWA using Next.js and Google Workbox',
              background_color: '#ffffff',
              theme_color: '#5755d9',
              display: 'standalone',
              orientation: 'portrait',
              fingerprints: false,
              inject: false,
              start_url: '/',
              ios: {
                'apple-mobile-web-app-title': 'Next-PWA',
                'apple-mobile-web-app-status-bar-style': '#5755d9',
              },
              icons: [
                {
                  src: path.resolve('static/favicon.ico'),
                  sizes: [96, 128, 192, 256, 384, 512],
                  destination: '/static',
                },
              ],
              includeDirectory: true,
              publicPath: '..',
            })
          );
        }
    
        return config;
    },
}));
