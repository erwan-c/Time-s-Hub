const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({ _id: decoded.userId }).select(
        "-password"
      );
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Non autorisé, token invalide" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Non autorisé, token manquant" });
  }
};

module.exports = { protect };
