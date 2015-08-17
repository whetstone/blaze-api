import User from '../models/user-model';

export function fetchAllUsers(req, res, next) {
  return User
    .findAll()
    .then(function (users) {
      return res.status(200).send(users);
    })
    .catch(function (error) {
      return res.status(500).send(error);
    });
}

export function createUser(req, res, next) {
  const {
      firstName,
      lastName,
      userName,
      email,
      password,
      allowNotifications,
    } = req.body;

  return User.create({
    firstName,
    lastName,
    userName,
    email,
    password,
    allowNotifications,
  }).then(function (user) {
    return res.status(201).send(user);
  }).catch(function (error) {
    return res.status(415).send(error);
  });
}

export function fetchUser(req, res, next) {
  const { userId } = req.params;

  return User
    .findById(userId)
    .then(function (user) {
      if (!user) {
        return res.status(404).send();
      }

      return res.status(200).send(user);
    })
    .catch(function (error) {
      return res.status(500).send(error);
    });
}

export function updateUser(req, res, next) {
  const { userId } = req.params;

  const {
      firstName,
      lastName,
      userName,
      email,
      password,
      allowNotifications,
    } = req.body;

  return User
    .findById(userId)
    .then(function(user) {
      if (!user) {
        return res.status(404).send();
      }

      return user.update({
        firstName,
        lastName,
        userName,
        email,
        password,
        allowNotifications,
      })
        .then(function (user) {
          return res.status(200).send(user);
        })
        .catch(function (error) {
          return res.status(500).send(error);
        });
    })
    .catch(function (error) {
      return res.status(500).send(error);
    });
}

export function deleteUser(req, res, next) {
  const { userId } = req.params;

  const { password } = req.body;

  return User
    .findById(userId)
    .then(function (user) {
      if (!user) {
        return res.status(404).send();
      }

      if (!password || (password !== user.password)) {
        return res.status(401).send();
      }

      return user
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
