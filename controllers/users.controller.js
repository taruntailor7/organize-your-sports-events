import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const regsiter = async (req, res) => {
    try {
        const user = req.body;
        let {name, email, password} = user;
        
        let existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.status(200).send({
                status: false,
                message: 'User already exists'
            })
        } else{
            password = bcrypt.hashSync(password);
            let newUser = await userModel.create({
                name,email,password
            })
            newUser = newUser.toJSON();
            delete newUser.password;

            return res.send({
                status:true,
                message: 'User successfully registered.'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error
        });
    }
}

export const login = (req, res) => {
    res.send("login")
}