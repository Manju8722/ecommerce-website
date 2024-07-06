const bcyrpt = require("bcrypt");
const jsontoken = require("jsonwebtoken");
const Auth = require("../model/auth");
const secreatekey = "cwytxsvuajnkoxcdsyxvjhznkisdbuxbk";

const login_post = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username | !password) {
      return res.status(422).json({
        message: "username and password required",
      });
    }
    const userCredential = await Auth.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!userCredential) {
      return res.status(422).json({
        message: "username not exits plzz try to sign up",
      });
    }
    const passwordMatch = await bcyrpt.compare(
      password,
      userCredential.password
    );
    if (!passwordMatch) {
      return res.status(422).json({
        message: "incorrect username and password",
      });
    }

    const accessToken = await jsontoken.sign(
      {
        username: userCredential.username,
        fullName: userCredential.fullName,
        email: userCredential.email,
        mobileNumber: userCredential.mobileNumber,
        id: userCredential._id,
      },
      secreatekey,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("access_token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: false,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "user login succesfully",
      accessToken,
    });
  } catch (error) {
    return res.status(422).json({
      error,
    });
  }
};

const signup_post = async (req, res) => {
  try {
    const { username, password, fullName, email, mobileNumber } = req.body;
    //    console.log("hii in signup ");
    //  console.log(username, password);
    if (!username || !password || !fullName || !email || !mobileNumber) {
      return res.status(422).json({
        message: "all the field should  required",
      });
    }

    const userExist = await Auth.findOne({
      $or: [{ username }, { email }],
    });

    if (userExist) {
      return res.status(422).json({
        message: "username or email alraedy exists",
      });
    }
    const salt = await bcyrpt.genSalt();

    const hashedPassword = await bcyrpt.hash(password, salt);
    await Auth.create({
      username,
      password: hashedPassword,
      email,
      fullName,
      mobileNumber,
    });

    return res.status(201).json({
      message: "user credential created",
    });
  } catch (error) {
    return res.status(422).json({
      error,
    });
  }
};
const logout_get = async (req, res) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(422).json({ message: "access token cookie not exits" });
    }
    const decoded = await jsontoken.verify(accessToken, secreatekey);
    if (!decoded) {
      return res
        .status(422)
        .json({ message: "access token jwt token has been tamperead" });
    }
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    return res
      .status(200)
      .json({ message: "user has been logout succesfully" });
  } catch (error) {
    return res.status(422).json({ error });
  }
};
const userMe = (req, res) => {
  return res.status(200).json({ user: req.user });
};

module.exports = {
  login_post,
  signup_post,
  userMe,
  logout_get,
};
