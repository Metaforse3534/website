const fs = require('fs');
const http = require('http');
const path = require('path');

const rootDir = __dirname;
const routesDir = path.join(rootDir, 'Routes');
const port = parseInt(process.env.PORT || '3000', 10);

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
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.exe': 'application/vnd.microsoft.portable-executable',
};

const redirects = {
  '/schools': '/Routes/schools.html',
  '/terms': '/Routes/terms.html',
  '/privacy': '/Routes/privacy.html',
  '/cookies': '/Routes/cookies.html',
  '/refund': '/Routes/refund.html',
  '/ai-usage': '/Routes/ai-usage.html',
  '/dpa': '/Routes/dpa.html',
  '/security': '/Routes/security.html',
  '/copyright': '/Routes/copyright.html',
  '/trademark': '/Routes/trademark.html',
  '/open-source': '/Routes/open-source.html',
  '/accessibility': '/Routes/accessibility.html',
  '/support': '/Routes/support.html',
  '/extension': '/Routes/extension.html',
  '/about': '/Routes/about.html',
  '/contact': '/Routes/contact.html',
  '/careers': '/Routes/careers.html',
  '/blog': '/Routes/blog.html',
  '/reviews': '/Routes/reviews.html',
  '/research': '/Routes/research.html',
  '/developers': '/Routes/developers.html',
  '/orbit-ai': '/Routes/orbit-ai.html',
  '/pulsar': '/Routes/pro-pulsar.html',
  '/pro-pulsar': '/Routes/pro-pulsar.html',
  '/pulsar-v1': '/Routes/pulsar-v1.html',
  '/agents': '/Routes/agents.html',
  '/business': '/Routes/business.html',
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
  const notFoundPath = path.join(rootDir, '404.html');
  if (fs.existsSync(notFoundPath)) {
    sendFile(res, notFoundPath);
  } else {
    send(res, 404, '404 Not Found');
  }
}

function redirect(res, location, permanent = false) {
  res.writeHead(permanent ? 301 : 302, { Location: location });
  res.end();
}

function resolveCaseInsensitive(baseDir, segments) {
  let current = baseDir;
  for (const segment of segments) {
    if (!segment) continue;
    if (!fs.existsSync(current)) return null;
    let entries;
    try {
      entries = fs.readdirSync(current);
    } catch {
      return null;
    }
    const match = entries.find((e) => e.toLowerCase() === segment.toLowerCase());
    if (!match) return null;
    current = path.join(current, match);
  }
  return current;
}

function resolveStaticPath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath);
  const safePath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(rootDir, safePath);
  const resolvedPath = path.resolve(filePath);

  if (!resolvedPath.startsWith(rootDir)) {
    return null;
  }

  // 1. Direct file check
  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()) {
    return resolvedPath;
  }

  // 2. Direct .html check
  const htmlPath = `${resolvedPath}.html`;
  if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile() && htmlPath.startsWith(rootDir)) {
    return htmlPath;
  }

  // 3. Case-insensitive lookup from root
  const segments = safePath.split(/[/\\]/).filter(Boolean);
  const ciPath = resolveCaseInsensitive(rootDir, segments);
  if (ciPath && fs.existsSync(ciPath) && fs.statSync(ciPath).isFile()) {
    return ciPath;
  }

  // 4. Case-insensitive .html check from root
  if (segments.length > 0) {
    const segmentsWithHtml = [...segments.slice(0, -1), `${segments[segments.length - 1]}.html`];
    const ciHtmlPath = resolveCaseInsensitive(rootDir, segmentsWithHtml);
    if (ciHtmlPath && fs.existsSync(ciHtmlPath) && fs.statSync(ciHtmlPath).isFile()) {
      return ciHtmlPath;
    }
  }

  // 5. Check in Routes/ directory
  if (fs.existsSync(routesDir)) {
    const routeCiPath = resolveCaseInsensitive(routesDir, segments);
    if (routeCiPath && fs.existsSync(routeCiPath) && fs.statSync(routeCiPath).isFile()) {
      return routeCiPath;
    }
    if (segments.length > 0) {
      const routeSegmentsWithHtml = [...segments.slice(0, -1), `${segments[segments.length - 1]}.html`];
      const routeCiHtml = resolveCaseInsensitive(routesDir, routeSegmentsWithHtml);
      if (routeCiHtml && fs.existsSync(routeCiHtml) && fs.statSync(routeCiHtml).isFile()) {
        return routeCiHtml;
      }
    }
  }

  return null;
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = requestUrl.pathname.replace(/\/$/, '') || '/';

  if (req.method === 'POST' && pathname === '/create-payment-intent') {
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

  // Check known redirects
  const lowerPath = pathname.toLowerCase();
  if (redirects[lowerPath]) {
    redirect(res, redirects[lowerPath]);
    return;
  }

  const staticPath = resolveStaticPath(pathname === '/' ? '/index.html' : pathname);
  if (staticPath) {
    sendFile(res, staticPath);
  } else {
    sendNotFound(res);
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Orbit website server running on http://0.0.0.0:${port}`);
});
