import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Sports events organiser");
})

app.listen(3050, ()=>{
    try{
        // connection();
        console.log("Server running on 3050");
    }
    catch(e){
        console.log(e)
    }
})