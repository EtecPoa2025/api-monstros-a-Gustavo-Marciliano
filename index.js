// index.js
// API de Receitas em Node.js usando Express

const express = require("express");
const app = express();
app.use(express.json());

// Lista inicial de receitas
let receitas = [
  {
    id: 1,
    nome: "Bolo de Cenoura",
    ingredientes: ["cenoura", "ovos", "açúcar"],
    preparo: "Misture e asse."
  },
  {
    id: 2,
    nome: "Lasanha",
    ingredientes: ["massa", "queijo", "molho"],
    preparo: "Monte em camadas e leve ao forno."
  }
];

// Rota inicial
app.get("/", (req, res) => {
  res.send("API de Receitas funcionando!");
});

// Listar todas as receitas
app.get("/receitas", (req, res) => {
  res.json(receitas);
});

// Buscar receita por ID
app.get("/receitas/:id", (req, res) => {
  const receita = receitas.find(r => r.id == req.params.id);
  if (receita) {
    res.json(receita);
  } else {
    res.status(404).json({ erro: "Receita não encontrada" });
  }
});

// Adicionar nova receita
app.post("/receitas", (req, res) => {
  const novaReceita = {
    id: receitas.length + 1,
    ...req.body
  };
  receitas.push(novaReceita);
  res.status(201).json(novaReceita);
});

// Rodar servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
