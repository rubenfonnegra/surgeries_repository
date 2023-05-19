import mongoose from "mongoose";

const coleccionUsuarios = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    roll:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
})

export default mongoose.model('Usuario', coleccionUsuarios)

