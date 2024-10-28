# JS Fetch document

## Notes

### only-if-cached

Works only under certain conditions

- Requests must be of the same origin

#### Vite configuration

Modified to use vite's default proxy settings to represent the same origin

```mermaid
sequenceDiagram
    participant Browser
    participant ViteDevServer
    participant BackendServer

    Browser->>ViteDevServer: GET /api/posts
    activate ViteDevServer
    ViteDevServer->>ViteDevServer: Rewrite path to /posts
    ViteDevServer->>BackendServer: GET /posts
    activate BackendServer
    BackendServer-->>ViteDevServer: Response Data
    deactivate BackendServer
    ViteDevServer-->>Browser: Response Data
    deactivate ViteDevServer
```

- The mode option must be set to 'same-origin'. The default 'cors' will not work.

#### App.tsx ... fetchData

changed default mode of fetch from 'cors' to 'same-origin' if only-if-cached

```tsx
if (cacheStrategy === 'only-if-cached') {
  requestInit.mode = 'same-origin';
}
```

## How to run

1. install package

```bash
npm install
```

2. automatic creating the mock data

```bash
cd mock-server && node generateData.js
```

3. start up docker for json server

```bash
cd mock-server && docker componse up -d
```
