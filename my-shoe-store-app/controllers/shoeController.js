const Shoe = require("../models/Shoe");

// Criar um novo sapato
exports.createShoe = async (req, res) => {
  try {
    const newShoe = new Shoe(req.body);
    const savedShoe = await newShoe.save();
    res.status(201).json(savedShoe);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar sapato" });
  }
};

// Obter todos os sapatos
exports.getShoes = async (req, res) => {
  try {
    const shoes = await Shoe.find();
    res.status(200).json(shoes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter sapatos" });
  }
};

// Atualizar um sapato por ID
exports.updateShoe = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedShoe = await Shoe.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedShoe);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar sapato" });
  }
};

// Excluir um sapato por ID
exports.deleteShoe = async (req, res) => {
  const { id } = req.params;
  try {
    await Shoe.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir sapato" });
  }
};
