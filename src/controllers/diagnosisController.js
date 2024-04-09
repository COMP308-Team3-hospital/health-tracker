const tf = require('@tensorflow/tfjs-node');
const { loadModel } = require('../utils/modelLoader');

const diagnoseCondition = async (req, res) => {
  try {
    const symptoms = req.body.symptoms;
    if (!Array.isArray(symptoms) || !symptoms.length) {
      return res.status(400).json({ error: 'Invalid input, array of symptoms required.' });
    }

    const model = await loadModel();
    const inputTensor = tf.tensor2d(symptoms, [1, symptoms.length]);
    const predictions = model.predict(inputTensor);
    const predictionData = predictions.dataSync();

    res.json({ diagnosis: predictionData });
  } catch (error) {
    console.error('Diagnosis error:', error);
    res.status(500).send('Error diagnosing condition');
  }
};

module.exports = {
    diagnoseCondition
};
