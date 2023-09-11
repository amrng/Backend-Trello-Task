import jwt from "jsonwebtoken";

let auth = async (req, res, next) => {
  try {
    const { id } = req.params;
    let decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    if (id !== decoded.id) {
      return res.json({ message: "Please signIn first" });
    }
    let { token } = req.headers;
    !token && res.json({ message: "Please Porvide token" });
    if (token) {
      let decode = jwt.verify(token, process.env.Secret_Key);
      if (decode) {
        next();
      }
    }
  } catch (err) {
    next(err);
  }
};

export default auth;
