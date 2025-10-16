import Joi from 'joi';

export const createCvSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  position: Joi.string().min(2).max(50).required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  city: Joi.string().min(3).max(100).required(),
  exp: Joi.string(),
  edu: Joi.string(),
  add: Joi.string(),
});
