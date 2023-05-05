const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // /api/categories/
  // find all categories
  // be sure to include its associated Products
  Category.findAll(
    {
      include: [Product]
    }
  )
    .then(
      categories => res.status(200).json(categories)
    )
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // /api/categories/1
  // req.params.id
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'name', 'price', 'stock']
      }
    ]
  })
    .then(category => {
      if (!category) {
        res.status(404).json({ message: 'No category found with this id' })
        return;
      }
      res.status(200).json(category);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // /api/categories/
  // create a new category
  Category
    .create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // /api/categories/1
  // update a category by its `id` value
  // {
  //   "category_name": "New Category"  
  // }

  // write a function that updates the Category model by id with the data in req.body
  Category.update(req.body, {
    where: {
      id: req.params.id
    },
    fields: ['category_name']
  })
    .then(category => {
      if (!category) {
        res.status(404).json({ message: 'No category found with this id' })
        return;
      }

      res.status(200).json(category);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  // write a function that deletes the Category model by id
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(category => {
      if (!category) {
        res.status(404).json({ message: 'No category found with this id' })
        return;
      }

      res.status(200).json(category);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
