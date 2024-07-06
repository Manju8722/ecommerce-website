const jsontoken = require("jsonwebtoken");
const Auth = require("../model/auth");
const secreatekey = "cwytxsvuajnkoxcdsyxvjhznkisdbuxbk";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    //  console.log(authHeader);
    if (authHeader?.startsWith("Bearer")) {
      const authToken = authHeader.split(" ")[1];
      // console.log(authToken);
      const decoded = await jsontoken.verify(authToken, secreatekey);
      if (decoded) {
        //        console.log(decoded);
        const authObj = await Auth.findById(decoded.id);
        //   console.log(authObj);
        if (authObj) {
          req.user = {
            username: authObj.username,
            id: authObj._id,
            fullName: authObj.fullName,
            mobileNumber: authObj.mobileNumber,
            email: authObj.email,
            image: authObj.image,
          };
          return next();
        } else {
          req.user = {};
          return next();
        }
      } else {
        req.user = {};
        return next();
      }
    } else {
      req.user = {};
      return next();
    }
  } catch (error) {
    return res.status(422).json(error);
  }
};

module.exports = authMiddleware;
