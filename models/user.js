const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
  },
  { timestamps: true }
);

// virtual field

// userSchema
//   .virtual('password')
//   .set(function (password) {
//     this._password = password;
//     this.salt = uuidv1();
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function () {
//     return [this.salt, this._password];
//   });

// userSchema.methods = {
//   authenticate: function(plainText) {
//     return this.encryptPassword(plainText) === this.hashed_password;
//   },

//   encryptPassword: function (password) {
//     if (!password) return '';
//     try {
//       return crypto
//         .createHmac('sha1', this.salt)
//         .update(password)
//         .digest('hex');
//     } catch (err) {
//       return '';
//     }
//   },
// };

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt,
    1000, 64, `sha512`).toString(`hex`);
};

userSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password,
    this.salt, 1000, 64, `sha512`).toString(`hex`);
  return this.hash === hash;
};

module.exports = mongoose.model('users', userSchema);
