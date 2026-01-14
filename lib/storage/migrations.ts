import type * as SQLite from 'expo-sqlite';

export interface Migration {
  version: number;
  description: string;
  up: (db: SQLite.SQLiteDatabase) => Promise<void>;
  down: (db: SQLite.SQLiteDatabase) => Promise<void>;
}

const METADATA_TABLE = 'schema_metadata';
const VERSION_KEY = 'schema_version';

const MIGRATIONS: Migration[] = [
  {
    version: 1,
    description: 'Initial schema with chunks table and FTS5',
    up: async () => {
      // This is the baseline migration - the existing schema
      // No changes needed as the database is already at v1
    },
    down: async () => {
      // Cannot downgrade from initial version
      throw new Error('Cannot downgrade from initial schema version');
    },
  },
];

async function ensureMetadataTable(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ${METADATA_TABLE} (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    )
  `);
}

export async function getCurrentVersion(db: SQLite.SQLiteDatabase): Promise<number> {
  await ensureMetadataTable(db);

  const row = await db.getFirstAsync<{ value: string }>(
    `SELECT value FROM ${METADATA_TABLE} WHERE key = ?`,
    [VERSION_KEY]
  );

  if (!row) {
    // Database exists but has no version - assume it's at v1 (initial schema)
    // This handles existing databases that predate the migration system
    await setVersion(db, 1);
    return 1;
  }

  return parseInt(row.value, 10);
}

async function setVersion(db: SQLite.SQLiteDatabase, version: number): Promise<void> {
  await db.runAsync(
    `INSERT OR REPLACE INTO ${METADATA_TABLE} (key, value, updated_at) VALUES (?, ?, strftime('%s', 'now'))`,
    [VERSION_KEY, version.toString()]
  );
}

export async function runMigrations(db: SQLite.SQLiteDatabase): Promise<{
  applied: number[];
  currentVersion: number;
}> {
  const currentVersion = await getCurrentVersion(db);
  const applied: number[] = [];

  const pendingMigrations = MIGRATIONS
    .filter((m) => m.version > currentVersion)
    .sort((a, b) => a.version - b.version);

  if (pendingMigrations.length === 0) {
    console.log(`[Sage] Database schema is up to date (v${currentVersion})`);
    return { applied, currentVersion };
  }

  console.log(`[Sage] Running ${pendingMigrations.length} pending migration(s) from v${currentVersion}`);

  for (const migration of pendingMigrations) {
    console.log(`[Sage] Applying migration v${migration.version}: ${migration.description}`);

    try {
      await db.execAsync('BEGIN TRANSACTION');
      await migration.up(db);
      await setVersion(db, migration.version);
      await db.execAsync('COMMIT');

      applied.push(migration.version);
      console.log(`[Sage] Migration v${migration.version} applied successfully`);
    } catch (error) {
      await db.execAsync('ROLLBACK');
      console.error(`[Sage] Migration v${migration.version} failed:`, error);
      throw new Error(`Migration v${migration.version} failed: ${error}`);
    }
  }

  const newVersion = await getCurrentVersion(db);
  console.log(`[Sage] Database schema updated to v${newVersion}`);

  return { applied, currentVersion: newVersion };
}

export async function rollbackMigration(db: SQLite.SQLiteDatabase): Promise<{
  rolledBack: number | null;
  currentVersion: number;
}> {
  const currentVersion = await getCurrentVersion(db);

  if (currentVersion <= 1) {
    console.log('[Sage] Cannot rollback: already at initial version');
    return { rolledBack: null, currentVersion };
  }

  const migration = MIGRATIONS.find((m) => m.version === currentVersion);
  if (!migration) {
    throw new Error(`No migration found for version ${currentVersion}`);
  }

  console.log(`[Sage] Rolling back migration v${currentVersion}: ${migration.description}`);

  try {
    await db.execAsync('BEGIN TRANSACTION');
    await migration.down(db);
    await setVersion(db, currentVersion - 1);
    await db.execAsync('COMMIT');

    console.log(`[Sage] Rollback of v${currentVersion} successful`);
    return { rolledBack: currentVersion, currentVersion: currentVersion - 1 };
  } catch (error) {
    await db.execAsync('ROLLBACK');
    console.error(`[Sage] Rollback of v${currentVersion} failed:`, error);
    throw new Error(`Rollback of v${currentVersion} failed: ${error}`);
  }
}

export function getLatestVersion(): number {
  return MIGRATIONS.length > 0 ? Math.max(...MIGRATIONS.map((m) => m.version)) : 0;
}

export function getMigrations(): readonly Migration[] {
  return MIGRATIONS;
}

export function addMigration(migration: Migration): void {
  const existing = MIGRATIONS.find((m) => m.version === migration.version);
  if (existing) {
    throw new Error(`Migration with version ${migration.version} already exists`);
  }
  MIGRATIONS.push(migration);
  MIGRATIONS.sort((a, b) => a.version - b.version);
}
