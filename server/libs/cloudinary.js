import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name: "dbjbs4tba",
    api_key: "535537782262381",
    api_secret: "udwvM9HukhaaUTWl7Bpj5TMKxDU"
})

export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'surgeries'
    })
}

export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id)
}