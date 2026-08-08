const express = require('express');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(express.json({ limit: '30kb' }));

// Configure CORS - update origins as needed for deployment
app.use(cors({ origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:8080'] }));

// Basic rate limiting
const limiter = rateLimit({ windowMs: 60 * 1000, max: 30, standardHeaders: true, legacyHeaders: false });
app.use('/api/', limiter);

function sanitizeInput(text){
  if(typeof text !== 'string') return '';
  return text.trim().slice(0, 2000);
}

app.post('/api/assistant', async (req, res) => {
  try {
    const { message } = req.body;
    const userText = sanitizeInput(message);
    if (!userText) return res.status(400).json({ error: 'Empty message' });

    const API_KEY = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
    const AI_API_URL = process.env.AI_API_URL || 'https://api.openai.com/v1/chat/completions';
    const AI_MODEL = process.env.AI_MODEL || 'gpt-4o-mini';

    if (!API_KEY) return res.status(500).json({ error: 'AI API key not configured on the server' });

    const payload = {
      model: AI_MODEL,
      messages: [
        { role: 'system', content: 'You are a concise assistant answering questions about Willson Rai and his portfolio. Keep responses brief and helpful.' },
        { role: 'user', content: userText }
      ],
      temperature: 0.2,
      max_tokens: 512
    };

    const aiResp = await fetch(AI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!aiResp.ok) {
      const txt = await aiResp.text();
      console.error('AI provider error', aiResp.status, txt);
      return res.status(502).json({ error: 'AI provider error', details: txt });
    }

    const aiJson = await aiResp.json();
    const assistantText = (aiJson.choices && aiJson.choices[0] && aiJson.choices[0].message && aiJson.choices[0].message.content) || aiJson.text || JSON.stringify(aiJson);

    return res.json({ reply: assistantText });
  } catch (err) {
    console.error('Server error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AI proxy listening on port ${PORT}`));
