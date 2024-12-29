const express = require('express');
const router = express.Router();
const multer = require('multer')
const {authenticateToken} = require('../middleware/auth')

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
    deletePose,
    getPoseByPose
} = require('../controllers/pose')

router.get('/', getAllPose);
router.get('/:id', getPoseById);
router.get('/pose/:pose',getPoseByPose)
router.post('/',authenticateToken, poseUpload.single('image'), createPose);
router.delete('/:id',authenticateToken, deletePose);


module.exports = router;