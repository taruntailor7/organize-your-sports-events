import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import userModel from "../models/users.model.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const regsiter = async (req, res) => {
    try {
        const user = req.body;
        let {name, email, password} = user;

        let existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.status(200).send({
                error: true,
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
                error:false,
                message: 'User successfully registered.'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error
        });
    }
}

export const login = async (req, res) => {
    try {
        const user = req.body
        let {email, password} = user;

        let userExists = await userModel.findOne({email});

        if(userExists){
            let match = bcrypt.compareSync(password, userExists.password);

            if(match){
                let token = jwt.sign({
                    _id : userExists._id,
                    email: userExists.email
                },JWT_SECRET)

                // console.log(token,"token")

                // Verifying...
                let result = jwt.verify(token, JWT_SECRET);
                // console.log(result,"result or payload");

                // Decoding...
                result = jwt.decode(token);
                // console.log(result,"decrypted result");

                return res.send({
                    error:false,
                    message:"User succesfully logged in",
                    data : token
                })

            } else {
                return res.status(200).send({
                    error: true,
                    message: 'Incorrect password !'
                })
            }
        } else {
            return res.status(400).send({
                error: true,
                message: 'User does not exists.'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error
        });
    }
}