const Clarifai = require('clarifai');

const clarifaiApp = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
});

const testUrl =
  'https://www.encyclopedia.com/sites/default/files/4/2793330.jpg';

const detectFaces = async (req, res) => {
  const { input } = req.body;
  try {
    const result = await clarifaiApp.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      input || testUrl
    );
    const data = getBoundingBoxes(result);
    console.log(data);
    res.status(200).json({ message: 'Face Detect success!', data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Face Detect Fail!' });
  }
};

const getBoundingBoxes = result => {
  const boundingBoxes = result.outputs[0].data.regions.map(region => {
    return region.region_info.bounding_box;
  });
  return boundingBoxes;
};

const uploadTest = async (req, res) => {
  console.log('uploadTest hit');
  try {
    const image = req.file;
    console.log(image.path);
    res.status(200).json({ message: 'Upload success!' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Upload fail!' });
  }
};

module.exports = { detectFaces, uploadTest };
