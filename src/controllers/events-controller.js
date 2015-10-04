import Event from '../models/event-model.js';

export function createEvent(req, res, next) {
  const { body: { event, applicationId } } = req;

  return Event.create({
    event,
    applicationId,
  }).then(event => {
    return res.status(201).send(event);
  }).catch(error => {
    return res.status(415).send(error);
  });
}

export function fetchAllEvents(req, res, next) {
  return Event
    .findAll()
    .then(events => {
      return res.status(200).send(events);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}

export function fetchEventsForApplication(req, res, next) {
  const { params: { applicationId } } = req;

  return Event
    .findAll({
      where: {
        applicationId,
      },
    })
    .then(events => {
      return res.status(200).send(events);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}