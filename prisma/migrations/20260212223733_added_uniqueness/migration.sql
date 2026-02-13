/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `ChapelSession` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Feedback` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Speaker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChapelSession_id_key" ON "ChapelSession"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_id_key" ON "Feedback"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Speaker_id_key" ON "Speaker"("id");
