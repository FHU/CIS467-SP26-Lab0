-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChapelSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "speaker_id" INTEGER,
    "topic" TEXT NOT NULL,
    "scripture" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "end_time" DATETIME NOT NULL,
    "number_standings" INTEGER NOT NULL,
    CONSTRAINT "ChapelSession_speaker_id_fkey" FOREIGN KEY ("speaker_id") REFERENCES "Speaker" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ChapelSession" ("date", "end_time", "id", "number_standings", "scripture", "speaker_id", "topic") SELECT "date", "end_time", "id", "number_standings", "scripture", "speaker_id", "topic" FROM "ChapelSession";
DROP TABLE "ChapelSession";
ALTER TABLE "new_ChapelSession" RENAME TO "ChapelSession";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
