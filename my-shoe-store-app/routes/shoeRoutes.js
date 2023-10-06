const Shoe = require("../models/Shoe");

exports.createShoe = async (req, res) => {
  try {
    const { name, price, size } = req.body;

    if (!name || !price || !size || price <= 0 || size <= 0) {
      return res.status(400).json({ message: "Dados de entrada inválidos." });
    }

    const shoe = new Shoe({ name, price, size });
    await shoe.save();

    res.status(201).json({ message: "Sapato criado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar o sapato." });
  }
};
