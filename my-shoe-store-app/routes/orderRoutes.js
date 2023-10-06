const Order = require("../models/Order");
// Cria um novo pedido
exports.createOrder = async (req, res) => {
  try {
    const { shoeId, quantity } = req.body;

    if (!shoeId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Dados de entrada inválidos." });
    }

    // Crie um novo pedido e salve-o no banco de dados
    const order = new Order({
      shoeId,
      quantity,
      userId: req.user._id,
    });

    await order.save();

    res.status(201).json({ message: "Pedido criado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar o pedido." });
  }
};

// Lista todos os pedidos
exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao listar os pedidos." });
  }
};
