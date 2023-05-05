const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // /api/categories/
  // find all categories

  Category.findAll(
    {
      include: [Product]
    }
  ).then(
    categories => res.json(categories)
  )
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // /api/categories/1
  // req.params.id
  // find one category by its `id` value
  // be sure to include its associated Products
  // TODO: find one category by its `id` value
});

router.post('/', (req, res) => {
  // /api/categories/
  // create a new category
  // TODO: create a new category
});

router.put('/:id', (req, res) => {
  // /api/categories/1
  // update a category by its `id` value
  // TODO: update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  // TODO: delete a category by its `id` value
});

module.exports = router;
