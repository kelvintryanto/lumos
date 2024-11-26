import { Journal } from "./../models";

class JournalController {
  static async readByUserId(req, res, next) {
    try {
      const { UserId } = req.loginInfo;
      const journals = await Journal.findAll({
        where: {
          UserId,
        },
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

  static async createJournalForm(req, res, next) {
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

  static async updateJournalForm(req, res, next) {
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
