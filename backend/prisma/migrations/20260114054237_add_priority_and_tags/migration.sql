-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "priority" TEXT NOT NULL DEFAULT 'medium',
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
