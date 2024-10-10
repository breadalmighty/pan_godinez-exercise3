const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');
const expressRateLimit = require('express-rate-limit');
const https = require('https');
const fs = require('fs');
const Joi = require('joi');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

const SECRET_KEY = 'your-secret-key';

// Rate limiting
const limiter = expressRateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

// HTTPS server with OPENSSL key and cert
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};
const httpsAgent = new https.Agent({
  rejectUnauthorized: false 
});
const server = https.createServer(options, app);
server.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});

// Users
const users = [
  { id: 1, username: 'customer', password: bcrypt.hashSync('password123', 10), role: 'customer' },
  { id: 2, username: 'order', password: bcrypt.hashSync('password123', 10), role: 'order' },
  { id: 3, username: 'product', password: bcrypt.hashSync('password123', 10), role: 'product' }
];

// User login validation
const loginSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required()
});

// Login route with JWT
app.post('/login', async (req, res) => {
  const { error } = loginSchema.validate(req.body);  
  if (error) {
      return res.status(400).json({ message: error.details[0].message });
  }

  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  
  if (!validPassword) {
      return res.status(400).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Middleware to verify JWT token and check role
function authenticateToken(requiredRoles) {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      
      if (requiredRoles && !requiredRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Access forbidden: insufficient rights' });
      }
      
      req.user = user;
      next();
    });
  };
}

// Routes
app.use('/customer', authenticateToken(['customer']), async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `https://localhost:3002${req.path}`,
      data: req.body,
      httpsAgent: httpsAgent 
    });
    res.json(response.data);
  } catch (err) {
    console.error('Error communicating with Customer Service:', err.message);
    res.status(err.response?.status || 500).json({
      message: 'Error communicating with Customer Service',
      error: err.response?.data || err.message
    });
  }
});

app.use('/order', authenticateToken(['order']), async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `https://localhost:3003${req.path}`,
      data: req.body,
      httpsAgent: httpsAgent 
    });
    res.json(response.data);
  } catch (err) {
    console.error('Error communicating with Order Service:', err.message);
    res.status(err.response?.status || 500).json({
      message: 'Error communicating with Order Service',
      error: err.response?.data || err.message
    });
  }
});

app.use('/product', authenticateToken(['product']), async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `https://localhost:3001${req.path}`,
      data: req.body,
      httpsAgent: httpsAgent 
    });
    res.json(response.data);
  } catch (err) {
    console.error('Error communicating with Product Service:', err.message);
    res.status(err.response?.status || 500).json({
      message: 'Error communicating with Product Service',
      error: err.response?.data || err.message
    });
  }
});
