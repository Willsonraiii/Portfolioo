# AI proxy server

This small Express server exposes a single endpoint POST /api/assistant that forwards messages to an AI provider using a server-side API key.

Setup
1. cd server
2. npm install
3. Create a .env file (do NOT commit) with:

AI_API_KEY=sk-...
AI_API_URL=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-4o-mini
CORS_ORIGIN=http://localhost:8080
PORT=3000

4. npm start

Notes
- Keep your API key secret; do not put it in client-side code.
- Configure CORS_ORIGIN to match your site origins.
- Add moderation checks before forwarding to the LLM for public sites.
