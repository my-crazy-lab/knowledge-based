const http = require('http');
const url = require('url');
const Router = require('./router');
const SessionManager = require('./sessionManager');

class WebServer {
    constructor(port = 3000) {
        this.port = port;
        this.router = new Router();
        this.sessionManager = new SessionManager();
        this.server = null;
    }

    start() {
        this.server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });

        this.server.listen(this.port, () => {
            console.log(`Web server running on http://localhost:${this.port}`);
        });
    }

    stop() {
        if (this.server) {
            this.server.close();
            console.log('Web server stopped');
        }
    }

    handleRequest(req, res) {
        try {
            // Parse URL and method
            const parsedUrl = url.parse(req.url, true);
            const method = req.method.toUpperCase();
            const pathname = parsedUrl.pathname;
            const query = parsedUrl.query;

            // Handle session
            const sessionId = this.sessionManager.getSessionId(req);
            const session = this.sessionManager.getSession(sessionId);

            // Add session info to request
            req.session = session;
            req.sessionId = sessionId;

            // Set CORS headers
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

            // Handle preflight requests
            if (method === 'OPTIONS') {
                res.writeHead(200);
                res.end();
                return;
            }

            // Route the request
            const routeResult = this.router.route(method, pathname, req, res);
            
            if (!routeResult) {
                this.send404(res);
            }

        } catch (error) {
            console.error('Error handling request:', error);
            this.send500(res, error);
        }
    }

    send404(res) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1>');
    }

    send500(res, error) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`<h1>500 - Internal Server Error</h1><p>${error.message}</p>`);
    }

    // Convenience methods for setting up routes
    get(path, handler) {
        this.router.addRoute('GET', path, handler);
    }

    post(path, handler) {
        this.router.addRoute('POST', path, handler);
    }

    put(path, handler) {
        this.router.addRoute('PUT', path, handler);
    }

    delete(path, handler) {
        this.router.addRoute('DELETE', path, handler);
    }
}

module.exports = WebServer;
