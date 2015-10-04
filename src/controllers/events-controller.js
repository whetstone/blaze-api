import Event from '../models/event-model.js';

export function createEvent(req, res, next) {
  const { body: { event } } = req;

  return Event.create({
    event
  }).then(event => {
    return res.status(201).send(event);
  }).catch(error => {
    return res.status(415).send(error);
  });
}