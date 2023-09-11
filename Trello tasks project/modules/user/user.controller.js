import userModel from "../../DB/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../../utilities/sendEmail.js";
import "dotenv/config";
import verificationMail from "../../verifyMailTemp.js";

//#######################################
//##### mtnsa4 t8yr el errors
//#######################################
// SignUp Manager or New User
const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let founded = await userModel.findOne({ email: email });
    if (!founded) {
      let hashedPassword = bcrypt.hashSync(password, +SALT_ROUNDS);
      let addUser = await userModel.create({
        ...req.body,
        password: hashedPassword,
      });
      const token = jwt.sign({ id: addUser._id }, process.env.SECRET_KEY);
      const confLink = `${req.protocol}://localhost:3333/user/verify/${token}`;
      const send = await sendMail({
        from: process.env.APP_EMAIL,
        to: addUser.email,
        subject: "Trello email verification",
        html: verificationMail(confLink),
      });
      return res
        .status(201)
        .json({ message: "SignUp Successfully 🥳", addUser });
    } else if (founded && founded.isDeleted == true) {
      let resetAccount = await userModel.findOneAndUpdate(
        { email: email },
        { isDeleted: false }
      );
      return res
        .status(201)
        .json({ message: "Your account has active again 😉", founded });
    } else {
      return res.status(400).json({ message: "Already Registered" });
    }
  } catch {
    (err) => res.status(400).json({ err });
  }
};

// Send Verification Mail
const verify = async (req, res, next) => {
  try {
    let decoded = jwt.verify(req.params.token, process.env.SECRET_KEY);
    const user = await userModel.findOneAndUpdate(
      { _id: decoded.id },
      { isVerified: true },
      { new: true }
    );
    if (user) {
      return res.json(user);
    } else {
      res.json({ message: "Invalid token" });
    }
  } catch {
    (err) => res.status(400).json({ message: "verify error", err });
  }
};

// SignIn
const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const founded = await userModel.findOne({ email: email });
    if (founded && founded.isDeleted == false && founded.isVerified == true) {
      let matched = bcrypt.compareSync(password, founded.password);
      if (matched) {
        let token = jwt.sign(
          { id: founded.id, email: founded.email },
          process.env.SECRET_KEY
        );
        return res
          .status(202)
          .json({ message: `--- WELCOME ${founded.userName} 🥳👋🏼 ---`, token });
      } else {
        return res.status(400).json({ message: "Wrong Password" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "User not exist please signUp OR Not verified" });
    }
  } catch (err) {
    next(err);
  }
};

// Delete user
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const founded = await userModel.findOne({ email: email });
    if (founded && founded.isDeleted == false) {
      let matched = bcrypt.compareSync(password, founded.password);
      if (matched) {
        const deleted = await userModel.findByIdAndDelete({ _id: id });
        return res.json({ message: `User has been deleted ☹️` });
      } else {
        return res.status(400).json({ message: "Wrong Password" });
      }
    } else {
      return res.status(400).json({ message: "Wrong Email" });
    }
  } catch (err) {
    next(err);
  }
};

// Soft Delete
const softDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const founded = await userModel.findOne({ email: email });
    if (founded && founded.isDeleted == false) {
      let matched = bcrypt.compareSync(password, founded.password);
      if (matched) {
        await userModel.findByIdAndUpdate(id, { isDeleted: true });
        return res.json({ message: `User has been deleted ☹️` });
      } else {
        return res.status(400).json({ message: "Wrong Password" });
      }
    } else {
      return res.status(400).json({ message: "Wrong Email" });
    }
  } catch (err) {
    next(err);
  }
};

// Update user Age, FirstName, LastName
const updateUserData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { age, firstName, lastName } = req.body;
    const founded = await userModel.findById({ _id: id });
    if (founded) {
      let updated = await userModel.findByIdAndUpdate(id, {
        age,
        firstName,
        lastName,
      });
      return res.json({ message: `User has been Updated 👌😃`, updated });
    } else {
      return res.status(400).json({ message: "Wrong Password" });
    }
  } catch (err) {
    next(err);
  }
};

// Update user Age, FirstName, LastName
const changePassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const founded = await userModel.findOne({ email: email });
    if (founded) {
      let updatedPassword = await userModel.findByIdAndUpdate(
        id,
        { password: bcrypt.hashSync(password, 10) },
        { new: true }
      );

      return res.json({ message: `Password Updated 👌😃`, updatedPassword });
    } else {
      return res.status(400).json({ message: "Wrong Password" });
    }
  } catch (err) {
    next(err);
  }
};

// Logout
const logOut = async (req, res, next) => {
  try {
    const { id } = req.params;
    const founded = await userModel.findById({ _id: id });
    if (founded && founded.isDeleted == false) {
      res.removeHeader("token");
      return res.json({ message: "successfully Logout ☹️👋🏼👋🏼" });
    } else {
      return res.status(400).json({ message: "User not exist" });
    }
  } catch (err) {
    next(err);
  }
};

export {
  signUp,
  verify,
  signIn,
  updateUserData,
  changePassword,
  deleteUser,
  softDelete,
  logOut,
};
