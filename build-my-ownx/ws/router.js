class Router {
    constructor() {
        this.routes = {
            'GET': [],
            'POST': [],
            'PUT': [],
            'DELETE': []
        };
    }

    addRoute(method, path, handler) {
        if (!this.routes[method]) {
            this.routes[method] = [];
        }

        // Convert path to regex pattern for parameter matching
        const paramNames = [];
        const regexPath = path.replace(/:([^/]+)/g, (match, paramName) => {
            paramNames.push(paramName);
            return '([^/]+)';
        });

        this.routes[method].push({
            originalPath: path,
            regex: new RegExp(`^${regexPath}$`),
            paramNames: paramNames,
            handler: handler
        });
    }

    route(method, pathname, req, res) {
        const routes = this.routes[method];
        if (!routes) {
            return false;
        }

        for (const route of routes) {
            const match = pathname.match(route.regex);
            if (match) {
                // Extract parameters
                const params = {};
                for (let i = 0; i < route.paramNames.length; i++) {
                    params[route.paramNames[i]] = match[i + 1];
                }

                // Add params to request
                req.params = params;

                // Call the handler
                try {
                    route.handler(req, res);
                    return true;
                } catch (error) {
                    console.error('Error in route handler:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal server error' }));
                    return true;
                }
            }
        }

        return false;
    }

    // Helper method to get all routes for debugging
    getRoutes() {
        return this.routes;
    }

    // Remove a route
    removeRoute(method, path) {
        if (this.routes[method]) {
            this.routes[method] = this.routes[method].filter(route => route.originalPath !== path);
        }
    }

    // Clear all routes
    clearRoutes() {
        this.routes = {
            'GET': [],
            'POST': [],
            'PUT': [],
            'DELETE': []
        };
    }
}

module.exports = Router;
