const { User, Cuisine, Category } = require("../models");
const authorization = async (req, res, next) => {
  try {
    const { role, userId } = req.loginInfo;

    if (role === "staff") {
      const { id } = req.params;

      const cuisines = await Cuisine.findByPk(id);
      if (!cuisines) throw { name: "NotFound", id };

      if (cuisines.authorId !== userId) throw { name: "Forbidden" };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
