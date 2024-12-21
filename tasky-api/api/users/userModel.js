import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const passwordValidator = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
};

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { 
    type: String, 
    required: true,
    validate: {
      validator: passwordValidator,
      message: props => `${props.value} is not a valid password. It must be at least 8 characters long and contain at least one letter, one number, and one special character.`
    }
  }
});

export default mongoose.model('User', UserSchema);
