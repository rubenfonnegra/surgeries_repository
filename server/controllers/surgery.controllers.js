import Surgery from "../models/PostSurgery.js";
import { deleteImage, uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getSurgeries = async (req, res) => {
    try {
        const surgeriesFind = await Surgery.find()
        res.send(surgeriesFind)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createSurgery = async (req, res) => {
    try {
        const { nombre, descripcion, tecnica, variante, referencia } = req.body
        let image;
        if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
            
        }
        console.log(req.files)
        const newSurgery = new Surgery({
            nombre,
            descripcion,
            tecnica,
            variante,
            referencia,
            image
        })
        await newSurgery.save()
        return res.json(newSurgery)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
//----------------------------------------
export const updateSurgery = async (req, res) => {
    try {
        const { nombre, descripcion, tecnica, variante, referencia } = req.body
        let image = null;
        if (req.files?.image) {
            console.log("/////existe una imagen//////",req.files.image)
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }

            const oldData = await Surgery.findById(req.params.id)

            console.log("/////if old image//////",oldData)
            console.log("/////if old image//////",Object.keys(oldData.image).length)
            const pepe = Object.entries(oldData.image)
            console.log("/////pepe//////",pepe)

            if (oldData.image?.public_id){
                await deleteImage(oldData.image.public_id)
                console.log("/////if old data//////",oldData.image)
                console.log("/////borraste esta imagen//////",oldData.image.public_id)
            }
        }
        const postSurgery = {
            nombre,
            descripcion,
            tecnica,
            variante,
            referencia,
            image
        }
        console.log("/////req.files//////",req.files)
        console.log("////////req.body///////////", req.body)
        console.log("////////postSurgery///////////", postSurgery)
        const surgeryUpdate = await Surgery.findByIdAndUpdate(req.params.id, postSurgery, { new: true })
        
        console.log("////////surgery-update///////////", surgeryUpdate)
        return res.send(surgeryUpdate)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}
//-----------------------------------------
export const deleteSurgery = async (req, res) => {
    try {
        const surgeryDelete = await Surgery.findByIdAndDelete(req.params.id)
        if (!surgeryDelete) {
            return res.sendStatus(404)
        }
        if (surgeryDelete.image.public_id) {
            await deleteImage(surgeryDelete.image.public_id)
        }
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getSurgery = async (req, res) => {
    try {
        const surgeryFind = await Surgery.findById(req.params.id)
        if (!surgeryFind) {
            return res.sendStatus(404)
        }
        return res.json(surgeryFind)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}