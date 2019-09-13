const path = require('path');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const nextConfig = withCSS(withSass({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(raw)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'raw-loader',
    });
    config.module.rules.push({
      type: 'javascript/auto',
      test: /\.modernizrrc(\.json)?$/,
      use: ['expose-loader?Modernizr', 'modernizr-loader', 'json-loader'],
    });
    config.resolve = {
      alias: {
        modernizr$: path.resolve(__dirname, ".modernizrrc.json")
      }
    };
    if (config.mode === 'production') {
      if (Array.isArray(config.optimization.minimizer)) {
        config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
      }
    }
    return config;
  }
}));


module.exports = nextConfig;

// const path = require('path');
// const { PHASE_PRODUCTION_SERVER } = require("next-server/constants");
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
