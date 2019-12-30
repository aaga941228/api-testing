module.exports = {
  validateName: Name => {
    if (!/^[a-zA-Z0-9]+$/.test(Name)) {
      throw new Error(`${Name} must be a valid string`);
    }
  },

  validateBirthYear: birthYear => {
    if (!/^[0-9]{4}$/.test(birthYear))
      throw new Error("birth year must be a valid year");
  }
};
