const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Dados de entrada inválidos." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Usuário com este e-mail já existe." });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: "Usuário criado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar o usuário." });
  }
};
