import Joi from 'joi';

const boardValidator = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Name minimum length is 3 characters',
    'string.max': 'Name maximum length is 20 characters',
    'string.empty': 'Name field is required',
  }),
});

export { boardValidator };
