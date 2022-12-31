import axios from 'axios';
import {useState,useEffect} from 'react'
import "./Homepage.css"

export const Homepage = () => {
  const [events, setEvents] = useState([]);

  useEffect(()=>{
    getEvents();
  },[]);

  const getEvents = ()=>{
    axios.get("")
  }

  return (
    <div>Homepage</div>
  )
}
