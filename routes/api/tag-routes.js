const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // /api/tags

  // find all tags
  // be sure to include its associated Product data
  Tag
    .findAll({
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name'],
        }
      ]
    })
    .then(tags => res.status(200).json(tags))
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // /api/tags/1

  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag
    .findAll({
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name'],
        }
      ],
      where: {
        id: req.params.id
      }
    })
    .then(tags => res.status(200).json(tags))
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  // /api/tags
  
  // create a new tag
  Tag
    .create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // /api/tags/1
  // json: {
  //   "tag_name": "new tag"
  // }

  Tag.update(req.body, {
    where: {
      id: req.params.id
    },
    fields: ['tag_name']
  })
    .then((numberOfUpdatedRows) => {
      if (numberOfUpdatedRows === 0) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }

      res.status(200).json({ message: `Tag ${req.params.id} updated` });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // /api/tags/1

  // delete a tag by its `id` value and delete the association in ProductTag
  Tag
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then((numberOfDeletedTags) => {
      if (numberOfDeletedTags === 0) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }

      // delete the association in ProductTag by tag_id
      return ProductTag.destroy({
        where: {
          tag_id: req.params.id
        }
      })
        .then((numberOfDeletedProductTags) => {
          res.status(200).json({ message: `Tag ${req.params.id} deleted` });
        })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
