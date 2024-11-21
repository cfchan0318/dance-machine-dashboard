const express = require('express');
const router = express.Router();
const multer = require('multer')

const poseImgStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/pose');
    },
    filename: function (req, file, callback) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        callback(null, `${file.originalname}`);
    }
});
const poseUpload = multer({ storage: poseImgStorage })

const {
    createPose,
    getAllPose,
    getPoseById,
    deletePose } = require('../controllers/pose')

router.get('/', getAllPose);
router.get('/:id', getPoseById);
router.post('/', poseUpload.single('image'), createPose);
router.delete('/:id', deletePose);


module.exports = router;