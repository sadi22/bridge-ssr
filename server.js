const express = require('express');
const next = require('next');
var compression = require('compression');
const cacheableResponse = require('cacheable-response')
const LRUCache = require('lru-cache');
const sm = require('sitemap');
const axios = require('axios');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
var port = process.env.PORT || 8080;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100 * 1024 * 1024, /* cache size will be 100 MB using `return n.length` as length() function */
  length: function (n, key) {
      return n.length
  },
  maxAge: 1000 * 60 * 60 * 24 * 30
});


const determinePriority = (item) => {
  if (item.type === 'page') {
    return 0.6
  } else if (item.type === 'post') {
    return 0.8
  } else {
    return 1.0
  }
};

const createSitemap = (res) => {
  let urlRoutes = [];
  
  let sitemap = sm.createSitemap ({
    hostname: 'http://localhost:3000',
    cacheTime: 60
  });
  
  axios.get('https://bridgssrelive.wpengine.com/wp-json/wp/v2/pages')
    .then(function(response) {
      urlRoutes = [...urlRoutes, ...response.data]
      urlRoutes.map((item) => {
        sitemap.add({
          url: `/${item.slug}`,
          changefreq: 'daily',
          priority: determinePriority(item)
        })
      })
      res.send( sitemap.toString() )
    });
};

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression());

    server.get('/sitemap.xml', function(req, res) {
      res.header('Content-Type', 'application/xml');
      createSitemap(res);
    });

    server.get('/_next/*', (req, res) => {
        handle(req, res);
    });

    server.get('/post/:slug', (req, res) => {
      const actualPage = '/post';
      const queryParams = { slug: req.params.slug, apiRoute: 'post' };
      app.render(req, res, actualPage, queryParams);
      // renderAndCache(req, res, actualPage, queryParams);
    });

    server.get('/blog/:pageno', (req, res) => {
      const actualPage = '/blog';
      const queryParams = { pageno: req.params.pageno, apiRoute: 'blog' };
      app.render(req, res, actualPage, queryParams);
      // renderAndCache(req, res, actualPage, queryParams);
    });

    server.get('/:slug', (req, res) => {
      const actualPage = '/page';
      const queryParams = { slug: req.params.slug };
      app.render(req, res, actualPage, queryParams);
      // renderAndCache(req, res, actualPage, queryParams);
    });

    server.get('/category/:slug', (req, res) => {
      const actualPage = '/category';
      const queryParams = { slug: req.params.slug };
      app.render(req, res, actualPage, queryParams);
      // renderAndCache(req, res, actualPage, queryParams);
    });

    server.get('/_preview/:id/:wpnonce', (req, res) => {
      const actualPage = '/preview';
      const queryParams = { id: req.params.id, wpnonce: req.params.wpnonce };
      app.render(req, res, actualPage, queryParams);
      // renderAndCache(req, res, actualPage, queryParams);
    });


    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });


/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.path}`
}

async function renderAndCache(req, res, actualPage, queryParams) {
  const key = getCacheKey(req);

  if (ssrCache.has(key)) {
      res.setHeader('x-cache', 'HIT');
      res.send(ssrCache.get(key));
      return
  }

  try {
      const html = await app.renderToHTML(req, res, actualPage, queryParams);

      if (res.statusCode !== 200) {
          res.send(html);
          return
      }
      ssrCache.set(key, html);
      res.setHeader('x-cache', 'MISS');
      res.send(html)
  } catch (err) {
      app.renderError(err, req, res, req.path, req.query)
  }
}
