import eventModel from "../models/evenst.model.js";

export const createEvent = async (req, res)=>{
    try {
        let event = req.body;
        let {title,desc,startTime,endTime,address,location,players_limit,category,picture,userId} = event;

        let eventExist = await eventModel.findOne({title});
        
        if(eventExist){
            return res.status(200).send({
                error: true,
                message: 'Event already exists with this title!'
            })
        } else{
            let newEvent = await eventModel.create({
                title,desc,startTime,endTime,address,location,players_limit,category,picture,userId
            });
            newEvent = newEvent.toJSON();
            return res.send({
                error:false,
                message: 'Event successfully created.'
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}