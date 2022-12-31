import axios from 'axios';
import {useState,useEffect} from 'react'
import "./Homepage.css"

export const Homepage = () => {
  const [events, setEvents] = useState([]);

  useEffect(()=>{
    getEvents();
  },[]);

  const getEvents = ()=>{
    axios.get("https://sport-event.onrender.com/events")
    .then(res=>setEvents(res.data.events))
  }

  return (
    <div className="mainDiv">
      {events.map((event)=>(
        <div key={event._id} className="eventDiv">
          <img className='eventImg' src={event.category === "footbal" ? "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?cs=srgb&dl=pexels-pixabay-46798.jpg&fm=jpg" : "https://static.toiimg.com/thumb/msid-85096936,width-1200,height-900,resizemode-4/.jpg"} alt="" />
          <h1>{event.title}</h1>
          <p>{event.category}</p>
          <p>{event.location}</p>
          <p>{event.startTime}</p>
        </div>
      ))}
    </div>
  )
}
