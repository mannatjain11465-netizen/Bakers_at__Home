import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address"]
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    phone:{
        type: String,
        unique: true,
        trim: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"]
    },
    role:{
        type: String,
        enum: ["owner", "employee"],
        default: "owner"
    }
},
{
    timestamps: true
});
const User = mongoose.model("User", userSchema);
export default User;