# Vibe + Auth0 (Vue 3 + Vite)

A minimal Vue 3 app (Vite) with Auth0 login protecting a simple Hello World route.

## Quick start

1) Copy env file and fill in your Auth0 values:

- Domain: `your-tenant.us.auth0.com`
- Client ID: SPA application client ID

```sh
cp .env.example .env.local
```

Edit `.env.local`:

```sh
VITE_AUTH0_DOMAIN=your-tenant.us.auth0.com
VITE_AUTH0_CLIENT_ID=abc123YourClientId
# VITE_AUTH0_AUDIENCE=https://api.example.com
```

2) Configure Auth0 Application (Single Page App):

- Allowed Callback URLs: `http://localhost:5173`
- Allowed Logout URLs: `http://localhost:5173`
- Allowed Web Origins: `http://localhost:5173`

Tip: If you sometimes use `127.0.0.1`, add 
`http://127.0.0.1:5173` and `http://127.0.0.1:5173/callback` too.

3) Install and run:

```sh
npm install
npm run dev
```

Open http://localhost:5173 — you’ll be redirected to Auth0 before accessing `/hello`.

## Notes

- Redirect style: This app uses origin-only redirect. If you prefer a dedicated `/callback` route, set `redirect_uri` in `src/main.js` to `${window.location.origin}/callback` and change Allowed Callback accordingly.
- Port stability: Vite is pinned to `5173` with `strictPort` to avoid allowlist mismatches.
- Silent auth on Safari/Brave: If needed for dev, you can enable `useRefreshTokens` and `cacheLocation: 'localstorage'` in `src/main.js` (commented), noting the XSS trade-offs.

## Structure

- `src/main.js`: Vue app + Auth0 plugin
- `src/router/index.js`: Routes with `authGuard` on `/hello`
- `src/views/HelloWorld.vue`: Protected page
- `src/components/LoginButton.vue`, `LogoutButton.vue`, `Profile.vue`
