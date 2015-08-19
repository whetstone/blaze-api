import jwt from 'jsonwebtoken';
import User from '../models/user-model.js';

const config = {
  secret: 'KILROY',
  jwtExpiresInMinutes: 10,
};

export function createToken(req, res, next) {
  const { userName } = req.body;

  return User
    .findOne({
      where: {
        userName,
      },
    })
    .then(function (user) {
      if (!user) {
        return res.status(404).send();
      }

      const token = jwt.sign({userName}, config.secret, {
        issuer: 'giftrej',
        expiresInMinutes: config.jwtExpiresInMinutes,
      });

      return res.status(201).cookie('giftrej-token', token).send();
    })
    .catch(function (error) {
      return res.status(500).send(error);
    });

}

export function deleteToken(req, res, next) {
  res.status(204).clearCookie('giftrej-token').send();
}