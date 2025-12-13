const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5000/api';
let adminToken = '';

async function loginAdmin() {
    console.log('\n--- Logging in as Admin ---');
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin4@example.com', // Assuming this admin exists from seed
                password: 'password@123'
            })
        });
        const data = await response.json();
        if (data.token) {
            adminToken = data.token;
            console.log('✅ Admin logged in successfully');
        } else {
            console.error('❌ Login failed:', data);
        }
    } catch (err) {
        console.error('❌ Login error:', err.message);
    }
}

async function testGetSweets() {
    console.log('\n--- Testing GET /api/sweets ---');
    try {
        const response = await fetch(`${BASE_URL}/sweets`);
        const data = await response.json();
        console.log(`✅ Status: ${response.status}`);
        console.log(`📦 Got ${data.length} sweets`);
    } catch (err) {
        console.error('❌ Error:', err.message);
    }
}

async function testSearchSweets() {
    console.log('\n--- Testing GET /api/sweets/search ---');
    try {
        const response = await fetch(`${BASE_URL}/sweets/search?name=chocolate`);
        const data = await response.json();
        console.log(`✅ Status: ${response.status}`);
        console.log(`🔍 Found ${data.length} sweets matching "chocolate"`);
    } catch (err) {
        console.error('❌ Error:', err.message);
    }
}

async function testAddSweet() {
    console.log('\n--- Testing POST /api/sweets (Admin) ---');
    if (!adminToken) {
        console.log('⚠️ Skipping (No admin token)');
        return;
    }
    try {
        const newSweet = {
            name: "Test Sweet " + Date.now(),
            category: "Test",
            price: 50,
            quantity: 100,
            description: "A sweet for testing API"
        };
        const response = await fetch(`${BASE_URL}/sweets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`
            },
            body: JSON.stringify(newSweet)
        });
        const data = await response.json();
        console.log(`✅ Status: ${response.status}`);
        console.log(`➕ Created sweet: ${data.name} (ID: ${data.id})`);
        return data.id;
    } catch (err) {
        console.error('❌ Error:', err.message);
    }
}

async function main() {
    await testGetSweets();
    await testSearchSweets();
    await loginAdmin();
    const newSweetId = await testAddSweet();

    if (newSweetId) {
        // Add verify Update and Delete if needed, but this covers the basics
        console.log(`\nYou can verify Update and Delete manually with ID: ${newSweetId}`);
    }
}

main();
