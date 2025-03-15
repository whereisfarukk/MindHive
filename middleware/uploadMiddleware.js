const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    const types = /jpeg|jpg|png|gif/;
    const extName = types.test(path.extname(file.originalname).toLowerCase());
    /*path.extname(file.originalname) this section extract the extension from the file and types.test() this section compare the extension with types*/
    const mimeType = types.test(file.mimetype);
    // extName and mimeType will return a value either true or false
    if (extName && mimeType) {
      cb(null, true);
    } else [db(new Error("only support Image"))];
  },
});

module.exports = upload;
