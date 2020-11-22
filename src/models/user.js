import bcrypt from '../utils/bcrypt';

class User {
  static async findByUnique({ email, username }) {
    return this.findOne({ $or: [{ username }, { email }] });
  }
}

export default (Schema) => {
  const schema = new Schema({
    fullName: {
      type: String,
      required: true,
      length: 128,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      length: 128,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      length: 128,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Client', 'Admin'],
      default: 'Client',
    },
  });

  schema.loadClass(User);

  schema.pre('save', function encryptPassword(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashString(this.password);
      next();
    } else next();
  });

  return schema;
};
