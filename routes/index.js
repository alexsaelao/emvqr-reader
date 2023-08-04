const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const checkQRController = require('../controllers/checkQRController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan')
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'controllers/functions/imgs');
  },
  filename: function (req, file, callback) {
    callback(null, "qr" + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage })
const {
  loggerMiddleware
} = require('../middleware/loggerMiddleware');


/* GET home page. */
router.get('/',[loggerMiddleware], indexController.emvText);
router.get('/image',[loggerMiddleware], indexController.emvImage);
router.get('/checkText',[loggerMiddleware], checkQRController.checkText);
router.get('/checkImage',[loggerMiddleware], checkQRController.checkImage);
router.post('/uploadCheckText',[loggerMiddleware], checkQRController.uploadCheckText);
router.post('/uploadCheckImage',[loggerMiddleware], upload.single('img'), checkQRController.uploadCheckImage);
router.post('/uploadText', [loggerMiddleware],indexController.uploadText);
router.post('/uploadImage', [loggerMiddleware], upload.single('img'), indexController.uploadImage);

/* GET Logs. */
router.get('/logs', [loggerMiddleware], (req, res) => {
  try {
    fs.readFile('./out.log', (err, data) => {
      if (err) {
        response = {
          message: "LOGS_NOT_FOUND",
          note: "Please try again with new date"
        }
        res.send(response)
      };
      res.end(data);
    });
  } catch (error) {
    res.send(error.message)
  }
});

module.exports = router;
