# Firebase Configuration for Railway

## The Problem

Railway (and most cloud platforms) don't allow you to upload files directly. Your `firebase-admin-key.json` needs to be set as an environment variable, but it contains special characters (newlines in the private key) that can cause parsing issues.

## Solution - Step by Step

### Method 1: Using the Helper Script (Recommended)

1. **Run the helper script:**

   ```bash
   npm run generate-env
   ```

2. **Copy the output** - It will display the JSON as a single-line string

3. **Set in Railway:**
   - Go to Railway Dashboard → Your Backend Service → **Variables**
   - Click **"New Variable"**
   - Variable name: `FIREBASE_ADMIN_KEY`
   - Value: Paste the entire JSON string (including `{` and `}`)
   - Click **"Add"**

### Method 2: Manual Setup

1. **Copy your firebase-admin-key.json content**

2. **Minify it** (remove all line breaks and extra spaces):

   - You can use: https://www.jsonformatter.io/json-minifier
   - Or run: `cat firebase-admin-key.json | jq -c`

3. **Set in Railway:**
   - Variable name: `FIREBASE_ADMIN_KEY`
   - Value: Paste the minified JSON
   - Example:
     ```json
     {
       "type": "service_account",
       "project_id": "your-project",
       "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n",
       "client_email": "..."
     }
     ```

## Important Notes

### The Private Key Format

The `private_key` field contains `\n` (escaped newlines). This is correct! Do NOT try to remove them.

**Correct format:**

```
"private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBg...\n-----END PRIVATE KEY-----\n"
```

**Wrong format:**

```
"private_key":"-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBg...
-----END PRIVATE KEY-----"
```

### Railway Variable Format

When you paste into Railway, it should look like this (one continuous line):

```
{"type":"service_account","project_id":"celestesaag-5b511","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-fbsvc@celestesaag-5b511.iam.gserviceaccount.com",...}
```

### Required Environment Variables in Railway

Set these in **Railway Dashboard → Variables**:

```
NODE_ENV=production
FIREBASE_ADMIN_KEY=<your-json-string-here>
FRONTEND_URL=https://celestesaag.vercel.app
MERCADOPAGO_ACCESS_TOKEN=<your-token>
TWILIO_ACCOUNT_SID=<your-sid>
TWILIO_AUTH_TOKEN=<your-token>
TWILIO_PHONE_NUMBER=<your-phone>
```

## Verify It Works

After deploying, check the logs in Railway. You should see:

```
📝 Parsing FIREBASE_ADMIN_KEY...
✅ FIREBASE_ADMIN_KEY parsed successfully
📋 Project ID: celestesaag-5b511
✅ Firebase initialized successfully
```

If you see errors about JSON parsing or private key format, the environment variable is incorrectly formatted.

## Testing Locally

To test with environment variables locally:

1. **Create a `.env` file** (already in .gitignore):

   ```bash
   npm run generate-env
   ```

2. **Copy the output to `.env`:**

   ```env
   FIREBASE_ADMIN_KEY={"type":"service_account",...}
   ```

3. **Run the app:**
   ```bash
   npm run dev
   ```

## Troubleshooting

### Error: "Unexpected token in JSON"

- The JSON string is malformed
- Check for missing quotes or brackets
- Re-run `npm run generate-env` and copy exactly

### Error: "Invalid PEM formatted message"

- The `\n` characters in private_key were removed or corrupted
- The private key needs `\n` to represent line breaks
- Make sure you copied the entire string without modifications

### Error: "Firebase configuration error"

- Check Railway logs for the specific error message
- The updated config now shows a preview of the raw key to help debug
- Verify the variable name is exactly: `FIREBASE_ADMIN_KEY` (case-sensitive)

### Still Getting 502?

1. Check Railway deployment logs for the exact error
2. Verify all environment variables are set
3. Check the health endpoint: `https://your-app.railway.app/health`
4. Look for "Firebase initialized successfully" in logs

## Security Note

**Never commit your firebase-admin-key.json or the environment variable string to Git!**

Both files are already in `.gitignore`:

- `firebase-admin-key.json`
- `firebase-env-variable.txt`
