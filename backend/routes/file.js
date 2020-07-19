const router = require('express-promise-router')();
const passport = require('passport');
const { model, Schema, mongo, connection } = require('mongoose');


const { validateBody, schemas } = require('../helpers/routeHelpers');
const FileController = require('../controllers/file');
const passportJWT = passport.authenticate('jwt', { session: false });
const { mongo_URL } = require("../constants");
const multer = require('multer');

// set up connection to db for file storage
const storage = multer.diskStorage({
  destination: 'uploaded_img',
  filename: function (req, file, callback) {
    let record = JSON.parse(req.body.record)
    const filename = file.originalname.split(".")[0] + "_"+ record.student_name + "_" + record.student_age + "_" + record.student_school + "_" + req.user.id + "." + file.originalname.split(".")[1];
    callback(null, filename)
  }
});
// sets file input to single file
const singleUpload = multer({ storage: storage }).single('file');

router.route('/add_file')
  .post(passportJWT, singleUpload, validateBody(schemas.addFileSchema), FileController.add_file);

router.route('/get_file')
  .post(passportJWT, validateBody(schemas.getFileSchema), FileController.get_file);

router.route('/delete_file')
  .post(passportJWT, validateBody(schemas.deleteFileSchema), FileController.delete_file);

  
module.exports = router;