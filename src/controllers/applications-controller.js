import Application from '../models/application-model.js';

export function createApplication(req, res, next) {
  const { body: { name, version } } = req;

  return Application.create({
    name,
    version
  }).then(function (list) {
    return res.status(201).send(list);
  }).catch(function (error) {
    return res.status(415).send(error);
  });
}