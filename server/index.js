import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.join(__dirname, "messages.json");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const read = () => {
  try { return JSON.parse(fs.readFileSync(FILE, "utf8")); } catch { return []; }
};

app.get("/api/info", (_req, res) => {
  res.json({
    name: "ElectroHub",
    address: "Chamela Colony, Narwana, Jind, Haryana",
    phone: "8053242544",
  });
});

app.post("/api/contact", (req, res) => {
  const { name, phone, message } = req.body || {};
  if (!name?.trim() || !/^[6-9]\d{9}$/.test(String(phone || "").trim()) || !message?.trim()) {
    return res.status(400).json({ ok: false, error: "Naam, sahi 10-digit phone aur message zaroori hai." });
  }
  const all = read();
  all.push({ name: name.trim(), phone: phone.trim(), message: message.trim(), at: new Date().toISOString() });
  fs.writeFileSync(FILE, JSON.stringify(all, null, 2));
  res.json({ ok: true });
});

// Production: build ke baad React site bhi yahi se serve hogi
const dist = path.join(__dirname, "../client/dist");
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

app.listen(PORT, () => console.log(`ElectroHub server: http://localhost:${PORT}`));
