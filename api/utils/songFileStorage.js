const multer = require('multer');
const path = require('path');
const fs = require('fs');

const SONG_UPLOAD_PATH = process.env.SONG_UPLOAD_PATH || path.join('uploads', 'songs');

const storage = multer.diskStorage({
  destination: function (_req, _file, callback) {
    fs.mkdirSync(SONG_UPLOAD_PATH, { recursive: true });
    callback(null, SONG_UPLOAD_PATH);
  },
  filename: function (_req, file, callback) {
    // keep original filename (same behavior as existing video upload)
    callback(null, file.originalname);
  },
});

function checkFileType(file, filetypes) {
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  return mimetype && extname;
}

function checkFileExists(filePath, file) {
  const checkPath = path.join(filePath, file.originalname);
  return fs.existsSync(checkPath);
}

const uploadSongImageToStorage = (req, res, next) => {
  console.log('here')
  const upload = multer({
    fileFilter: function (_req, file, cb) {
      if (!checkFileType(file, /(jpe?g|png|webp)/)) {
        return cb(new Error('File type not supported'), false);
      }
      if (checkFileExists(SONG_UPLOAD_PATH, file)) {
        return cb(new Error('File already uploaded'), false);
      }
      cb(null, true);
    },
    storage,
  }).single('photo');

  upload(req, res, function (err) {
    if (err) {
      return next(err);
    }
    next();
  });
};

module.exports = { uploadSongImageToStorage, SONG_UPLOAD_PATH };
