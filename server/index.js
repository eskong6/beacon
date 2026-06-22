const http = require('http');
const { URL } = require('url');

const PORT = process.env.PORT || 4000;
const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

let incidents = [
  {
    id: 1,
    title: 'University Library',
    description: 'Reported incident at the library',
    type: 'safety',
    lat: 33.7838,
    lng: -118.1142,
    timestamp: new Date().toISOString()
  }
];
let nextId = 2;

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(res, statusCode, obj) {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(statusCode);
  res.end(JSON.stringify(obj));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/api/incidents') {
    if (req.method === 'OPTIONS') {
      setCorsHeaders(res);
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method === 'GET') {
      setCorsHeaders(res);
      sendJson(res, 200, incidents);
      return;
    }

    if (req.method === 'POST') {
      setCorsHeaders(res);
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => {
        try {
          const data = JSON.parse(body);
          const { title, description, type, lat, lng } = data;
          if (!title || typeof lat !== 'number' || typeof lng !== 'number') {
            sendJson(res, 400, { error: 'Invalid incident: require title, lat (number), lng (number)' });
            return;
          }
          const incident = {
            id: nextId++,
            title,
            description: description || '',
            type: type || 'unknown',
            lat,
            lng,
            timestamp: new Date().toISOString()
          };
          incidents.push(incident);
          sendJson(res, 201, incident);
        } catch (err) {
          sendJson(res, 400, { error: 'Invalid JSON' });
        }
      });
      return;
    }
  }

  sendJson(res, 404, { error: 'Not Found' });
});

server.listen(PORT, () => {
  console.log(`Beacon server listening on http://localhost:${PORT}`);
});
