# Platform Service Status Radiator (Vue 3 + Vite)

Clustered status dashboard protected by Auth0, built with Vue 3 and Vite.

## Prerequisites

- Node.js 18+ (for local dev)
- Docker (optional, for containerized run)
- Auth0 SPA application credentials

## Environment

Create `.env.local` with your Auth0 values (used at build time by Vite):

```zsh
VITE_AUTH0_DOMAIN=dev-vb8cbvl4lozme5lp.us.auth0.com
VITE_AUTH0_CLIENT_ID=IojqxVGVuP1mdos6bOFReOOUVsXiJTNV
# VITE_AUTH0_AUDIENCE=https://api.example.com
```

Auth0 allowlists (for local runs on port `5173`):

- Allowed Callback URLs: `http://localhost:5173`
- Allowed Logout URLs: `http://localhost:5173`
- Allowed Web Origins: `http://localhost:5173`

If you access the container via a different host (e.g., `http://127.0.0.1:5173` or your machine IP), add those exact origins to **Allowed Web Origins** as well. The popup flow requires an exact origin match.

## Local Development

Run the Vite dev server on `5173`:

```zsh
npm install
npm run dev
```

## Production Build (Preview)

Build and preview the production bundle on `5173`:

```zsh
npm install
npm run build
npm run preview -- --host 0.0.0.0 --port 5173
```

## Docker (NGINX on port 5173)

Multi-stage image builds the app and serves via NGINX listening on `5173`.

Build using `.env.local` (recommended):

```zsh
docker build -t platform-status .
docker run --rm -p 5173:5173 platform-status
```

Alternatively, override `VITE_*` at build time:

```zsh
docker build \
	--build-arg VITE_AUTH0_DOMAIN=dev-vb8cbvl4lozme5lp.us.auth0.com \
	--build-arg VITE_AUTH0_CLIENT_ID=IojqxVGVuP1mdos6bOFReOOUVsXiJTNV \
	-t platform-status .
docker run --rm -p 5173:5173 platform-status
```

Notes:

- SPA routing: NGINX is configured with `try_files $uri /index.html;` so routes like `/status` and `/splash` work.
- Dev proxies: Vite dev-only proxies do not exist in NGINX; production calls go directly to HTTPS service hosts. Ensure CORS allows `http://localhost:5173` on those services.
- Runtime config: `VITE_*` are baked at build. Changing them requires rebuild unless you add a runtime injection layer.

### Service access in Docker

The container includes NGINX reverse proxy routes for dev/staging/prod clusters, and builds default to proxy mode.

- Default: `VITE_USE_PROXY=true` causes the SPA to call cluster-prefixed paths (e.g., `/dev/<service>/info`), which NGINX proxies to the appropriate service hosts. This avoids CORS.
- Direct mode: If services are CORS-standardized and publicly reachable, you can disable proxying by rebuilding with `--build-arg VITE_USE_PROXY=false`. In that case, the SPA calls the HTTPS service hosts directly.

Examples:

Proxy mode (default):

```zsh
DOCKER_BUILDKIT=1 docker build -t platform-status .
docker run --rm -p 5173:5173 platform-status
```

Direct mode (disable proxying):

```zsh
DOCKER_BUILDKIT=1 docker build --build-arg VITE_USE_PROXY=false -t platform-status .
docker run --rm -p 5173:5173 platform-status
```

## Private npm registries (CodeArtifact)

If dependencies are from a private registry (e.g., AWS CodeArtifact), use Docker BuildKit secrets to provide your `.npmrc` at build time without baking credentials into the image.

- Enable BuildKit and mount your local `.npmrc`:

```zsh
DOCKER_BUILDKIT=1 docker build \
	--secret id=npmrc,src=$HOME/.npmrc \
	-t platform-status .
```

- The `Dockerfile` uses `RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci` in the builder stage, which reads the secret `.npmrc` only during the install step.

- Optional: generate a short-lived token `.npmrc` (example with CodeArtifact; replace placeholders):

```zsh
TOKEN=$(aws codeartifact get-authorization-token \
	--domain <domain> \
	--domain-owner <account_id> \
	--query authorizationToken --output text)

cat > /tmp/npmrc <<'EOF'
always-auth=true
@your-scope:registry=https://<domain>-<repo>.codeartifact.<region>.amazonaws.com/npm/<repo>/
//<domain>-<repo>.codeartifact.<region>.amazonaws.com/npm/<repo>/:_authToken=${TOKEN}
EOF

DOCKER_BUILDKIT=1 docker build \
	--secret id=npmrc,src=/tmp/npmrc \
	-t platform-status .
```

- Fallback (least secure): install on host and build without registry access:
	- Run `npm ci` locally, then build the image; this approach avoids credentials in Docker but couples the image to local `node_modules` state.

## App Highlights

- Auth0 popup login with origin-only redirect
- Tabs per cluster (dev/staging/prod) with per-tab refresh
- Bootstrap layout; service cards capped to two columns
- Services listed alphabetically per cluster
