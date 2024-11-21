
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, process.env.VIDEO_UPLOAD_PATH);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

function checkFileType(file, filetypes) {
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return true;
  } else {
    return false;
  }
}

function checkFileExists(filePath, file) {
  const checkPath = path.join(filePath,file.originalname)
  if (fs.existsSync(checkPath)) {
    return true
  } else {
    return false
  }
}

const uploadVideoToStorage = (req, res, next) => {
  const upload = multer({
    fileFilter: function (_req, file, cb) {
      if (!checkFileType(file, /mp4/)) {
        return cb(new Error('File type not supported'), false);
      }
      if (checkFileExists(process.env.VIDEO_UPLOAD_PATH, file)) {
        return cb(new Error('File already uploaded'), false);
      }
      console.log('ok')
      cb(null, true);
    },
    storage: storage
  }).single('video'); // Assuming you're uploading a single video file

  upload(req, res, function(err) {
    if (err) {
      return next(err);
    }
    next();
  });
};

module.exports = { uploadVideoToStorage }