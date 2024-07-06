const formidable = require("formidable");

const formiddable_route = async (req, res, next) => {
  try {
    console.log("inside formiddble");
    const form = new formidable.IncomingForm();
    const form_parse_data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          next(err);
          reject(err);
        }
        //   console.log(fields);
        //   console.log(files);
        //   res.json({ fields, files });
        resolve({
          body: fields,
          files,
        });
      });
    });
    req.body = { ...req.body, ...form_parse_data.body };
    req.files = { ...form_parse_data.files };
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = formiddable_route;
