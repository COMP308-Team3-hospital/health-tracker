const tf = require('@tensorflow/tfjs-node');

// Function to load a pre-trained TensorFlow model
const loadModel = async () => {
    const model = await tf.loadLayersModel('');
    return model;
};

module.exports = { loadModel };
