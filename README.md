## Getting Started

Install `pnpm`

Create a .env file with the following values

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/todos_db
AUTH_SECRET_KEY=<an auth secret key>
ENCRYPTION_SALT=<an encryption sault>
```

An encryption salt can be created using `await bcrypt.genSalt()`

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

![Todos App](docs/todos-app-screenshot.png)