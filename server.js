const fs = require('fs');
const http = require('http');
const path = require('path');

const rootDir = __dirname;
const routesDir = path.join(rootDir, 'Routes');
const port = process.env.PORT || 4242;

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jsonld': 'application/ld+json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
  '.exe': 'application/vnd.microsoft.portable-executable',
};

function send(res, status, body, type = 'text/plain; charset=utf-8', headers = {}) {
  res.writeHead(status, { 'Content-Type': type, ...headers });
  res.end(body);
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (error, body) => {
    if (error) {
      sendNotFound(res);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    send(res, 200, body, contentTypes[ext] || 'application/octet-stream');
  });
}

function sendNotFound(res) {
  sendFile(res, path.join(rootDir, '404.html'));
}

function redirect(res, location, permanent = false) {
  res.writeHead(permanent ? 301 : 302, { Location: location });
  res.end();
}

function resolveStaticPath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath);
  const safePath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(rootDir, safePath);
  const resolvedPath = path.resolve(filePath);

  if (!resolvedPath.startsWith(rootDir)) {
    return null;
  }

  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()) {
    return resolvedPath;
  }

  const htmlPath = `${resolvedPath}.html`;
  if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile() && htmlPath.startsWith(rootDir)) {
    return htmlPath;
  }

  return null;
}

function resolveRoutePage(pageName) {
  const requested = pageName.replace(/\.html$/i, '').toLowerCase();
  const match = fs
    .readdirSync(routesDir)
    .find((file) => file.toLowerCase() === `${requested}.html`);

  return match ? path.join(routesDir, match) : null;
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'POST' && requestUrl.pathname === '/create-payment-intent') {
    send(
      res,
      410,
      JSON.stringify({
        error: 'Legacy payment intents are disabled. Use Orbit Billing so card details are collected only by Stripe Checkout.',
        billingUrl: 'https://app.orbitdev.org/billing',
      }),
      'application/json; charset=utf-8',
    );
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    send(res, 405, 'Method Not Allowed');
    return;
  }

  if (requestUrl.pathname === '/terms') {
    redirect(res, '/Routes/terms.html', true);
    return;
  }

  if (requestUrl.pathname === '/schools') {
    redirect(res, '/Routes/schools.html');
    return;
  }

  if (requestUrl.pathname === '/support') {
    redirect(res, '/Routes/support.html');
    return;
  }

  if (requestUrl.pathname === '/extension') {
    redirect(res, '/Routes/extension.html');
    return;
  }

  const routeMatch = requestUrl.pathname.match(/^\/routes\/([^/]+)$/i);
  if (routeMatch) {
    const routePage = resolveRoutePage(routeMatch[1]);
    routePage ? sendFile(res, routePage) : sendNotFound(res);
    return;
  }

  const staticPath = resolveStaticPath(requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname);
  staticPath ? sendFile(res, staticPath) : sendNotFound(res);
});

server.listen(port, () => {
  console.log(`Orbit website server running on port ${port}.`);
});
