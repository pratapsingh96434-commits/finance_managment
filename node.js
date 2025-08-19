const express = require("express");
const path = require("path");
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, Images, HTML)
app.use(express.static(path.join(__dirname, "public")));

// Default Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Example API route (for experiments)
let transactions = [];

app.post("/api/transaction", (req, res) => {
  const { type, amount, description } = req.body;
  if (!type || !amount) {
    return res.status(400).json({ error: "Type and Amount are required" });
  }
  const newTransaction = { id: Date.now(), type, amount, description };
  transactions.push(newTransaction);
  res.json(newTransaction);
});

app.get("/api/transaction", (req, res) => {
  res.json(transactions);
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
