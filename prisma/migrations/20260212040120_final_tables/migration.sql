/*
  Warnings:

  - Added the required column `speaker_id` to the `ChapelSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chapel_session_id` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stars` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Speaker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Speaker` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChapelSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "speaker_id" INTEGER NOT NULL,
    "topic" TEXT NOT NULL DEFAULT 'The Bible',
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "number_standings" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ChapelSession_speaker_id_fkey" FOREIGN KEY ("speaker_id") REFERENCES "Speaker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ChapelSession" ("id") SELECT "id" FROM "ChapelSession";
DROP TABLE "ChapelSession";
ALTER TABLE "new_ChapelSession" RENAME TO "ChapelSession";
CREATE TABLE "new_Feedback" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chapel_session_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "stars" INTEGER NOT NULL,
    "response" TEXT,
    CONSTRAINT "Feedback_chapel_session_id_fkey" FOREIGN KEY ("chapel_session_id") REFERENCES "ChapelSession" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Feedback_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Feedback" ("id") SELECT "id" FROM "Feedback";
DROP TABLE "Feedback";
ALTER TABLE "new_Feedback" RENAME TO "Feedback";
CREATE TABLE "new_Speaker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "bio" TEXT,
    "title" TEXT,
    "type" TEXT NOT NULL DEFAULT 'FACULTY'
);
INSERT INTO "new_Speaker" ("id") SELECT "id" FROM "Speaker";
DROP TABLE "Speaker";
ALTER TABLE "new_Speaker" RENAME TO "Speaker";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'STUDENT'
);
INSERT INTO "new_User" ("email", "first_name", "id", "last_name") SELECT "email", "first_name", "id", "last_name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
