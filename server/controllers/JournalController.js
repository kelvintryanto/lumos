const { Journal } = require("../models");

class JournalController {
  static async read(req, res, next) {
    try {
      const { UserId } = req.loginInfo;
      const journals = await Journal.findAll({
        where: {
          UserId,
        },
        order: [["date", "desc"]],
      });

      res.status(200).json({
        journals,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readJournalById(req, res, next) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  static async createJournal(req, res, next) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  static async updateJournal(req, res, next) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteJournal(req, res, next) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  static async;
}

module.exports = JournalController;
