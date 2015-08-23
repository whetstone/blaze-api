import User from '../models/user-model';
import _ from 'underscore';
import Promise from 'bluebird';
import bcrypt from 'bcrypt';

Promise.promisifyAll(bcrypt);

export function fetchAllUsers(req, res, next) {
  return User
    .findAll({
      attributes: ['userId', 'firstName', 'lastName', 'email'],
    })
    .then(users => {
      return res.status(200).send(users);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}

export function createUser(req, res, next) {
  const {
      body: {
        firstName,
        lastName,
        userName,
        email,
        password,
        allowNotifications,
      },
    } = req;

  if (!password) {
    return res.status(422).send({
      message: 'A new user must provide a password',
    });
  }

  bcrypt.hashAsync(password, 16)
    .then(hash => {
      return User.create({
        firstName,
        lastName,
        userName,
        email,
        password: hash,
        allowNotifications,
      }).then(user => {
        const userWithoutPassword = _.omit(user.toJSON(), 'password');
        return res.status(201).send(userWithoutPassword);
      }).catch(error => {
        return res.status(415).send(error);
      });
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}

export function fetchUser(req, res, next) {
  const { userId } = req.params;

  return User
    .findById(userId, {
      attributes: ['userId', 'firstName', 'lastName', 'email', 'logInCount', 'lastLoginAt', 'allowNotifications',
        'createdAt', 'updatedAt',
      ],
    })
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }

      return res.status(200).send(user);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}

export function updateUser(req, res, next) {
  const {
      params: { userIdParam },
      user: { userId },
      body: {
        firstName,
        lastName,
        userName,
        email,
        allowNotifications,
      }
    } = req;

  if (userId !== userIdParam) {
    return res.status(403).send();
  }

  return User
    .findById(userIdParam)
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }

      return user.update({
        firstName,
        lastName,
        userName,
        email,
        allowNotifications,
      })
        .then(updatedUser => {
          const userWithoutPassword = _.omit(updatedUser.toJSON(), 'password');
          return res.status(201).send(userWithoutPassword);
        })
        .catch(error => {
          return res.status(500).send(error);
        });
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}

export function deleteUser(req, res, next) {
  const {
      params: { userIdParam },
      user: { userId },
    } = req;

  if (userId !== userIdParam) {
    return res.status(403).send();
  }

  return User
    .findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }

      return user
        .destroy()
        .then(() => {
          return res.status(204).send();
        })
        .catch(error => {
          return res.status(500).send(error);
        });
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}
