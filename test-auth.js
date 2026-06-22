const testApi = async () => {
  try {
    console.log("1. Testing Registration...");
    const regRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test User', email: 'test2@example.com', password: 'password123' })
    });
    const regText = await regRes.text();
    try {
      const regData = JSON.parse(regText);
      console.log("Register Response:", regRes.status, regData);
    } catch (e) {
      console.log("Register Response (Raw):", regRes.status, regText);
    }

    console.log("\n2. Testing Login...");
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test2@example.com', password: 'password123' })
    });
    const loginData = await loginRes.json();
    console.log("Login Response:", loginRes.status, loginData);
  } catch (error) {
    console.error("Test failed:", error);
  }
};
testApi();
