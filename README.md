# JS Fetch document

## How to run

- install package

```bash
npm install
```

- automatic creating the mock data

```bash
npm run generate
```

- start the application

```bash
npm run start
```

## Notes

### only-if-cached

Works only under certain conditions

- Requests must be of the same origin
- The mode option must be set to 'same-origin'. The default 'cors' will not work.

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

#### App.tsx ... fetchData

changed default mode of fetch from 'cors' to 'same-origin' if only-if-cached

```tsx
if (cacheStrategy === "only-if-cached") {
  requestInit.mode = "same-origin";
}
```

## Workflow

### Default

```mermaid
flowchart TD
    Start[Fetch Request Initiated] --> CheckCacheControl[ Cache-Control Header]
    CheckCacheControl --> IsCacheValid{Is Cache Valid?}
    IsCacheValid -->|Yes| ServeFromCache[Serve Data from Cache]
    IsCacheValid -->|No| FetchFromNetwork[Fetch Data from Network]
    FetchFromNetwork --> StoreInCache[Store Data in Cache]
    FetchFromNetwork --> ServeData[Serve Data to User]
```

### No-store

```mermaid
flowchart TD
    Start[Fetch Request Initiated] --> IgnoreCache[Ignore Cache]
    IgnoreCache --> FetchNetwork[Fetch Data from Network]
    FetchNetwork --> ServeData[Serve Data to User]
    FetchNetwork --> DoNotStore[Do Not Store in Cache]
```

### Reload

```mermaid
flowchart TD
    Start[Fetch Request Initiated] --> IgnoreCache[Ignore Existing Cache]
    IgnoreCache --> FetchNetwork[Fetch Data from Network]
    FetchNetwork --> UpdateCache[Update Cache with Response]
    FetchNetwork --> ServeData[Serve Data to User]
```

### Force-cache

```mermaid
flowchart TD
    Start[Fetch Request Initiated] --> CheckCache{Is Data in Cache?}

    CheckCache -->|Yes| ServeFromCache[Serve Data from Cache]
    CheckCache -->|No| FetchFromNetwork[Fetch Data from Network]
    FetchFromNetwork --> StoreInCache[Store Data in Cache]
    FetchFromNetwork --> ServeData[Serve Data to User]
```

### Only-if-cached

```mermaid
flowchart TD
    Start[Fetch Request Initiated] --> UseOnlyIfCached[" 'only-if-cached' Strategy"]
    UseOnlyIfCached --> CheckCache{Is Data in Cache?}
    CheckCache -->|Yes| ServeCache[Serve Data from Cache]
    CheckCache -->|No| FailRequest[Fail the Request]
```
