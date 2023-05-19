import User from "../models/PostUser.js";



export const getUsers = async (req, res) => {
    try {
        const usersFind = await User.find()
        res.send(usersFind)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createUser = async (req, res) => {
    try {
        const { nombre, roll, email, password } = req.body
        const newUser = new User({
            nombre,
            roll,
            email,
            password
        })
        await newUser.save()
        return res.json(newUser)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const userUpdate = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.send(userUpdate)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userDelete = await User.findByIdAndDelete(req.params.id)
        if (!userDelete) {
            return res.sendStatus(404)
        }
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const userFind = await User.findById(req.params.id)
        if (!userFind) {
            return res.sendStatus(404)
        }
        return res.json(userFind)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const findUser = async (req, res) => {
    try {
        const validatorUser = await User.findOne(req.params.nombre)
        const { nombre, password } = validatorUser
        if (req.body.password === password) {
            return res.status(200).json({ message: "ok" })
        } else {
            return res.status(401).json({ message: "Invalid Password" })
        }
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
