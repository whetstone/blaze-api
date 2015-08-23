import List from '../models/list-model.js';
import User from '../models/user-model.js';

export function fetchAllLists(req, res, next) {
  return List
    .findAll()
    .then(function (lists) {
      return res.status(200).send(lists);
    })
    .catch(function (error) {
      return res.status(500).send(error);
    });
}

export function fetchListsForUser(req, res, next) {
  const { userId } = req.params;

  return List
    .findAll({
      where: { ownerUserId: userId },
    })
    .then(function (lists) {
      return res.status(200).send(lists);
    })
    .catch(function (error) {
      return res.status(500).send(error);
    });
}

export function createList(req, res, next) {
  const { user: { userId }, body: { name } } = req;

  return List.create({
    ownerUserId: userId,
    name,
  }).then(function (list) {
    return res.status(201).send(list);
  }).catch(function (error) {
    return res.status(415).send(error);
  });
}

export function fetchList(req, res, next) {
  const { listId } = req.params;

  return List
    .findById(listId)
    .then(function (list) {
      if (!list) {
        return res.status(404).send();
      }

      return res.status(200).send(list);
    })
    .catch(function (error) {
      return res.status(500).send(error);
    });
}

export function updateList(req, res, next) {
  const { listId } = req.params;

  const { name } = req.body;

  return List
    .findById(listId)
    .then(function(list) {
      if (!list) {
        return res.status(404).send();
      }

      return list.update({
        name,
      })
        .then(function (list) {
          return res.status(200).send(list);
        })
        .catch(function (error) {
          return res.status(500).send(error);
        });
    })
    .catch(function (error) {
      return res.status(500).send(error);
    });
}

export function deleteList(req, res, next) {
  const { listId } = req.params;

  const { password } = req.body;

  return List
    .findById(listId)
    .then(function (list) {
      if (!list) {
        return res.status(404).send();
      }

      return list
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
