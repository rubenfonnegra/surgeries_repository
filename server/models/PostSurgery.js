import mongoose from "mongoose";

const coleccionCirugias = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    descripcion:{
        type: String,
        required: true,
        trim: true
    },
    tecnica:{
        type: String,
        required: true,
        trim: true
    },
    variante:{
        type: String,
        required: true,
        trim: true
    },
    image:{
        url: String,
        public_id: String
    },
    referencia:{
        type: String,
        required: true,
        trim: true
    },
})

export default mongoose.model('Cirugia', coleccionCirugias)