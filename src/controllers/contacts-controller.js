import Contact from '../models/contact-model.js';

export function fetchAllContacts(req, res, next) {
  const { user: { userId } } = req;

  return Contact
    .findAll({
      where: {
        userId,
      },
    })
    .then(contacts => {
      return res.status(200).send(contacts);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}

export function createContact(req, res, next) {
  const { user: { userId }, body: { contactUserId } } = req;

  return Contact.create({
    userId,
    contactUserId,
  }).then(contact => {
    return res.status(201).send(contact);
  }).catch(error => {
    return res.status(500).send(error);
  });
}

export function fetchContact(req, res, next) {
  const { contactId } = req.params;

  return Contact
    .findById(contactId)
    .then(function (contact) {
      if (!contact) {
        return res.status(404).send();
      }

      return res.status(200).send(contact);
    })
    .catch(function (error) {
      return res.status(500).send(error);
    });
}

export function updateContact(req, res, next) {
  const { user: { userId }, params: { contactId }, body: { active } } = req;

  return Contact
    .findById(contactId)
    .then(function(contact) {
      if (!contact) {
        return res.status(404).send();
      }

      if (userId !== contact.getDataValue('contactUserId')) {
        // Only the Contact User may update the status of a contact record
        return res.status(403).send();
      }

      return contact.update({
        active,
      })
        .then(contact => {
          return res.status(200).send(contact);
        })
        .catch(error => {
          return res.status(500).send(error);
        });
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}

export function deleteContact(req, res, next) {
  const { params: { contactId }, user: { userId } } = req;

  return Contact
    .findById(contactId)
    .then(function (contact) {
      if (!contact) {
        return res.status(404).send();
      }

      if (userId !== contact.getDataValue('userId')) {
        return res.status(403).send();
      }

      return contact
        .destroy()
        .then(function () {
          return res.status(204).send();
        })
        .catch(function (error) {
          return res.status(500).send(error);
        });
    })
    .catch(function (error) {
      return res.status(500).send(error);
    });
}
