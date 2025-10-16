import express from 'express';
import { createCvController } from '../controllers/cvs.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createCvSchema } from '../validation/cvs.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
  '/cvs',
  jsonParser,
  validateBody(createCvSchema),
  ctrlWrapper(createCvController),
);

export default router;
