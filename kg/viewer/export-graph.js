#!/usr/bin/env node
/**
 * Export knowledge graph from SQLite → JSON for 3D viewer
 * Usage: node export-graph.js [output.json]
 */
import { writeFileSync } from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const require = createRequire(join(__dirname, '..', 'package.json'));
const Database = require('better-sqlite3');

const DB_PATH = join(__dirname, '..', 'system-design.db');
const OUT_PATH = process.argv[2] || join(__dirname, 'graph-data.json');

const db = new Database(DB_PATH, { readonly: true });

// Active nodes only
const nodes = db.prepare(`
  SELECT id, type, trust, name, content, source, quote,
         metadata, access_count, memory_level, stability,
         created_at, updated_at
  FROM nodes
  WHERE valid_until IS NULL
`).all().map(n => ({
  ...n,
  metadata: n.metadata ? JSON.parse(n.metadata) : null,
}));

// Active edges only
const edges = db.prepare(`
  SELECT id, source_id AS source, target_id AS target,
         relation_type, reasoning, weight, created_at
  FROM edges
  WHERE valid_until IS NULL
`).all();

const data = { nodes, links: edges };

writeFileSync(OUT_PATH, JSON.stringify(data, null, 2), 'utf-8');
console.log(`Exported ${nodes.length} nodes, ${edges.length} links → ${OUT_PATH}`);

db.close();
