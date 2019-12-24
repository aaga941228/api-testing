const Joi = require("@hapi/joi");

const pokemonSchema = Joi.object({
  name: Joi.string().min(3)
});

module.exports = Joi.object({
  pokemon: pokemonSchema,

  firstName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  lastName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .min(6)
    .max(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{6}$"))
    .required(),

  birthYear: Joi.number()
    .integer()
    .min(1900)
    .max(2013)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
});
