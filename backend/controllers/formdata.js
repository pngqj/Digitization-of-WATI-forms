const JWT = require('jsonwebtoken');
const EncryptString = require('../EncryptString');
const User = require('../models/user');
const Formdata = require('../models/formdata');

module.exports = {
  add_formdata: async (req, res, next) => {
    const newRecord = req.value.body.record;
    const owner_username = req.user.local.username
    // Check if student formdata already exist in database
    let {foundStudent} = await find_student_with_record(false, owner_username, newRecord)
    if (foundStudent) { 
      return res.status(403).json({ error: 'Student already created by owner. '});
    }

    let newStudent = newRecord
    newStudent.owner_username= owner_username
    newStudent.shared_to= []
    newStudent.last_updated_date= Date.now()
    newStudent.formdata= null,
    newStudent.newTabIndex= 0,
    newStudent.activeKey= "newTab0"

    // Create a new student formdata
    const newFormdata = new Formdata({local: newStudent});

    await newFormdata.save();

    // response successful
    res.status(200).json({ success: true });
  },

  edit_formdata: async (req, res, next) => {
    console.log("(edit_formdata) I managed to get here!")
    let { formdata, record, activeKey, newTabIndex} = req.value.body;
    let username = req.user.local.username

    // Check if student formdata exist in database
    let {foundStudent} = await find_student_with_record(true, username, record)
    
    if (!foundStudent) { 
      return res.status(403).json({ error: 'Student does not exist '});
    }

    //encrypt formdata
    formdata = JSON.stringify(formdata)
    formdata = EncryptString.encrypt(formdata)

    //save formdata
    foundStudent.local.formdata = formdata
    foundStudent.local.activeKey = activeKey
    foundStudent.local.newTabIndex = newTabIndex
    await foundStudent.save()
    res.json({ success: true});
  },

  get_formdata: async (req, res, next) => {
    console.log("(get) I managed to get here!")
    const username = req.user.local.username
    const record = req.value.body.record

    let {foundStudent} = await find_student_with_record(true, username, record)

    if(foundStudent){
      foundStudent = foundStudent.toObject()
      let formdata = foundStudent.local.formdata
      if(formdata !== null){
        //decrypt formdata
        formdata = EncryptString.decrypt(formdata)
        formdata = JSON.parse(formdata)
        foundStudent.local.formdata = formdata
      }
    }

    foundStudent =  foundStudent === null? {} : foundStudent.local

    res.json({ success: true, formdata:foundStudent });
  },

  get_student_list: async (req, res, next) => {
    const username = req.user.local.username
    let foundStudentList = await Formdata.find({$or: [
      {"local.owner_username": username},
      {"local.shared_to": username},
    ]});
        
    foundStudentList = foundStudentList.map(a => a.local)
    foundStudentList = foundStudentList.map(({formdata, ...rest}) => rest)
    res.json({ success: true, studentList:foundStudentList });

  },

  edit_student: async (req, res, next) => {
    const owner_username = req.user.local.username
    const oldRecord = req.value.body.oldRecord
    const newRecord = req.value.body.newRecord
    const {foundStudent} = await find_student_with_record(false, owner_username, oldRecord)
    
    if (!foundStudent) { 
      return res.status(403).json({ error: 'Student does not exist '});
    }

    for(n in newRecord){
      foundStudent.local[n] = newRecord[n]
    }
    
    foundStudent.save()

    res.json({ success: true });
  },

  delete_student: async (req, res, next) => {
    const owner_username = req.user.local.username
    const oldRecord = req.value.body.oldRecord
    const {foundStudent} = await find_student_with_record(false, owner_username, oldRecord)
    console.log(owner_username)
    console.log(oldRecord)
    console.log(foundStudent)
    if (!foundStudent) { 
      return res.status(403).json({ error: 'Student does not exist '});
    }

    foundStudent.delete()

    res.json({ success: true });
  },

  edit_shared_to: async (req, res, next) => {
    const owner_username = req.user.local.username
    const record = req.value.body.record
    const {shared_to_list} = req.value.body.shared_to_list
    const {foundStudent} = await find_student_with_record(false, owner_username, record)
    
    if (!foundStudent) { 
      return res.status(403).json({ error: 'Student does not exist '});
    }

    let not_found = []
    let found = []

    for (index in shared_to_list){
      let foundUser = await User.findOne({$or: [
        {"local.username": shared_to_list[index]},
        {"local.email": shared_to_list[index]},
      ]})

      if(foundUser && foundUser.local.username === owner_username){
        continue
      }

      if (foundUser) { 
        if(!found.includes(foundUser.local.username)){
          found.push(foundUser.local.username)
        }
      } else{
        not_found.push(shared_to_list[index])
      }
    }

    foundStudent.local.shared_to = found
    foundStudent.save()
    console.log(foundStudent)

    res.json({ success: true, found:found, not_found:not_found });
  },
}

async function find_student_with_record(include_shared_to, username, record){
  record = Object.keys(record).map((key) => {
    const newKey = "local." + key;
    return { [newKey] : record[key] };
  });

  let filter = {"local.owner_username": username}
  
  filter = include_shared_to? {$or: [
    {"local.owner_username": username},
    { "local.shared_to": username},
  ]} : filter

  for (o in record){
    let key = Object.keys(record[o])[0]
    filter[key] = record[o][key]
  }

  let foundStudent = await Formdata.findOne(filter);
  return {foundStudent:foundStudent}
}