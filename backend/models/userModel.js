const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Saisissez un nom'],
  },
  email: {
    type: String,
    required: [true, 'Ajoutez un mail'],
    unique: true,
    match: [/.+\@.+\..+/, 'Saisissez un mail valide'],
  },
  password: {
    type: String,
    required: [true, 'Ajoutez un mot de passe'],
    minlength: 6,
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
