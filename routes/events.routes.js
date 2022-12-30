import express from 'express';
import { createEvent, joinedEvent } from '../controllers/events.controller.js';

const evenstRouter = express.Router();

evenstRouter.post("/create", createEvent);

evenstRouter.get("/");

evenstRouter.get("/:_id");

evenstRouter.post("/requested/:_id", joinedEvent)

export default evenstRouter