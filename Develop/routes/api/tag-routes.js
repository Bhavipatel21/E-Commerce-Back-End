const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'product_tags' }]
    });

    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {

      include: [{ model: Product, through: ProductTag, as: 'product_tags' }]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id, please try again.' })
      return;
    }

    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err)
    return;
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const id = req.params.id;
  try {
    const tagData = await Tag.update(req.body, {
      where: { id: id }
    })
    if (!tagData) {
      res.status(400).json({ message: 'You must enter data and a valid id to update!' })
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
    return;
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    //if no product with that id, return 404 error, else delete chosen product
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id, please try again." })
      return;
    }

    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
