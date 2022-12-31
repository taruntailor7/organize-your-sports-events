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

export const getAllEvents = async (req, res) => {
    try {
        let events = await eventModel.find();
        res.send({
            error:false,
            events: events
        })
    } catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}

export const getEvent = async (req, res)=>{
    try {
        let eventId = req.params;
        let event = await eventModel.findOne({_id:eventId._id})
        res.send({
            error:false,
            event:event
        })
    } catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}

//requested
export const joinedEvent = async (req, res) => {
    try {
        let eventId = req.params;
        let userId = req.body; 

        let event = await eventModel.findById(eventId._id);
        let user = await userModel.findById(userId.userId);

        event.players.push({
            userId : user._id,
            name:user.name,
            email:user.email,
            value:"requested"
        })
        user.events.push({
            eventId : event._id,
            title:event.title,
            desc: event.desc,
            startTime: event.startTime,
            endTime: event.endTime,
            address:event.address,
            lcoation:event.location,
            players_limit: event.players_limit,
            picture: event.picture,
            category: event.category,
            organizer: event.userId,
            value:"requested"
        })
        await eventModel.findByIdAndUpdate(eventId._id,{
            players:event.players
        })

        await userModel.findByIdAndUpdate(userId.userId,{
            events:user.events
        })
        res.send({
            error:false,
            message:"You have requested to join this event!"
        })
    } catch (error) {
        res.send({
            error:error,
        })
    }
}

//accepeted
export const accepetedEvent = async (req, res) => {
    
}

//rejected
export const rejectedEvent = async (req, res) => {
    
}


