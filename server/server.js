import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock Database
const users = [];
const mockOTPs = {}; // { email: { otp: '123456', expires: Date.now() + 300000 } }

app.post('/api/auth/request-otp', (req, res) => {
    const { email } = req.body;
    
    // In a mock environment, we allow any email to request an OTP
    // For registration, they don't exist yet!

    // Generate 6-digit OTP (Fixed for easy testing)
    const otp = '123456';
    mockOTPs[email] = {
        otp,
        expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    };

    console.log(`[MOCK EMAIL] OTP for ${email}: ${otp}`);
    res.json({ msg: 'OTP sent to your email (Check console for mock OTP)' });
});

app.post('/api/auth/verify-otp', (req, res) => {
    const { email, otp, role } = req.body;
    const stored = mockOTPs[email];

    if (!stored || stored.otp !== otp || stored.expires < Date.now()) {
        return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    // Clear OTP
    delete mockOTPs[email];

    // Find user
    const user = users.find(u => u.email === email) || (email === 'demo@test.com' ? { name: 'Demo User', email } : null);
    
    res.json({ 
        token: 'mock-jwt-token-otp', 
        user: { name: user.name, email: user.email, role: role || 'student' } 
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    // Find user in "database"
    const user = users.find(u => u.email === email && u.password === password);
    
    // Simple mock auth with demo fallback
    if (user) {
        res.json({ token: 'mock-jwt-token', user: { name: user.name, email: user.email } });
    } else if (email === 'demo@test.com' && password === 'demo123') {
        res.json({ token: 'mock-jwt-token', user: { name: 'Demo User', email: 'demo@test.com' } });
    } else {
        res.status(401).json({ msg: 'Invalid credentials. Use demo@test.com / demo123 for demo.' });
    }
});

app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ msg: 'User already exists' });
    }
    users.push({ name, email, password });
    res.json({ msg: 'User registered successfully' });
});

app.post('/api/ai/chat', (req, res) => {
    const { message } = req.body;
    // Mock AI logic
    setTimeout(() => {
        res.json({ reply: `I can help you with "${message}". (This is a mock AI response from the server)` });
    }, 1000);
});

app.get('/', (req, res) => {
    res.send('Virtual Classroom API Running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
