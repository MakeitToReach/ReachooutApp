/*
  Warnings:

  - A unique constraint covering the columns `[projectId,slug]` on the table `ProjectTemplate` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProjectTemplate_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTemplate_projectId_slug_key" ON "ProjectTemplate"("projectId", "slug");
