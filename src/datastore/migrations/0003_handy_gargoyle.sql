ALTER TABLE "todos" DROP COLUMN IF EXISTS "id";
ALTER TABLE "todos" ADD COLUMN "todoId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;