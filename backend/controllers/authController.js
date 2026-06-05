const userSchema = require("./../model/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const crypto = require("crypto")
const register = async (req, res) => {
    try {
        const { name, email, contact, password, confirm_password } = req.body;
        console.log(req.body)
   
        if (!name || !email || !contact || !password || !confirm_password) {
            return res.status(400).json({ msg: "All fields are required" })
        }

       
        if (password !== confirm_password) {
            return res.status(400).json({ msg: "Passwords do not match" })
        }
       
        const emails = await userSchema.findOne({ email })

        if (emails) {
            return res.status(400).json({ msg: "User already exists" })
        }

       
        const hashedPass = await bcrypt.hash(password, 10)
        const addData = new userSchema({
            name,
            email,
            contact,
            password: hashedPass
        })

        const dataCreated = await addData.save()
        res.status(201).json({ msg: "Registered successfully", dataCreated })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are required" })
        }
        const userExist = await userSchema.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ msg: " you are not registered user" })
        }

        const passwordMatch = await bcrypt.compare(password, userExist.password);
        if (!passwordMatch) {

            return res.status(400).json({ msg: "Email or password invalid" })
        }

        const token = jwt.sign(
            { id: userExist._id, email: userExist.email, role: userExist.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "2h" }
        )
        res.status(200).json({ msg: "You have logged in", token, role: userExist.role, user: userExist})
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}




module.exports = { register, login }