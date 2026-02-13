-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Speaker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "usertype" TEXT NOT NULL DEFAULT 'STAFF'
);
INSERT INTO "new_Speaker" ("bio", "first_name", "id", "last_name", "title") SELECT "bio", "first_name", "id", "last_name", "title" FROM "Speaker";
DROP TABLE "Speaker";
ALTER TABLE "new_Speaker" RENAME TO "Speaker";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "usertype" TEXT NOT NULL DEFAULT 'STUDENT'
);
INSERT INTO "new_User" ("email", "first_name", "id", "last_name") SELECT "email", "first_name", "id", "last_name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
