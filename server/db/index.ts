import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    todoTitle: {type:String},
    todoDescription: {type:String}
})

export const Todo = mongoose.model('Todo', todoSchema);