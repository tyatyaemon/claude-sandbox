require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/time', (req, res) => {
  res.json({ time: new Date().toISOString() });
});

app.post('/echo', (req, res) => {
  res.json(req.body);
});

// POST /sum: { "nums": [1, 2, 3.5] } -> { "total": 6.5 }
app.post('/sum', (req, res) => {
  const nums = Array.isArray(req.body?.nums) ? req.body.nums : [];
  const ok = nums.every(n => typeof n === 'number' && Number.isFinite(n));
  if (!ok) return res.status(400).json({ error: 'nums は数値配列で送ってください' });
  const total = nums.reduce((a, b) => a + b, 0);
  res.json({ total });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});