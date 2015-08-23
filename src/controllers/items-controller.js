import Item from '../models/item-model.js';

export function fetchAllItems(req, res, next) {
  return Item
    .findAll()
    .then(items => {
      return res.status(200).send(items);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}

export function fetchItemsForList(req, res, next) {
  const { listId } = req.params;

  return Item
    .findAll({
      where: { listId },
    })
    .then(items => {
      return res.status(200).send(items);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}

export function createItem(req, res, next) {
  const {
    user: { userId: createdByUserId },
    params: { listId },
    body: {
      name,
      description,
      url,
      price,
      secret,
      priority,
      },
    } = req;

  return Item.create({
    listId,
    createdByUserId,
    name,
    description,
    url,
    price,
    secret,
    priority,
  }).then(item => {
    return res.status(201).send(item);
  }).catch(error => {
    return res.status(415).send(error);
  });
}

export function fetchItem(req, res, next) {
  const { itemId } = req.params;

  return Item
    .findById(itemId)
    .then(item => {
      if (!item) {
        return res.status(404).send();
      }

      return res.status(200).send(item);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}

export function updateItem(req, res, next) {
  const {
      user: { userId },
      params: { itemId },
      body: {
        name,
        description,
        url,
        price,
        secret,
        priority,
      },
    } = req;

  return Item
    .findById(itemId)
    .then(item => {
      if (!item) {
        return res.status(404).send();
      }

      item.getList()
        .then(list => {
          if (!list) {
            return res.status(404).send();
          }

          if (userId !== item.getDataValue('createdByUserId') && userId !== list.getDataValue('ownerUserId')) {
            return res.status(403).send();
          }

          return item.update({
            name,
            description,
            url,
            price,
            secret,
            priority,
          })
            .then(item => {
              return res.status(200).send(item);
            })
            .catch(error => {
              return res.status(500).send(error);
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

export function deleteItem(req, res, next) {
  const { user: { userId }, params: { itemId } } = req;

  return Item
    .findById(itemId)
    .then(item => {
      if (!item) {
        return res.status(404).send();
      }

      item.getList()
        .then(list => {
          if (userId !== item.getDataValue('createdByUserId') && userId !== list.getDataValue('ownerUserId')) {
            return res.status(403).send();
          }

          return item
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
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}
