const Order = require("../models/Order");

// Função para criar um novo pedido
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, customerName, shippingAddress } = req.body;
    const order = new Order({
      items,
      totalAmount,
      customerName,
      shippingAddress,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o pedido" });
  }
};

// Função para obter todos os pedidos
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter os pedidos" });
  }
};

// Função para obter um pedido por ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter o pedido" });
  }
};

// Função para atualizar um pedido por ID
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { items, totalAmount, customerName, shippingAddress } = req.body;
    const order = await Order.findByIdAndUpdate(
      id,
      { items, totalAmount, customerName, shippingAddress },
      { new: true }
    );
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o pedido" });
  }
};

// Função para excluir um pedido por ID
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir o pedido" });
  }
};
