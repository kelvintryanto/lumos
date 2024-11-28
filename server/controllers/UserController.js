const { compare } = require("../helpers/bcrypt");
const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async googleLogin(req, res, next) {
    try {
      const { token } = req.headers;
      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      console.log("ini isi payload", payload);

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          username: payload.name,
          profilePicture: payload.picture,
          password: "password_google",
        },
        hooks: false,
      });

      const access_token = signToken({
        id: user.id,
        email: user.email,
        username: user.username,
      });

      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const user = await User.create({
        username,
        email,
        password,
      });

      const profile = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      res.status(201).json({
        message: "Success create new User",
        data: profile,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      // 1. Cek dulu user dan passwordnya ada atau tidak karena tidak masuk validasi
      const { email, password } = req.body;
      if (!email || !password) throw { name: "BadRequest" };

      const user = await User.findOne({
        where: { email },
      });

      // 2. jika user tidak ada maka lempar LoginError
      if (!user) throw { name: "LoginError" };

      // 3. jika password tidak cocok dengan database lempar LoginError
      if (!compare(password, user.password)) throw { name: "LoginError" };

      // 4. buat payload dan capnya
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      // 5. buat access_tokennya
      const access_token = signToken(payload);
      console.log(access_token);

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      const { UserId } = req.loginInfo;
      const user = await User.findByPk(UserId, {
        attributes: {
          exclude: ["password"],
        },
      });

      res.status(200).json({
        message: "Succeed read user",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  // update ini digunakan untuk mengupdate profile
  static async update(req, res, next) {
    try {
      const { UserId } = req.loginInfo;
      const { username, email, password, profilePicture } = req.body;

      const user = await User.findByPk(UserId);
      if (!user) throw { name: "NotFound", UserId };

      await user.update({ username, email, password, profilePicture });

      const profile = {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicsture: user.profilePicture,
      };

      res.status(200).json({
        message: "Succeed update user",
        profile,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { UserId } = req.loginInfo;

      const user = await User.findByPk(UserId);
      if (!user) throw { name: "NotFound", UserId };

      await user.destroy();

      res.status(200).json({
        message: "Succeed delete user",
        user,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
