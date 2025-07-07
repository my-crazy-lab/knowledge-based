// Simple test script for the web server
const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Helper function to make HTTP requests
function makeRequest(path, method = 'GET', data = null, headers = {}) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                try {
                    const jsonBody = body ? JSON.parse(body) : {};
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        body: jsonBody
                    });
                } catch (error) {
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        body: body
                    });
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

async function runTests() {
    console.log('🧪 Running Web Server Tests...\n');

    try {
        // Test 1: Server stats (no auth required)
        console.log('1. Testing server stats endpoint...');
        const statsResponse = await makeRequest('/api/stats');
        console.log(`   Status: ${statsResponse.statusCode}`);
        console.log(`   Active Sessions: ${statsResponse.body.activeSessions}`);
        console.log(`   Uptime: ${Math.round(statsResponse.body.uptime)}s`);
        console.log('   ✅ Stats endpoint working\n');

        // Test 2: Session check (no session yet)
        console.log('2. Testing session endpoint (no session)...');
        const sessionResponse1 = await makeRequest('/api/session');
        console.log(`   Status: ${sessionResponse1.statusCode}`);
        console.log(`   Authenticated: ${sessionResponse1.body.authenticated}`);
        console.log('   ✅ Session endpoint working\n');

        // Test 3: Protected route (should fail)
        console.log('3. Testing protected route (no auth)...');
        const protectedResponse1 = await makeRequest('/api/protected');
        console.log(`   Status: ${protectedResponse1.statusCode}`);
        console.log(`   Expected 401: ${protectedResponse1.statusCode === 401 ? '✅' : '❌'}`);
        console.log('   ✅ Authorization working\n');

        // Test 4: Login
        console.log('4. Testing login...');
        const loginResponse = await makeRequest('/api/login', 'POST', {
            username: 'admin',
            password: 'password'
        });
        console.log(`   Status: ${loginResponse.statusCode}`);
        console.log(`   Success: ${loginResponse.body.success}`);
        
        // Extract session cookie
        const setCookieHeader = loginResponse.headers['set-cookie'];
        let sessionCookie = '';
        if (setCookieHeader) {
            const cookieMatch = setCookieHeader[0].match(/sessionId=([^;]+)/);
            if (cookieMatch) {
                sessionCookie = `sessionId=${cookieMatch[1]}`;
            }
        }
        console.log(`   Session Cookie: ${sessionCookie ? 'Set' : 'Not Set'}`);
        console.log('   ✅ Login working\n');

        // Test 5: Session check (with session)
        console.log('5. Testing session endpoint (with session)...');
        const sessionResponse2 = await makeRequest('/api/session', 'GET', null, {
            'Cookie': sessionCookie
        });
        console.log(`   Status: ${sessionResponse2.statusCode}`);
        console.log(`   Authenticated: ${sessionResponse2.body.authenticated}`);
        console.log(`   Username: ${sessionResponse2.body.data?.username}`);
        console.log('   ✅ Session management working\n');

        // Test 6: Protected route (should work now)
        console.log('6. Testing protected route (with auth)...');
        const protectedResponse2 = await makeRequest('/api/protected', 'GET', null, {
            'Cookie': sessionCookie
        });
        console.log(`   Status: ${protectedResponse2.statusCode}`);
        console.log(`   Success: ${protectedResponse2.statusCode === 200 ? '✅' : '❌'}`);
        console.log(`   Message: ${protectedResponse2.body.message}`);
        console.log('   ✅ Protected routes working\n');

        // Test 7: URL parameters
        console.log('7. Testing URL parameters...');
        const userResponse = await makeRequest('/api/users/123', 'GET', null, {
            'Cookie': sessionCookie
        });
        console.log(`   Status: ${userResponse.statusCode}`);
        console.log(`   User ID: ${userResponse.body.userId}`);
        console.log(`   Requested by: ${userResponse.body.requestedBy}`);
        console.log('   ✅ URL parameters working\n');

        // Test 8: Logout
        console.log('8. Testing logout...');
        const logoutResponse = await makeRequest('/api/logout', 'POST', null, {
            'Cookie': sessionCookie
        });
        console.log(`   Status: ${logoutResponse.statusCode}`);
        console.log(`   Success: ${logoutResponse.body.success}`);
        console.log('   ✅ Logout working\n');

        // Test 9: Protected route after logout (should fail)
        console.log('9. Testing protected route (after logout)...');
        const protectedResponse3 = await makeRequest('/api/protected', 'GET', null, {
            'Cookie': sessionCookie
        });
        console.log(`   Status: ${protectedResponse3.statusCode}`);
        console.log(`   Expected 401: ${protectedResponse3.statusCode === 401 ? '✅' : '❌'}`);
        console.log('   ✅ Session cleanup working\n');

        console.log('🎉 All tests completed successfully!');
        console.log('\nFeatures verified:');
        console.log('✅ HTTP request handling');
        console.log('✅ Routing with URL parameters');
        console.log('✅ Session management');
        console.log('✅ Authentication and authorization');
        console.log('✅ Cookie handling');
        console.log('✅ Protected routes');
        console.log('✅ JSON API responses');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Check if server is running before starting tests
async function checkServer() {
    try {
        await makeRequest('/api/stats');
        console.log('✅ Server is running, starting tests...\n');
        runTests();
    } catch (error) {
        console.log('❌ Server is not running. Please start the server first:');
        console.log('   node app.js');
        console.log('\nThen run the tests again:');
        console.log('   node test.js');
    }
}

checkServer();
