const Clarifai = require('clarifai');
const fs = require('fs');

const clarifaiApp = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
});

const testUrl =
  'https://www.encyclopedia.com/sites/default/files/4/2793330.jpg';

const detectFacesWithUrl = async (req, res) => {
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

const detectFacesWithBase64 = async (req, res) => {
  try {
    const image = req.file;
    const imageToBase64 = fs.readFileSync(image.path).toString('base64');
    // console.log(imageToBase64);

    const result = await clarifaiApp.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      { base64: imageToBase64 }
    );
    const data = getBoundingBoxes(result);
    res
      .status(200)
      .json({ message: 'Face Detect success!', imageUrl: image.path, data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Upload fail!' });
  }
};

module.exports = { detectFacesWithUrl, detectFacesWithBase64 };
