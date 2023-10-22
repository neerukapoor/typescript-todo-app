import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {type:String},
    password: {type:String}
})

export const User = mongoose.model('User', UserSchema);