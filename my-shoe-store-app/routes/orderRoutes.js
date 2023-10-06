const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rota para criar um novo pedido
router.post("/", authMiddleware, orderController.createOrder);

// Rota para obter todos os pedidos
router.get("/", authMiddleware, orderController.getOrders);

// Rota para atualizar um pedido por ID
router.put("/:id", authMiddleware, orderController.updateOrder);

// Rota para excluir um pedido por ID
router.delete("/:id", authMiddleware, orderController.deleteOrder);

module.exports = router;
