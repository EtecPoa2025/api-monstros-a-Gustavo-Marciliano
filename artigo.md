# Entendendo APIs (PWII)

Para entender o conceito de **API**, imagine que você está em um restaurante. Você, na sua mesa, é o seu aplicativo. Você não vai direto para a cozinha pedir comida. Em vez disso, você fala com o garçom, que é a **API**. Você faz seu pedido, como "quero a previsão do tempo para amanhã". O garçom leva seu pedido para o chef na cozinha, que é o **servidor** onde os dados estão guardados. O chef prepara o que você pediu, e o garçom traz a "comida" (os dados) de volta para a sua mesa. Você não precisa saber como a cozinha funciona, apenas o que pode pedir ao garçom.

Na prática, seu aplicativo faz um pedido para a API. A API então vai buscar os dados que estão em um servidor e, quando encontra, entrega esses dados de volta para o seu aplicativo. Graças a isso:  
- Um aplicativo de fotos pode usar um serviço de mapas para mostrar onde a foto foi tirada.  
- Um site de notícias pode usar um serviço de vídeos para mostrar um clipe.  

A API é o que permite que programas diferentes trabalhem juntos. Em resumo, **uma API é um conjunto de regras que deixa seu programa se comunicar com outro**. Ela funciona como um garçom: você pede o que quer, e ela traz a informação. É por isso que as APIs são a base de grande parte da internet que usamos hoje, conectando o mundo digital.

---

## Exemplo prático: API simples de receitas (ExpressJS)

```javascript
// index.js
const express = require("express");
const app = express();
app.use(express.json());

// Lista inicial de receitas
let receitas = [
  { id: 1, nome: "Bolo de Cenoura", ingredientes: ["cenoura", "ovos", "açúcar"], preparo: "Misture e asse." },
  { id: 2, nome: "Lasanha", ingredientes: ["massa", "queijo", "molho"], preparo: "Monte em camadas e leve ao forno." }
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
  const novaReceita = { id: receitas.length + 1, ...req.body };
  receitas.push(novaReceita);
  res.status(201).json(novaReceita);
});

// Rodar servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
```
