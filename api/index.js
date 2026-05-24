/**
 * Security Key API
 * مفتاح الأمان - API
 * 
 * Deploy to Vercel:
 * 1. Push this to GitHub
 * 2. Go to vercel.com
 * 3. Connect your GitHub repo
 * 4. Deploy!
 */

const http = require('http');
const url = require('url');
const security = require('../security/security-key');

const PORT = process.env.PORT || 3000;

// Request handler
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    // Route 1: Generate Security Key
    if (pathname === '/api/generate-key' && req.method === 'GET') {
      const length = query.length || 32;
      const key = security.generateSecurityKey(parseInt(length));
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        message: 'مفتاح الأمان تم إنشاؤه بنجاح',
        key: key,
        length: key.length
      }));
    }

    // Route 2: Generate API Key
    else if (pathname === '/api/generate-apikey' && req.method === 'GET') {
      const apiKey = security.generateAPIKey();
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        message: 'API Key تم إنشاؤه بنجاح',
        apiKey: apiKey
      }));
    }

    // Route 3: Hash a Key
    else if (pathname === '/api/hash' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const data = JSON.parse(body);
          const hash = security.hashKey(data.key);
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            message: 'تم تشفير المفتاح بنجاح',
            key: data.key,
            hash: hash
          }));
        } catch (error) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
        }
      });
    }

    // Route 4: Generate JWT
    else if (pathname === '/api/generate-jwt' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const data = JSON.parse(body);
          const token = security.generateJWT(data.payload, data.secret, data.expiresIn || '24h');
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            message: 'JWT Token تم إنشاؤه بنجاح',
            token: token
          }));
        } catch (error) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, error: 'Invalid request' }));
        }
      });
    }

    // Route 5: Verify JWT
    else if (pathname === '/api/verify-jwt' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const data = JSON.parse(body);
          const payload = security.verifyJWT(data.token, data.secret);
          if (payload) {
            res.writeHead(200);
            res.end(JSON.stringify({
              success: true,
              message: 'JWT Token صحيح',
              payload: payload
            }));
          } else {
            res.writeHead(401);
            res.end(JSON.stringify({
              success: false,
              error: 'Invalid or expired token'
            }));
          }
        } catch (error) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, error: 'Invalid request' }));
        }
      });
    }

    // Route 6: Encrypt Data
    else if (pathname === '/api/encrypt' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const data = JSON.parse(body);
          const encrypted = security.encryptData(data.data, data.key);
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            message: 'تم تشفير البيانات بنجاح',
            encrypted: encrypted
          }));
        } catch (error) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, error: 'Invalid request' }));
        }
      });
    }

    // Route 7: Decrypt Data
    else if (pathname === '/api/decrypt' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const data = JSON.parse(body);
          const decrypted = security.decryptData(data.encrypted, data.key);
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            message: 'تم فك التشفير بنجاح',
            decrypted: decrypted
          }));
        } catch (error) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, error: 'Invalid request' }));
        }
      });
    }

    // Route 8: API Documentation
    else if (pathname === '/api' || pathname === '/' || pathname === '/api/docs') {
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        message: 'Security Key API - وحدة مفتاح الأمان',
        version: '1.0.0',
        endpoints: {
          'GET /api/generate-key': 'إنشاء مفتاح أمان عشوائي',
          'GET /api/generate-apikey': 'إنشاء API Key',
          'POST /api/hash': 'تشفير مفتاح (SHA-256)',
          'POST /api/generate-jwt': 'إنشاء JWT Token',
          'POST /api/verify-jwt': 'التحقق من JWT Token',
          'POST /api/encrypt': 'تشفير البيانات (AES-256)',
          'POST /api/decrypt': 'فك تشفير البيانات',
          'GET /api/docs': 'هذه الصفحة'
        },
        examples: {
          'Generate Key': 'GET /api/generate-key?length=32',
          'Generate JWT': 'POST /api/generate-jwt with {payload, secret}',
          'Encrypt': 'POST /api/encrypt with {data, key}'
        }
      }));
    }

    // 404
    else {
      res.writeHead(404);
      res.end(JSON.stringify({
        success: false,
        error: 'Endpoint not found',
        message: 'استخدم /api/docs للحصول على قائمة الـ endpoints'
      }));
    }
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({
      success: false,
      error: 'Internal server error',
      message: error.message
    }));
  }
});

server.listen(PORT, () => {
  console.log(`🔐 Security Key API running on http://localhost:${PORT}`);
  console.log(`📚 Documentation: http://localhost:${PORT}/api/docs`);
});

module.exports = server;