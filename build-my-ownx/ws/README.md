# Basic Web Server

A lightweight, feature-rich web server implementation built from scratch in Node.js. This project demonstrates the core concepts of web server development including routing, session management, authentication, and authorization.

## Features

- **🚀 Dynamic Routing** - URL routing with parameter support (e.g., `/api/users/:userId`)
- **🔐 Session Management** - Cookie-based sessions with automatic cleanup
- **🛡️ Authentication & Authorization** - Login/logout with protected routes
- **⏰ Session Expiration** - Automatic cleanup of expired sessions
- **🌐 CORS Support** - Cross-origin resource sharing enabled
- **📊 Server Statistics** - Real-time server metrics
- **🎨 Web Interface** - Complete HTML/CSS/JS frontend

## Architecture

The web server consists of three core components:

### Core Files

1. **server.js** - Main web server class that handles HTTP requests and responses
2. **router.js** - Manages URL routing and parameter extraction
3. **sessionManager.js** - Handles session creation, validation, and cleanup

### Application Files

- **app.js** - Example application demonstrating all features
- **public/** - Static web assets (HTML, CSS, JavaScript)
- **test.js** - Comprehensive test suite

## Quick Start

1. **Install dependencies** (if any):
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   node app.js
   ```

3. **Open your browser** and visit:
   - http://localhost:3000 - Main interface
   - http://localhost:3000/login - Login page

4. **Run tests**:
   ```bash
   node test.js
   ```

## API Endpoints

### Public Endpoints
- `GET /` - Home page
- `GET /login` - Login page
- `POST /api/login` - Authenticate user
- `POST /api/logout` - Logout user
- `GET /api/session` - Get session information
- `GET /api/stats` - Server statistics

### Protected Endpoints (require authentication)
- `GET /api/protected` - Protected resource
- `GET /api/users/:userId` - User profile (demonstrates URL parameters)

## Usage Examples

### Basic Server Setup

```javascript
const WebServer = require('./server');

// Create server instance
const app = new WebServer(3000);

// Add routes
app.get('/hello', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!');
});

// Start server
app.start();
```

### Authentication Example

```javascript
// Login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = await getRequestBody(req);

    if (authenticate(username, password)) {
        const session = app.sessionManager.createSession();
        app.sessionManager.authenticateSession(session.id, { username });
        app.sessionManager.setSessionCookie(res, session.id);

        sendJSON(res, { success: true });
    } else {
        sendJSON(res, { success: false }, 401);
    }
});

// Protected route
app.get('/api/protected', (req, res) => {
    if (!app.sessionManager.requireAuth(req, res)) {
        return; // Authentication failed
    }

    sendJSON(res, { message: 'Access granted!' });
});
```

## Demo Credentials

- **Username**: admin
- **Password**: password

## Testing

The included test suite verifies all major functionality:

```bash
node test.js
```

Tests cover:
- ✅ HTTP request handling
- ✅ Routing with URL parameters
- ✅ Session management
- ✅ Authentication and authorization
- ✅ Cookie handling
- ✅ Protected routes
- ✅ JSON API responses

## Project Structure

```
ws/
├── server.js           # Main web server class
├── router.js           # URL routing engine
├── sessionManager.js   # Session management
├── app.js             # Example application
├── test.js            # Test suite
├── package.json       # Project configuration
├── README.md          # This file
└── public/            # Static web assets
    ├── index.html     # Main page
    ├── login.html     # Login page
    ├── style.css      # Styles
    └── app.js         # Frontend JavaScript
```
