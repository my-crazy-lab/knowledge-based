// Main application JavaScript

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
});

async function checkAuthStatus() {
    try {
        const response = await fetch('/api/session');
        const session = await response.json();
        
        const authMessage = document.getElementById('authMessage');
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (session.authenticated) {
            authMessage.innerHTML = `
                <span style="color: #38a169;">✓ Authenticated</span><br>
                <small>User: ${session.data.username || 'Unknown'}</small><br>
                <small>Session created: ${new Date(session.createdAt).toLocaleString()}</small>
            `;
            if (logoutBtn) {
                logoutBtn.style.display = 'inline-block';
                logoutBtn.onclick = logout;
            }
        } else {
            authMessage.innerHTML = '<span style="color: #e53e3e;">✗ Not authenticated</span>';
            if (logoutBtn) {
                logoutBtn.style.display = 'none';
            }
        }
    } catch (error) {
        document.getElementById('authMessage').innerHTML = '<span style="color: #e53e3e;">Error checking status</span>';
    }
}

async function logout() {
    try {
        const response = await fetch('/api/logout', { method: 'POST' });
        const result = await response.json();
        
        if (result.success) {
            updateOutput('Logout successful');
            checkAuthStatus();
        }
    } catch (error) {
        updateOutput('Logout failed: ' + error.message);
    }
}

async function testRouting() {
    try {
        const userId = Math.floor(Math.random() * 1000);
        const response = await fetch(`/api/users/${userId}`);
        const result = await response.json();
        
        updateOutput(`Routing Test (GET /api/users/${userId}):\n${JSON.stringify(result, null, 2)}`);
    } catch (error) {
        updateOutput('Routing test failed: ' + error.message);
    }
}

async function checkSession() {
    try {
        const response = await fetch('/api/session');
        const session = await response.json();
        
        updateOutput(`Session Information:\n${JSON.stringify(session, null, 2)}`);
    } catch (error) {
        updateOutput('Session check failed: ' + error.message);
    }
}

async function testProtected() {
    try {
        const response = await fetch('/api/protected');
        const result = await response.json();
        
        if (response.ok) {
            updateOutput(`Protected Route Access:\n${JSON.stringify(result, null, 2)}`);
        } else {
            updateOutput(`Protected Route Access Failed:\n${JSON.stringify(result, null, 2)}\n\nTip: Login first to access protected routes!`);
        }
    } catch (error) {
        updateOutput('Protected route test failed: ' + error.message);
    }
}

async function getStats() {
    try {
        const response = await fetch('/api/stats');
        const stats = await response.json();
        
        updateOutput(`Server Statistics:\n${JSON.stringify(stats, null, 2)}`);
    } catch (error) {
        updateOutput('Stats request failed: ' + error.message);
    }
}

function updateOutput(content) {
    const outputElement = document.getElementById('outputContent');
    if (outputElement) {
        outputElement.textContent = content;
    }
}

// Utility function for making API calls with error handling
async function apiCall(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        const data = await response.json();
        return { success: response.ok, data, status: response.status };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
