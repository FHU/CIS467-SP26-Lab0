/*
  Warnings:

  - You are about to drop the column `speakerId` on the `ChapelSession` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `User` table. All the data in the column will be lost.
  - Added the required column `speaker_id` to the `ChapelSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChapelSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "speaker_id" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "scripture" TEXT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" DATETIME,
    "number_standings" INTEGER,
    CONSTRAINT "ChapelSession_speaker_id_fkey" FOREIGN KEY ("speaker_id") REFERENCES "Speaker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ChapelSession" ("date", "end_time", "id", "number_standings", "scripture", "topic") SELECT "date", "end_time", "id", "number_standings", "scripture", "topic" FROM "ChapelSession";
DROP TABLE "ChapelSession";
ALTER TABLE "new_ChapelSession" RENAME TO "ChapelSession";
CREATE TABLE "new_Feedback" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stars" INTEGER NOT NULL,
    "response" TEXT,
    "user_id" INTEGER NOT NULL,
    "chapel_session_id" INTEGER NOT NULL,
    "speakerId" INTEGER,
    CONSTRAINT "Feedback_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Feedback_chapel_session_id_fkey" FOREIGN KEY ("chapel_session_id") REFERENCES "ChapelSession" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Feedback_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "Speaker" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Feedback" ("chapel_session_id", "id", "response", "stars") SELECT "chapel_session_id", "id", "response", "stars" FROM "Feedback";
DROP TABLE "Feedback";
ALTER TABLE "new_Feedback" RENAME TO "Feedback";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "user_type" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "first_name", "id", "last_name") SELECT "email", "first_name", "id", "last_name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
