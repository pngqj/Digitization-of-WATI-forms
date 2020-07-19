const JWT = require('jsonwebtoken');
const moment = require('moment');
const EncryptString = require('../EncryptString');
const User = require('../models/user');
const File = require('../models/file');
const { connection } = require('mongoose');

module.exports = {
  add_file: async (req, res, next) => {
    // Create a new file
    const newFile = new File({ 
      username: req.user.local.username,
      filename: req.file.filename, 
      fileID: req.file.id
    });
    newFile.save()
    res.status(200).json({ success: true });
  },

  get_file: async (req, res, next) => {
    let user_id = req.user._id
    let filename = req.value.body.filename
    const record = req.value.body.record

    var image = './uploaded_img/' + filename.split(".")[0] + "_" + record.student_name + "_" + record.student_age + "_" + record.student_school + "_" + user_id + "." + filename.split(".")[1];;

    var base64Img = require('base64-img');
    var imageData1 = base64Img.base64Sync(image);
    var base64Data = imageData1.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    
    res.json({success:true, base64Data: base64Data})
  },

  delete_file: async (req, res, next) => {
    // not sure if this is needed
  },
}