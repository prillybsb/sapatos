const User = require("../models/User"); // Importe o modelo de Usuário
const bcrypt = require("bcrypt"); // Importe a biblioteca bcrypt para criptografar senhas

// Função para criar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verifique se o usuário já existe com base no email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Crie um hash da senha usando o bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Não retorne a senha no objeto de resposta
    user.password = undefined;

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o usuário" });
  }
};

// Função para obter todos os usuários
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Não retorne as senhas
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter os usuários" });
  }
};

// Função para obter um usuário por ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password"); // Não retorne a senha
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter o usuário" });
  }
};

// Função para atualizar um usuário por ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true }
    ).select("-password"); // Não retorne a senha
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o usuário" });
  }
};

// Função para excluir um usuário por ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir o usuário" });
  }
};
