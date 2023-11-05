import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {type:String},
    password: {type:String},
    todo: [{
        todoTitle: {type:String},
        todoDescription: {type:String}
    }]
})

export const User = mongoose.model('User', UserSchema);