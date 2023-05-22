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
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }

            const oldData = await Surgery.findById(req.params.id)

            if (oldData.image?.public_id){
                await deleteImage(oldData.image.public_id)
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
        const surgeryUpdate = await Surgery.findByIdAndUpdate(req.params.id, postSurgery, { new: true })
        return res.send(surgeryUpdate)
    } catch (error) {
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