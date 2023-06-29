const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./data/files");
  },
  filename: function (req, file, cb) {
    console.log(req.files);
    const uniqueSuffix =
      new Date().toISOString().replace(/:/g, "-") +
      "-" +
      Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix);
  },
});

module.exports = multer({ storage: storage });
