import mongoose, {Mongoose, Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({

    userName: {type: String, unique: true, lowercase: true, required: true, trim: true, index: true},        // searching filled optimized
    email: {type: String, unique: true, required: true, lowercase: true},
    fullName: {type: String, required: true, trim: true, index: true},
    avatar: {type: String, required: true},
    coverImage: {type: String},
    watchHistory: [{type: Schema.Types.ObjectId, ref: "Video"}],
    password: {type: String, required: [true, 'Password is required']},
    refreshToken: {type: String}

}, {timestamps: true})


// hooks
userSchema.pre("save", async function(next) {

    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// methods
// next() tells Mongoose to continue with the document save operation after your custom logic (like hashing the password) has completed.
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema);