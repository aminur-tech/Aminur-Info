# Aminur Rahman Portfolio

A Next.js App Router portfolio with Prisma/MongoDB content, Auth.js credentials authentication, and a protected admin dashboard.

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Set `DATABASE_URL` to a MongoDB database and generate a strong `AUTH_SECRET`.
3. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` for the development seed.
4. Generate the Prisma client and seed the database:

```bash
npm run db:generate
npm run db:seed
```

5. Start the app:

```bash
npm run dev
```

Open `/admin/login` to access the dashboard. The seed password is only for development; change it before production use.

## Architecture

- `prisma/schema.prisma` contains the MongoDB data model for portfolio content, users, messages, settings, and activity logs.
- `src/auth.ts` implements Auth.js credentials authentication with bcrypt password verification and ADMIN role checks.
- `src/lib/auth/require-admin.ts` performs server-side authorization for dashboard mutations.
- `src/lib/queries` contains cached public reads.
- `/api/contact` validates and stores contact messages in MongoDB with Prisma.
- `/admin` is protected by Auth.js middleware and server-side role verification.

## Production requirements

Use a managed MongoDB deployment, a randomly generated `AUTH_SECRET`, HTTPS, and a real image/email provider. Do not commit `.env.local` or production credentials.

### Vercel admin login

Add these variables in Vercel under **Settings > Environment Variables** for the **Production** environment:

```env
DATABASE_URL=your-production-mongodb-connection-string
AUTH_SECRET=your-random-secret-at-least-32-characters
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-admin-password
```

`ADMIN_PASSWORD` is used by the seed command to create or update the admin user's bcrypt hash. It is not checked directly at login, so run the seed against the same production database after adding the variables:

```bash
$env:DATABASE_URL="your-production-mongodb-connection-string"
$env:ADMIN_EMAIL="your-admin-email"
$env:ADMIN_PASSWORD="your-admin-password"
npm run db:seed
```

Then redeploy Vercel. The email and password used at `/admin/login` must match the seeded values. Do not expose `ADMIN_PASSWORD` with a `NEXT_PUBLIC_` prefix.
