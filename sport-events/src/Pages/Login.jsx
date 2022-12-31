import axios from 'axios';
import {useState} from 'react'
import { useNavigate } from 'react-router';
import { useDispatch,useSelector } from "react-redux"
import { NavLink } from 'react-router-dom';
import { login } from '../Redux/Auth/action';
import "./Login.css"

let initstate = {
    email: "",
    password: "",
}

export const Login = () => {
    const [user, setUser] = useState(initstate);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {token} = useSelector((state)=>state)

    console.log(token,"token...")

    const handleChange = (e) =>{
        let {name, value} = e.target;
        setUser({...user, [name]:value});
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            let res = await axios.post("https://sport-event.onrender.com/auth/login",user)
            dispatch(login(res.data.data))
            localStorage.setItem("token",res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
        navigate("/")
    }

    if(loading){
        return <img className="loadingImg" src="https://gifimage.net/wp-content/uploads/2020/03/white-loading-gif-transparent-background-1.gif" alt=""/>
    }

    return (
        <div className="form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Email</label>
                <input type="email" placeholder="Enter Your Email" name="email" value={user.email} onChange={handleChange} required/>
                <label htmlFor="">Password</label>
                <input type="password" placeholder="Enter Your Password" name="password" value={user.password} onChange={handleChange} required/>
                <button type="submit" className="loginBtn">Login</button>
                <div className="forRegister">
                    <p>Don't have an account ? <NavLink to="/auth/register" className="registerLink" >Register</NavLink></p>
                </div>
            </form>
        </div>
    )
}
