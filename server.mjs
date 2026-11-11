import http from 'node:http';
import { setTimeout as delay } from 'node:timers/promises';
import { pathToFileURL } from 'node:url';

export function createServer() {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    res.setHeader('Content-Type', 'application/json');
    if (req.method !== 'GET') { res.writeHead(405); res.end('{"error":"GET required"}'); return; }
    if (url.pathname === '/health') { res.end('{"status":"ok"}'); return; }
    if (url.pathname !== '/api/example') { res.writeHead(404); res.end('{"error":"not found"}'); return; }
    // A timer simulates an I/O wait, not a database or a CPU benchmark.
    const waitMs = Number(url.searchParams.get('waitMs') ?? 100);
    if (!Number.isInteger(waitMs) || waitMs < 0 || waitMs > 1000) {
      res.writeHead(400); res.end('{"error":"waitMs must be an integer from 0 to 1000"}'); return;
    }
    await delay(waitMs);
    res.end(JSON.stringify({ message: 'Hello from a long-running Node.js API', simulatedWaitMs: waitMs }));
  });
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = createServer();
  server.listen(Number(process.env.PORT ?? 3000), '0.0.0.0', () => console.log('API listening'));
  process.on('SIGTERM', () => { server.close(() => process.exit(0)); setTimeout(() => process.exit(1), 10000).unref(); });
}
