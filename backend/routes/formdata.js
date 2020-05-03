const router = require('express-promise-router')();
const passport = require('passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const FormdataController = require('../controllers/formdata');
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/add_formdata')
  .post(passportJWT, validateBody(schemas.addformdataSchema), FormdataController.add_formdata);

router.route('/edit_formdata')
  .post(passportJWT, validateBody(schemas.editformdataSchema), FormdataController.edit_formdata);

router.route('/get_formdata')
  .post(passportJWT, validateBody(schemas.getformdataSchema), FormdataController.get_formdata);

router.route('/get_student_list')
  .get(passportJWT, FormdataController.get_student_list);

router.route('/edit_student')
  .post(passportJWT, validateBody(schemas.editStudentSchema), FormdataController.edit_student);

router.route('/delete_student')
  .post(passportJWT, validateBody(schemas.deleteStudentSchema), FormdataController.delete_student);

router.route('/edit_shared_to')
  .post(passportJWT, validateBody(schemas.editSharedToSchema), FormdataController.edit_shared_to);

  
module.exports = router;