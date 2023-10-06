const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rota para criar um novo usuário
router.post("/", userController.createUser);

// Rota para obter todos os usuários
router.get("/", authMiddleware, userController.getUsers);

// Rota para atualizar um usuário por ID
router.put("/:id", authMiddleware, userController.updateUser);

// Rota para excluir um usuário por ID
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
