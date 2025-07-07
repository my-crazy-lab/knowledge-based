const crypto = require('crypto');

class SessionManager {
    constructor(options = {}) {
        this.sessions = new Map();
        this.sessionTimeout = options.sessionTimeout || 30 * 60 * 1000; // 30 minutes default
        this.cookieName = options.cookieName || 'sessionId';
        this.cleanupInterval = options.cleanupInterval || 5 * 60 * 1000; // 5 minutes default
        
        // Start cleanup timer
        this.startCleanupTimer();
    }

    generateSessionId() {
        return crypto.randomBytes(32).toString('hex');
    }

    createSession(data = {}) {
        const sessionId = this.generateSessionId();
        const session = {
            id: sessionId,
            data: data,
            createdAt: Date.now(),
            lastAccessed: Date.now(),
            isAuthenticated: false
        };

        this.sessions.set(sessionId, session);
        return session;
    }

    getSession(sessionId) {
        if (!sessionId) {
            return null;
        }

        const session = this.sessions.get(sessionId);
        if (!session) {
            return null;
        }

        // Check if session has expired
        if (this.isSessionExpired(session)) {
            this.destroySession(sessionId);
            return null;
        }

        // Update last accessed time
        session.lastAccessed = Date.now();
        return session;
    }

    getSessionId(req) {
        // Try to get session ID from cookie
        const cookies = this.parseCookies(req.headers.cookie);
        let sessionId = cookies[this.cookieName];

        // If no session ID in cookie, try Authorization header
        if (!sessionId && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                sessionId = authHeader.substring(7);
            }
        }

        return sessionId;
    }

    setSessionCookie(res, sessionId) {
        const cookieValue = `${this.cookieName}=${sessionId}; HttpOnly; Path=/; SameSite=Strict`;
        res.setHeader('Set-Cookie', cookieValue);
    }

    destroySession(sessionId) {
        return this.sessions.delete(sessionId);
    }

    isSessionExpired(session) {
        const now = Date.now();
        return (now - session.lastAccessed) > this.sessionTimeout;
    }

    authenticateSession(sessionId, userData = {}) {
        const session = this.getSession(sessionId);
        if (session) {
            session.isAuthenticated = true;
            session.data = { ...session.data, ...userData };
            return true;
        }
        return false;
    }

    isAuthenticated(sessionId) {
        const session = this.getSession(sessionId);
        return session ? session.isAuthenticated : false;
    }

    parseCookies(cookieHeader) {
        const cookies = {};
        if (cookieHeader) {
            cookieHeader.split(';').forEach(cookie => {
                const [name, value] = cookie.trim().split('=');
                if (name && value) {
                    cookies[name] = value;
                }
            });
        }
        return cookies;
    }

    startCleanupTimer() {
        setInterval(() => {
            this.cleanupExpiredSessions();
        }, this.cleanupInterval);
    }

    cleanupExpiredSessions() {
        const now = Date.now();
        let cleanedCount = 0;

        for (const [sessionId, session] of this.sessions.entries()) {
            if (this.isSessionExpired(session)) {
                this.sessions.delete(sessionId);
                cleanedCount++;
            }
        }

        if (cleanedCount > 0) {
            console.log(`Cleaned up ${cleanedCount} expired sessions`);
        }
    }

    getSessionCount() {
        return this.sessions.size;
    }

    getAllSessions() {
        return Array.from(this.sessions.values());
    }

    // Authorization middleware
    requireAuth(req, res, next) {
        const sessionId = this.getSessionId(req);
        if (!sessionId || !this.isAuthenticated(sessionId)) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Authentication required' }));
            return false;
        }
        
        if (next) next();
        return true;
    }
}

module.exports = SessionManager;
