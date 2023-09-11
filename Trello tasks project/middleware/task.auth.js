import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { token } = req.headers;
    let decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (id !== decoded.id) {
      return res.json({ message: "Please signIn first" });
    }
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

export { auth };
