import express from 'express';
import { createEvent } from '../controllers/events.controller.js';

const evenstRouter = express.Router();

evenstRouter.post("/create",createEvent);

evenstRouter.get("/");

evenstRouter.get("/:_id");

export default evenstRouter