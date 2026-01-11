import express from "express";
import cors from "cors";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const dbPath = join(__dirname, "db", "store.db");
const db = new Database(dbPath);

app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, "../frontend")));

db.prepare(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    image TEXT,
    category TEXT,
    description TEXT
  )
`).run();

const count = db.prepare("SELECT COUNT(*) AS total FROM products").get().total;
if (count === 0) {
  const seed = db.prepare(`
    INSERT INTO products (name, price, image, category, description)
    VALUES (?, ?, ?, ?, ?)
  `);
  seed.run("Sweat Minimal", 49.9, "https://images.unsplash.com/photo-1521572267360-ee0c2909d518", "Textile", "Coupe unisexe, coton bio 380 g/m².");
  seed.run("Sac Nova", 79.0, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", "Accessoires", "Polyvalent, compartiment rembourré 15\".");
}

app.get("/api/products", (req, res) => {
  const products = db.prepare("SELECT * FROM products ORDER BY id DESC").all();
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const { name, price, image, category, description } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: "Nom et prix sont obligatoires." });
  }
  const stmt = db.prepare(`
    INSERT INTO products (name, price, image, category, description)
    VALUES (?, ?, ?, ?, ?)
  `);
  const info = stmt.run(name, price, image || "", category || "", description || "");
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(info.lastInsertRowid);
  res.status(201).json(product);
});

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Serveur prêt sur http://localhost:" + PORT);
});
