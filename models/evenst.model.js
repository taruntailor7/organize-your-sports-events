import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        unique:true,
    },
    desc:{
        type:String,
        required:true
    },
    timing:{
        type:String,
        required:true
    },
    players_limit:{
        type:Number,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
},{timestamp: true, versionKey: false})

const eventModel = mongoose.model('events', eventSchema)

export default eventModel