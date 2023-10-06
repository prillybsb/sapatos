const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const shoeRoutes = require("./routes/shoeRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

// Configuração do middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do banco de dados
mongoose.connect("mongodb://localhost/myshoestore", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configuração das rotas
app.use("/shoes", shoeRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

// Iniciar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
