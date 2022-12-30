import eventModel from "../models/evenst.model.js";
import userModel from "../models/users.model.js";

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

export const joinedEvent = async (req, res) => {
    try {
        console.log("object")
        let eventId = req.params;
        let userId = req.body;

        let event = await eventModel.findById(eventId._id);
        let user = await userModel.findById(userId.userId);

        console.log(event,"players")
        console.log(user,"user")

        event.players.push({
            userId:userId.userId,
            value:"requested"
        })
        user.events.push({
            eventId:eventId._id,
            value:"requested"
        })

        console.log(event.players,"ppp")
        console.log(user.events,"uuu")

        await eventModel.findByIdAndUpdate(eventId._id,{
            players:event.players
        })

        await userModel.findByIdAndUpdate(userId.userId,{
            events:user.events
        })

        res.send({status:"success"})

    } catch (error) {
        res.send(error)
    }
}