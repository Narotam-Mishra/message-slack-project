
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already exists'],
      match: [
        // eslint-disable-next-line no-useless-escape
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      maxlength: 16,
      validate: {
        validator: function (v) {
          // Regex: 6-16 characters, one uppercase, one lowercase, one number, and one special character
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/.test(v);
        },
        message:
          'Password must be between 6 and 16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      },
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'Username already exists'],
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: 33,
      match: [
        /^[a-zA-Z0-9]+$/,
        'Username must contain only letters and numbers'
      ]
    },
    avatar: {
        type: String
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function saveUser(next){
    const user = this;

    const salt = bcrypt.genSaltSync(9);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    user.password = hashedPassword;
    
    user.avatar = `https://robohash.org/${user.username}`;
    next();
})

const User = mongoose.model('User', userSchema);

export default User;
