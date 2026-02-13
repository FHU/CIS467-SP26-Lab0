-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feedback" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stars" INTEGER NOT NULL,
    "response" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "chapel_session_id" INTEGER NOT NULL,
    CONSTRAINT "Feedback_chapel_session_id_fkey" FOREIGN KEY ("chapel_session_id") REFERENCES "ChapelSession" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Feedback_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Feedback" ("chapel_session_id", "id", "response", "stars", "user_id") SELECT "chapel_session_id", "id", "response", "stars", "user_id" FROM "Feedback";
DROP TABLE "Feedback";
ALTER TABLE "new_Feedback" RENAME TO "Feedback";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
