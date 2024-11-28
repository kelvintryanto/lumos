const { User, Journal } = require("../models");
const userAuthorization = async (req, res, next) => {
  try {
    const { UserId } = req.loginInfo;

    const user = await User.findByPk(UserId);
    if (!user) throw { name: "NotFound", id };

    if (user.id !== UserId) throw { name: "Forbidden" };
    next();
  } catch (error) {
    next(error);
  }
};
const journalAuthorization = async (req, res, next) => {
  try {
    const { UserId } = req.loginInfo;

    const { id } = req.params;

    const journal = await Journal.findByPk(id);
    if (!journal) throw { name: "NotFound", id };

    if (journal.UserId !== UserId) throw { name: "Forbidden" };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { userAuthorization, journalAuthorization };
