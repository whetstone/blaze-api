import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { promisifyAll } from 'bluebird';
import User from '../models/user-model.js';

promisifyAll(bcrypt);

const config = {
  secret: 'KILROY',
  jwtExpiresInMinutes: 10,
};

export function createToken(req, res, next) {
  const { body: { userName, password: providedPassword } } = req;

  if (!providedPassword) {
    return res.status(422).send({
      message: 'A user must provide a password to authenticate',
    });
  }

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

      const { userId, password: foundPassword } = user;

      bcrypt.compareAsync(providedPassword, foundPassword)
        .then(passwordIsValid => {
          if (!passwordIsValid) {
            return res.status(401).send();
          }

          const token = jwt.sign({userName, userId}, config.secret, {
            issuer: 'giftrej',
            expiresInMinutes: config.jwtExpiresInMinutes,
          });

          return res.status(201).cookie('giftrej-token', token).send();
        })
        .catch(error => {
          return res.status(500).send(error);
        });
    })
    .catch(function (error) {
      return res.status(500).send(error);
    });

}

export function deleteToken(req, res, next) {
  res.status(204).clearCookie('giftrej-token').send();
}