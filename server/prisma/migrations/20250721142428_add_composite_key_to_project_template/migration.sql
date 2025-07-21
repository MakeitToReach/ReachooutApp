/*
  Warnings:

  - A unique constraint covering the columns `[projectId,templateId,order]` on the table `ProjectTemplate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProjectTemplate_projectId_templateId_order_key" ON "ProjectTemplate"("projectId", "templateId", "order");
