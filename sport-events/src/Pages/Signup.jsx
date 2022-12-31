import axios from 'axios';
import {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import "./Signup.css"

let initstate = {
    name:"",
    email: "",
    password: "",
}

export const Signup = () => {
    const [user, setUser] = useState(initstate);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>{
        let {name, value} = e.target;
        setUser({...user, [name]:value});
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            setLoading(true)
            await axios.post("https://sport-event.onrender.com/auth/register",user)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
        navigate("/auth/login")
    }

    if(loading){
        return <img className="loadingImg" src="https://gifimage.net/wp-content/uploads/2020/03/white-loading-gif-transparent-background-1.gif" alt=""/>
    }

    return (
        <div className="form">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Name</label>
                <input type="text" placeholder="Enter Your Name" name="name" value={user.name} onChange={handleChange} required/>
                <label htmlFor="">Email</label>
                <input type="email" placeholder="Enter Your Email" name="email" value={user.email} onChange={handleChange} required/>
                <label htmlFor="">Password</label>
                <input type="password" placeholder="Enter Your Password" name="password" value={user.password} onChange={handleChange} required/>
                <button type="submit" className="registerBtn">Register</button>
                <div className="forLogin">
                    <p>Already have an account ? <NavLink to="/auth/login" className="loginLink" >Login</NavLink></p>
                </div>
            </form>
        </div>
    )
}
