const WebServer = require('./server');
const fs = require('fs');
const path = require('path');

// Create web server instance
const app = new WebServer(3000);

// Helper function to read request body
function getRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                resolve({});
            }
        });
        req.on('error', reject);
    });
}

// Helper function to send JSON response
function sendJSON(res, data, statusCode = 200) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

// Helper function to send HTML file
function sendHTMLFile(res, filename) {
    const filePath = path.join(__dirname, 'public', filename);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - File Not Found</h1>');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
}

// Routes

// Home page
app.get('/', (req, res) => {
    sendHTMLFile(res, 'index.html');
});

// Login page
app.get('/login', (req, res) => {
    sendHTMLFile(res, 'login.html');
});

// API: Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const body = await getRequestBody(req);
        const { username, password } = body;

        // Simple authentication (in real app, check against database)
        if (username === 'admin' && password === 'password') {
            // Create or get session
            let session = req.session;
            if (!session) {
                session = app.sessionManager.createSession();
                app.sessionManager.setSessionCookie(res, session.id);
            }

            // Authenticate session
            app.sessionManager.authenticateSession(session.id, { username });

            sendJSON(res, { 
                success: true, 
                message: 'Login successful',
                sessionId: session.id 
            });
        } else {
            sendJSON(res, { 
                success: false, 
                message: 'Invalid credentials' 
            }, 401);
        }
    } catch (error) {
        sendJSON(res, { 
            success: false, 
            message: 'Server error' 
        }, 500);
    }
});

// API: Logout endpoint
app.post('/api/logout', (req, res) => {
    const sessionId = req.sessionId;
    if (sessionId) {
        app.sessionManager.destroySession(sessionId);
    }
    
    // Clear cookie
    res.setHeader('Set-Cookie', `sessionId=; HttpOnly; Path=/; Max-Age=0`);
    sendJSON(res, { success: true, message: 'Logged out successfully' });
});

// API: Protected endpoint (requires authentication)
app.get('/api/protected', (req, res) => {
    if (!app.sessionManager.requireAuth(req, res)) {
        return;
    }

    const session = req.session;
    sendJSON(res, { 
        message: 'This is a protected resource',
        user: session.data,
        sessionInfo: {
            id: session.id,
            createdAt: new Date(session.createdAt).toISOString(),
            lastAccessed: new Date(session.lastAccessed).toISOString()
        }
    });
});

// API: Session info
app.get('/api/session', (req, res) => {
    const session = req.session;
    if (session) {
        sendJSON(res, {
            authenticated: session.isAuthenticated,
            data: session.data,
            createdAt: new Date(session.createdAt).toISOString(),
            lastAccessed: new Date(session.lastAccessed).toISOString()
        });
    } else {
        sendJSON(res, { authenticated: false });
    }
});

// API: Server stats
app.get('/api/stats', (req, res) => {
    sendJSON(res, {
        activeSessions: app.sessionManager.getSessionCount(),
        routes: Object.keys(app.router.getRoutes()).reduce((acc, method) => {
            acc[method] = app.router.getRoutes()[method].length;
            return acc;
        }, {}),
        uptime: process.uptime()
    });
});

// API: User profile (with URL parameter)
app.get('/api/users/:userId', (req, res) => {
    if (!app.sessionManager.requireAuth(req, res)) {
        return;
    }

    const userId = req.params.userId;
    sendJSON(res, {
        userId: userId,
        message: `Profile for user ${userId}`,
        requestedBy: req.session.data.username
    });
});

// Static file serving for CSS/JS
app.get('/static/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'public', filename);
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            const ext = path.extname(filename);
            const contentType = ext === '.css' ? 'text/css' : 
                              ext === '.js' ? 'application/javascript' : 
                              'text/plain';
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

// Start the server
app.start();

console.log('Basic web server started with the following features:');
console.log('- Routing with URL parameters');
console.log('- Session management with cookies');
console.log('- Authentication and authorization');
console.log('- Automatic session cleanup');
console.log('- CORS support');
console.log('\nTry these endpoints:');
console.log('- GET  / (home page)');
console.log('- GET  /login (login page)');
console.log('- POST /api/login (authenticate)');
console.log('- GET  /api/protected (requires auth)');
console.log('- GET  /api/session (session info)');
console.log('- GET  /api/stats (server statistics)');

module.exports = app;
