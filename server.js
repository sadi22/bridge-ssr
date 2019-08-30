const express = require('express');
const next = require('next');
var compression = require('compression');
const LRUCache = require('lru-cache');


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

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression());

    server.get('/_next/*', (req, res) => {
        handle(req, res);
    });

    server.get('/post/:slug', (req, res) => {
      const actualPage = '/post';
      const queryParams = { slug: req.params.slug, apiRoute: 'post' };
      renderAndCache(req, res, actualPage, queryParams);
    });

    server.get('/page/:slug', (req, res) => {
      const actualPage = '/page';
      const queryParams = { slug: req.params.slug, apiRoute: 'page' };
      renderAndCache(req, res, actualPage, queryParams);
    });

    server.get('/category/:slug', (req, res) => {
      const actualPage = '/category';
      const queryParams = { slug: req.params.slug };
      renderAndCache(req, res, actualPage, queryParams);
    });

    server.get('/_preview/:id/:wpnonce', (req, res) => {
      const actualPage = '/preview';
      const queryParams = { id: req.params.id, wpnonce: req.params.wpnonce };
      renderAndCache(req, res, actualPage, queryParams);
    });


    server.get('*', (req, res) => {
      if (req.url.includes('/sw')) {
        const filePath = join(__dirname, 'static', 'workbox', 'sw.js');
        app.serveStatic(req, res, filePath);
      } else if (req.url.startsWith('static/workbox/')) {
        app.serveStatic(req, res, join(__dirname, req.url));
      } else {
        handle(req, res, req.url);
      }
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
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
