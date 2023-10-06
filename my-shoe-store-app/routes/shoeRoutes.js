const express = require("express");
const router = express.Router();
const shoeController = require("../controllers/shoeController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rota para criar um novo sapato
router.post("/", authMiddleware, shoeController.createShoe);

// Rota para obter todos os sapatos
router.get("/", authMiddleware, shoeController.getShoes);

// Rota para atualizar um sapato por ID
router.put("/:id", authMiddleware, shoeController.updateShoe);

// Rota para excluir um sapato por ID
router.delete("/:id", authMiddleware, shoeController.deleteShoe);

module.exports = router;
