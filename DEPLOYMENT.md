# Backend Deployment Guide

## Commands Overview

### Local Development

```bash
# Install dependencies
npm install

# Run in development mode (with hot reload)
npm run dev

# Run tests
npm test
```

### Production Build & Deploy

```bash
# Build for production
npm run build

# Start production server locally
npm start

# Or with explicit NODE_ENV
npm run start:prod
```

## Railway Deployment

### Automatic Deployment

Railway will automatically:

1. Install dependencies: `npm ci --include=dev`
2. Build the project: `npm run build`
3. Start the server: `npm start`

### Required Environment Variables in Railway

Set these in Railway Dashboard > Variables:

```env
NODE_ENV=production
FIREBASE_ADMIN_KEY={"type":"service_account","project_id":"..."}
FRONTEND_URL=https://celestesaag.vercel.app
MERCADOPAGO_ACCESS_TOKEN=your_token_here
TWILIO_ACCOUNT_SID=your_sid_here
TWILIO_AUTH_TOKEN=your_token_here
TWILIO_PHONE_NUMBER=your_phone_here
```

### Manual Commands (if needed)

```bash
# SSH into Railway container (if available)
railway run bash

# Check logs
railway logs

# Restart service
railway up
```

## Vercel Frontend Configuration

Ensure your frontend has this environment variable:

```env
NEXT_PUBLIC_BACKEND_URL=https://your-railway-app.up.railway.app
```

## Health Check

After deployment, verify the backend is running:

```bash
curl https://your-railway-app.up.railway.app/health
```

Expected response:

```json
{
  "status": "ok",
  "timestamp": "2025-11-17T...",
  "uptime": 123.45,
  "firebase": true,
  "environment": "production",
  "routesLoaded": true
}
```

## Troubleshooting

### 502 Bad Gateway

1. Check Railway logs for startup errors
2. Verify `FIREBASE_ADMIN_KEY` is valid JSON
3. Ensure PORT is not hardcoded (Railway assigns it automatically)
4. Check CORS configuration allows your frontend domain

### Build Fails

1. Ensure all dependencies are in `package.json`
2. Check TypeScript errors: `npm run build` locally
3. Verify `tsconfig.json` paths are correct

### Runtime Errors

1. Check environment variables are set
2. Verify Firebase credentials
3. Check Railway logs: `railway logs`

## Port Configuration

**Important**: Railway automatically assigns the PORT environment variable.
Do NOT hardcode the port. The app uses:

```typescript
const PORT = Number(process.env.PORT) || 5000;
```

## Build Output

After `npm run build`, the compiled JavaScript will be in the `dist/` folder:

```
dist/
├── index.js          # Main entry point
├── app.js            # Express app
├── config/           # Configuration files
├── controllers/      # Route controllers
└── ...
```

The production server runs: `node dist/index.js`
