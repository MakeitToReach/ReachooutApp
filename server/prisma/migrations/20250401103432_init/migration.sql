/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Template` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `data` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "data" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Template_name_key" ON "Template"("name");
