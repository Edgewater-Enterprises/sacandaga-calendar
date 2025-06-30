# sacandaga

Calendar app for coordinating stays at our family lake house.

## Development

Install [Bun](https://bun.sh).

Install dependencies and launch:

```bash
bun install
bun run dev
```

## Production

Build client and compile server to standalone binary:

```bash
bun run build
bun run compile
```

Start server by executing the compiled `main` binary or by running:

```bash
bun run start
```

Alternatively, build and run in a Docker container:

```bash
docker build -t sacandaga .
docker run -p 3000:3000 sacandaga
```

## Stack

- [Bun](https://bun.sh) - server runtime, package manager, script runner
- [Elysia](https://elysiajs.com) - server framework
- [React](https://react.dev) - user interface
- [TanStack Router](https://tanstack.com/router) - client-side routing
- [TanStack Query](https://tanstack.com/query) - async state management
- [TypeScript](https://www.typescriptlang.org), [Biome](https://biomejs.dev), [Lefthook](https://lefthook.dev) - code quality/style
- [Vite](https://vite.dev) - dev server, bundler
