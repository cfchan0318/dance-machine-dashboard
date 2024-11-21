const tf = require('@tensorflow/tfjs');
const poseDetection = require('@tensorflow-models/pose-detection');
const { createCanvas, loadImage } = require('canvas');
//const fs = require('fs');

require("@tensorflow/tfjs-backend-webgl")
require("@tensorflow/tfjs-backend-cpu")

async function poseDetect(imgPath) {
    await tf.ready();
    const model = poseDetection.SupportedModels.MoveNet;
    const detector = await poseDetection.createDetector(model);

    const img = await loadImage(imgPath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const input = tf.browser.fromPixels(canvas);
    const poses = await detector.estimatePoses(input, {
        architecture: 'MobileNetV1',
        outputStride: 16,
        flipHorizontal: false,
        decodingMethod: 'single-person'
    });

    if (poses) {
        return poses[0]
    } else {
        return null;
    }
}

module.exports =  { poseDetect };