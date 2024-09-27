## Getting Started

Install `pnpm`

Start database with docker compose:

```bash
docker-compose up -d
```

Generate database schema:

```bash
pnpm run db:generate
```

Execute database migrations:

```bash
pnpm run db:migrate
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.