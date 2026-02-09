/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Task";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "USER" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SPEAKER" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT,
    "last_name" TEXT,
    "type" TEXT NOT NULL,
    "bio" TEXT,
    "title" TEXT
);

-- CreateTable
CREATE TABLE "CHAPEL_SESSION" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "speaker_id" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "time" DATETIME NOT NULL,
    "number_standings" INTEGER NOT NULL,
    CONSTRAINT "CHAPEL_SESSION_speaker_id_fkey" FOREIGN KEY ("speaker_id") REFERENCES "SPEAKER" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FEEDBACK" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stars" INTEGER NOT NULL,
    "response" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "chapel_session_id" INTEGER NOT NULL,
    CONSTRAINT "FEEDBACK_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USER" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FEEDBACK_chapel_session_id_fkey" FOREIGN KEY ("chapel_session_id") REFERENCES "CHAPEL_SESSION" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "USER_email_key" ON "USER"("email");
