ALTER TABLE "todos" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "todos" DROP COLUMN IF EXISTS "id";