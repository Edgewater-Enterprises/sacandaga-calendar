# sacandaga-calendar

Calendar app for coordinating stays at our family lake house.

### Setup

1. Install [Git](https://git-scm.com/downloads), [Bun](https://bun.sh/docs/installation), and optionally [Docker](https://docs.docker.com/get-docker) (useful for testing production builds locally)

2. Clone this repository and install dependencies:

```bash
git clone https://github.com/Edgewater-Enterprises/sacandaga-calendar.git
cd sacandaga-calendar
bun install
```

### Local Development

Run the Elysia backend and Vite dev server concurrently:

```bash
bun dev
```

### Production Build

**Option 1:** Bundle client and start server:

```bash
bun bundle
bun start
```

**Option 2:** Build app and run standalone binary:

```bash
bun run build
./main
```

**Option 3:** Build Docker image and run in container:

```bash
docker build -t sacandaga-calendar .
docker run -p 3000:3000 sacandaga-calendar
```

## Stack

- [Bun](https://bun.sh) - server runtime, package manager, script runner
- [Elysia](https://elysiajs.com) - server framework
- [React](https://react.dev) - user interface
- [TanStack Router](https://tanstack.com/router) - client-side routing
- [TanStack Query](https://tanstack.com/query) - async state management
- [TypeScript](https://www.typescriptlang.org), [Biome](https://biomejs.dev), [Lefthook](https://lefthook.dev) - code quality/style
- [Vite](https://vite.dev) - dev server, bundler
