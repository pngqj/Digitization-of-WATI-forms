const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    signInSchema: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
    signUpSchema: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),
    confirmEmailSchema: Joi.object().keys({
      token: Joi.string().required(),
    }),
    resendEmailVerificationSchema: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
    changePasswordSchema: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
      newPassword: Joi.string().required(),
    }),
    addformdataSchema: Joi.object().keys({
      record: Joi.object().required(),
    }),
    editformdataSchema: Joi.object().keys({
      record: Joi.object().required(),
      formdata: Joi.object().required(),
      activeKey: Joi.string().required(),
      newTabIndex: Joi.number().required(),
    }),
    getformdataSchema: Joi.object().keys({
      record: Joi.object().required(),
    }),
    editStudentSchema: Joi.object().keys({
      oldRecord: Joi.object().required(),
      newRecord: Joi.object().required()
    }),
    deleteStudentSchema: Joi.object().keys({
      oldRecord: Joi.object().required(),
    }),
    editSharedToSchema: Joi.object().keys({
      record: Joi.object().required(),
      shared_to_list: Joi.object().required(),
    }),
    getFileSchema: Joi.object().keys({
      filename: Joi.string().required(),
      record: Joi.object().required(),
    }),
    deleteFileSchema: Joi.object().keys({
      filename: Joi.string().required(),
    }),
    addFileSchema: Joi.object().keys({
      record: Joi.string().required(),
    }),
  }
}