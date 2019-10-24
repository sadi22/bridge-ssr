const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withOffline = require('next-offline');
const path = require('path');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.BUNDLE_ANALYZE === 'true',
});

const nextConfig = {
    target: 'serverless',
    // next-offline options
    workboxOpts: {
        swDest: 'static/service-worker.js',
        runtimeCaching: [
            {
                urlPattern: /^https?.*/,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'https-calls',
                    networkTimeoutSeconds: 15,
                    expiration: {
                        maxEntries: 150,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                    },
                    cacheableResponse: {
                        statuses: [0, 200],
                    },
                },
            },
        ],
    },
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
      if (config.mode === 'production') {
        if (Array.isArray(config.optimization.minimizer)) {
          config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
        }
      }
      
      return config;
    }
};

module.exports = withOffline(
    withBundleAnalyzer(
        withSass(
            withCSS(nextConfig),
        ),
    ),
);