import _ from 'underscore';
import { promisifyAll } from 'bluebird';
import bcrypt from 'bcrypt';
import uuid from 'uuid';
import sendgrid from '../config/sendgrid.js';
import * as passwordController from './password-controller.js';
import User from '../models/user-model';

promisifyAll(bcrypt);

export function fetchAllUsers(req, res, next) {
  return User
    .findAll({
      attributes: ['userId', 'userName', 'firstName', 'lastName', 'email'],
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

export function createResetToken(req, res, next) {
  const {
    body: {
      userName,
    },
  } = req;

  return User
    .findOne({
      where: {
        userName,
      },
    })
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }

      const resetToken = uuid.v1();

      const newContactEmail = new Email({
        to: user.email,
        from: 'giftrej@giftrej.com',
        subject: 'GiftRej Password Reset',
        text: `GiftRej Reset Token: ${resetToken}`,
      });

      sendgrid.sendAsync(newContactEmail)
        .then(json => {
          console.log(json);
        })
        .catch(error => {
          console.error(error);
        });

      return user.update({
        resetPasswordToken: resetToken,
        resetPasswordTimestamp: new Date(),
      })
      .then(() => {
        res.status(201).send();
      })
      .catch(error => {
        res.status(500).send(error);
      });
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}

export function updatePassword(req, res, next) {
  const { query: { resetPasswordToken } } = req;

  if (resetPasswordToken) {
    return passwordController.updatePasswordWithToken(req, res, next);
  }

  return passwordController.updatePasswordWithPassword(req, res, next);
}
