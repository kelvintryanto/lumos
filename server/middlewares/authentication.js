const { verifyToken } = require("../helpers/jwt");
const { User } = require("./../models");

const authentication = async (req, res, next) => {
  try {
    // 1. Cek tokennya ada atau tidak? token dikirim melalui headers dengan standard Bearer Token
    const { authorization } = req.headers;
    if (!authorization) throw { name: "Unauthorized" };

    // untuk memisahkan Bearer <token>
    // cuma mau ambil tokennya aja
    const access_token = authorization.split(" ")[1];
    const payload = verifyToken(access_token);
    if (!payload) throw { name: "JsonWebTokenError" };
    // jika gagal verify, jwt otomatis throw error dengan nama "JsonWebTokenError"
    // jadi harus dihandle di error

    // user dicari menggunakan payload
    // cari usernya ada atau tidak
    const user = await User.findByPk(payload.id);
    if (!user) throw { name: "Unauthorized" };

    req.loginInfo = {
      userId: payload.id,
      email: payload.email,
      role: payload.role,
    };
    //www.youtube.com/watch?v=cO89Hhv1VEI&ab_channel=SebatIn
    https: next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
