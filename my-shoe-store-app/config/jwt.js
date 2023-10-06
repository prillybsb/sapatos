const jwt = require("jsonwebtoken");

// Chave secreta para assinar e verificar tokens JWT
const JWT_SECRET = "sua_chave_secreta_aqui";

// Função para gerar um token JWT com base nos dados do usuário
function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, JWT_SECRET, options);
}

// Função para verificar um token JWT e decodificá-lo
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    // Se houver um erro na verificação, você pode lidar com isso aqui
    throw new Error("Token inválido");
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
