// import mongoose from 'mongoose';
import mongoose, { Schema, Document } from 'mongoose';

interface ITodo extends Document {
    todoTitle: string;
    todoDescription: string;
  }


  const TodoSchema = new Schema<ITodo>({
    todoTitle: { type: String },
    todoDescription: { type: String },
  });

const UserSchema = new mongoose.Schema({
    username: {type:String},
    password: {type:String},
    todo: [TodoSchema]
})

export const User = mongoose.model('User', UserSchema);