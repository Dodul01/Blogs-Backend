import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  id: {
    type: String,
    unique: true,
    default: () => Math.random().toString(36).substr(2, 9),
  },
  name: {
    type: String,
    required: [true, 'Name is required.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

export const User = model<TUser>('User', userSchema);
