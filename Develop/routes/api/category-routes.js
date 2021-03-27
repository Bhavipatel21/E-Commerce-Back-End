const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {

  // find all categories
  try {
    const categoryData = await Category.findAll( {
    //include associated product
    include: [{model: Product}]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
    //include associated product
    include: [{model: Product}]
    });
    if(!categoryData) {
      res.status(404).json({message: 'No category found with that id! Please try again!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
  res.status(500).json(err);
  }
  
});

router.post('/', async (req, res) => {

  // create a new category
  try {
    const categoryData = await Category.create(req.body);

    res.status(200).json(categoryData);

  } catch (err) {

    res.status(400).json(err);

  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const id = req.params.id;
  try {
    const categoryData = await Category.update( req.body, {
      where: {id: id}
    })
    if (!categoryData) {
      res.status(400).json({message: 'You must enter data and a valid id to update!'})
      return;
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(400).json(err);
  }
});
// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!categoryData) {
      res.status(400).json({message:'No category found with that id!'})
      return;
    }
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
