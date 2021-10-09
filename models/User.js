import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: [true, 'El campo email es requerido'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [String]
});
UserSchema.pre('save', async function(next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, 9);
    console.log(user);
    next()
});
UserSchema.statics.checkCredentials = async function(credentials) {
    const user = await this.findOne({
        email: credentials.email
    });
    if (!user) return null;
    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) return null;
    return user;
}
UserSchema.methods.generateAuthToken = function() {
    const user = this;
    const token = jwt.sign({ _id: user._id }, 'holamundo', { expiresIn: '2y' });
    return token;
}
const UserModel = mongoose.model('User', UserSchema);
export default UserModel