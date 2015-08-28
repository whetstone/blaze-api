export function updatePasswordWithToken(req, res, next) {
  const {
    params: {
      userId,
    },
    query: {
      resetPasswordToken,
    },
    body: {
      newPassword,
    },
  } = req;

  return User
    .findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }

      const tokenExpiryDateTime = moment(user.getDataValue('resetPasswordTimestamp')).add(1, 'days');
      const currentDateTime = new Date();

      if (resetPasswordToken !== user.getDataValue('resetPasswordToken') || currentDateTime > tokenExpiryDateTime) {
        return res.status(401).send({
          'message': 'Invalid reset token',
        });
      }

      bcrypt.hashAsync(newPassword, 16)
        .then(hash => {
          return user.update({
            resetPasswordToken: null,
            resetPasswordTimestamp: null,
            password: hash,
          }).then(updatedUser => {
            const userWithoutPassword = _.omit(updatedUser.toJSON(), 'password');
            return res.status(204).send(userWithoutPassword);
          }).catch(error => {
            return res.status(415).send(error);
          });
        })
        .catch(error => {
          return res.status(500).send(error);
        });
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}

export function updatePasswordWithPassword(req, res, next) {
  return res.status(501).send();
}
