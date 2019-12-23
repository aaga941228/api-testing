const Joi = require("@hapi/joi");

const pokemonSchema = Joi.object({
  name: Joi.string().min(3)
});

const userSchema = Joi.object({
  pokemon: pokemonSchema,

  firstName: Joi.string()
    .min(2)
    .alphanum()
    .max(15)
    .required(),

  lastName: Joi.string()
    .min(2)
    .alphanum()
    .max(30)
    .required(),

  username: Joi.string()
    .min(2)
    .alphanum()
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),

  birthYear: Joi.number()
    .integer()
    .min(1990)
    .max(2013)
    .required(),

  email: Join.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "es"] } })
    .required()
});

module.exports = userSchema;
