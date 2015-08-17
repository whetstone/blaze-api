import Item from '../models/item-model.js';

export function fetchAllItems(req, res, next) {
  return Item
    .findAll()
    .then(function (items) {
      return res.status(200).send(items);
    })
    .catch(function (error) {
      return res.status(500).send(error);
    });
}

export function fetchItemsForList(req, res, next) {
  const { listId } = req.params;

  return Item
    .findAll({
      where: { listId },
    })
    .then(function (items) {
      return res.status(200).send(items);
    })
    .catch(function (error) {
      return res.status(500).send(error);
    });
}

export function createItem(req, res, next) {
  const { listId } = req.params;

  const {
      name,
      description,
      url,
      price,
      secret,
      priority,
    } = req.body;

  return Item.create({
    listId,
    name,
    description,
    url,
    price,
    secret,
    priority,
  }).then(function (item) {
    return res.status(201).send(item);
  }).catch(function (error) {
    return res.status(415).send(error);
  });
}

export function fetchItem(req, res, next) {
  const { itemId } = req.params;

  return Item
    .findById(itemId)
    .then(function (item) {
      if (!item) {
        return res.status(404).send();
      }

      return res.status(200).send(item);
    })
    .catch(function (error) {
      return res.status(500).send(error);
    });
}

export function updateItem(req, res, next) {
  const { itemId } = req.params;

  const {
      name,
      description,
      url,
      price,
      secret,
      priority,
    } = req.body;

  return Item
    .findById(itemId)
    .then(function(item) {
      if (!item) {
        return res.status(404).send();
      }

      return item.update({
        name,
        description,
        url,
        price,
        secret,
        priority,
      })
        .then(function (item) {
          return res.status(200).send(item);
        })
        .catch(function (error) {
          return res.status(500).send(error);
        });
    })
    .catch(function (error) {
      return res.status(500).send(error);
    });
}

export function deleteItem(req, res, next) {
  const { itemId } = req.params;

  const { password } = req.body;

  return Item
    .findById(itemId)
    .then(function (item) {
      if (!item) {
        return res.status(404).send();
      }

      return item
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
