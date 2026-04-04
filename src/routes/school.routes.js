const express = require('express');
const asyncHandler = require('../Utils/asyncHandler');
const authMiddleware = require('../middlewares/auth.middleware');
const {
  createSchool,
  getSchools,
  removeSchool
} = require('../controllers/school.controller');

const router = express.Router();

router.post('/', authMiddleware, asyncHandler(createSchool));
router.get('/', asyncHandler(getSchools));
router.delete('/:id', authMiddleware, asyncHandler(removeSchool));

module.exports = router;
