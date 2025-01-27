const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
  },
  email: {
    type: String,
    required: [true, "L'email est requis"],
    unique: true,
    match: [/.+\@.+\..+/, 'Saisissez un email valide'],
  },
  password: {
    type: String,
    required: [true, "Le mot de passe est requis"],
    minlength: [6, "Le mot de passe doit comporter au moins 6 caractères"], 
  },
}, { timestamps: true });

// Hashage du mot de passe avant de le sauvegarder
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour comparer le mot de passe entré avec celui stocké
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Gestion des erreurs de validation
userSchema.post('save', function (error, doc, next) {
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map((e) => e.message);
    next(new Error(errors.join(', ')));  // Transforme les erreurs en un message unique
  } else {
    next(error);  // Passer l'erreur à la gestionnaire d'erreur par défaut
  }
});

module.exports = mongoose.model('User', userSchema);
