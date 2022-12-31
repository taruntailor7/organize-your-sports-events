import express from 'express';
import { accepetedEvent, createEvent, getAllEvents, getEvent, joinedEvent, rejectedEvent } from '../controllers/events.controller.js';

const eventRouter = express.Router();

eventRouter.post("/create", createEvent);

eventRouter.get("/", getAllEvents);

eventRouter.get("/:_id", getEvent);

eventRouter.post("/requested/:_id", joinedEvent)

eventRouter.post("/accepted/:_id", accepetedEvent)

eventRouter.post("/rejected/:_id", rejectedEvent)

export default eventRouter