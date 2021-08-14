const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("cloudinary");
const { isAuth } = require("../utils");
require("../handlers/cloudinary");

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}.jpg`);
//   },
// });

const storage = multer.diskStorage({});

const upload = multer({ storage });

router.post("/", isAuth, upload.single("image"), async (req, res) => {
  // res.send(`/${req.file.path}`);
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  res.send(result.secure_url);
});

module.exports = router;
