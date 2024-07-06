const path = require("node:path");
const fs = require("fs");
const auth = require("../model/auth");
const jsontoken = require("jsonwebtoken");
const secreatekey = "cwytxsvuajnkoxcdsyxvjhznkisdbuxbk";
const mongoose = require("mongoose");
const file_upload = async (req, res) => {
  try {
    const file = req.files.file[0];
    const { last_user_image } = req.body;
    const user = req.user;

    // delete previous user iamge
    const prev_img_base_name = path.basename(last_user_image[0]);
    const prev_user_user_name = path.basename(path.dirname(last_user_image[0]));
    const prev_img_path = path.resolve(
      __dirname,
      "../public",
      "user",
      `${prev_user_user_name}`,
      `${prev_img_base_name}`
    );

    if (fs.existsSync(prev_img_path)) {
      fs.unlinkSync(prev_img_path);
      fs.rmdirSync(
        path.resolve(__dirname, "../public", "user", `${prev_user_user_name}`)
      );
      console.log("prev img deleted..!");
    }

    // setting path and copy file to user folder
    const folder_name = path.resolve(
      __dirname,
      "../public",
      "user",
      `${user.username}`
    );
    if (!fs.existsSync(folder_name)) {
      fs.mkdirSync(folder_name, {
        recursive: true,
      });
    }
    const ext_name = path.extname(file.originalFilename);
    const mongoose_id = new mongoose.Types.ObjectId();
    const file_name_path = `${folder_name}/${user.fullName}-${mongoose_id}${ext_name}`;

    fs.copyFileSync(file.filepath, file_name_path);
    fs.unlinkSync(file.filepath);
    const img_db_path = path.join(
      "http://localhost:5000/",
      "user",
      `${user.username}`,
      `${user.fullName}-${mongoose_id}${ext_name}`
    );
    await auth.findOneAndUpdate(
      { username: user.username },
      {
        image: img_db_path,
      }
    );
    return res.status(201).json({
      uploaded_file_path: img_db_path,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const profile_edit = async (req, res) => {
  try {
    const { _id } = req.params;
    const { userName, fullName, email, mobileNumber } = req.body;

    if (!userName || !fullName || !email || !mobileNumber) {
      return res.status(422).json({
        message: "all the field should  required",
      });
    }
    const userCredential = await auth.findOne({
      $or: [{ username: userName }, { email: email }],
    });

    if (userCredential && !userCredential.equals(_id)) {
      return res
        .status(422)
        .json({ message: "User Name or Email Id alreday Registered" });
    }

    await auth.findOneAndUpdate(
      { _id },
      { username: userName, fullName, email, mobileNumber },
      {
        upsert: true,
      }
    );
    res.cookie("access_token", "");
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
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { file_upload, profile_edit };
