/*
  Warnings:

  - Added the required column `date` to the `ChapelSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `ChapelSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_standing` to the `ChapelSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scripture` to the `ChapelSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speaker_id` to the `ChapelSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `ChapelSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chapel_session_id` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `response` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stars` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `Speaker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Speaker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Speaker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Speaker` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChapelSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "speaker_id" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "scripture" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "end_time" DATETIME NOT NULL,
    "number_standing" INTEGER NOT NULL
);
INSERT INTO "new_ChapelSession" ("id") SELECT "id" FROM "ChapelSession";
DROP TABLE "ChapelSession";
ALTER TABLE "new_ChapelSession" RENAME TO "ChapelSession";
CREATE TABLE "new_Feedback" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stars" INTEGER NOT NULL,
    "response" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "chapel_session_id" INTEGER NOT NULL
);
INSERT INTO "new_Feedback" ("id") SELECT "id" FROM "Feedback";
DROP TABLE "Feedback";
ALTER TABLE "new_Feedback" RENAME TO "Feedback";
CREATE TABLE "new_Speaker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "title" TEXT NOT NULL
);
INSERT INTO "new_Speaker" ("id") SELECT "id" FROM "Speaker";
DROP TABLE "Speaker";
ALTER TABLE "new_Speaker" RENAME TO "Speaker";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
