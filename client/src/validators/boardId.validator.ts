import Joi from 'joi';

const boardIdValidator = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.guid': 'ID must be a valid UUID',
    'string.empty': 'ID field is required',
  }),
});

export { boardIdValidator };
