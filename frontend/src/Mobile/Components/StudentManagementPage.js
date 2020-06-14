import * as enlargeActions from '../../store/actions/enlarge';
import * as formdataActions from '../../store/actions/formdata';
import * as EncryptString from '../../EncryptString';

import { connect } from 'react-redux';
import { Link} from 'react-router-dom';

import React, { useContext, useState, useEffect, useRef } from 'react';
import {Collapse, Descriptions, Input, Button, Popconfirm, Form, Modal, message } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';

const { Panel } = Collapse;

const StudentForm = ({ visible, onCancel, onOk, formData, is_edit }) => {
  const [form] = Form.useForm();
  form.setFieldsValue(formData)
  return (
    <Modal
      visible={visible}
      title="Create a new student record"
      okText= {is_edit? "Edit" : "Create"}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields()
            onOk(values)
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
       <Form.Item
          label="Student's Name"
          name="student_name"
          rules={[{ required: true, message: "Please input the Student's Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Age"
          name="student_age"
          rules={[{ required: true, message: "Please input the Student's Age!" }]}
        >
          <Input type="number"/>
        </Form.Item>

        <Form.Item
          label="School"
          name="student_school"
          rules={[{ required: true, message: "Please input the School!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const StudentDescription = ({keyNo, username, record, showModal, handleDelete, viewFormBtnOnClick}) =>{
  let link = JSON.parse(JSON.stringify(record))
  delete link.last_updated_date
  delete link.key
  link = "/forms/" + EncryptString.encrypt(JSON.stringify(link))
  const student_name = record.student_name
  const student_age = record.student_age
  const student_school = record.student_school
  const owner_username = record.owner_username
  const last_updated_date = record.last_updated_date

  return(
    <Panel  header={student_name + ", " + student_age + ", " + student_school} key={keyNo}> 
      <ButtonGroup style={{float:"right", marginBottom:"3px"}}>
        <Button type="primary" onClick={()=>viewFormBtnOnClick(link)}>View Forms</Button>
        {
          record.owner_username === username?
          <>
          <Button onClick={() => showModal(record, true)}>Edit</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
            <Button type="danger">Delete</Button>
          </Popconfirm>
          </>
          :
          ''
        }
        
      </ButtonGroup>
      <Descriptions layout="horizontal" bordered>
        <Descriptions.Item label="Student's Name">{student_name}</Descriptions.Item>
        <Descriptions.Item label="Age">{student_age}</Descriptions.Item>
        <Descriptions.Item label="School">{student_school}</Descriptions.Item>
        <Descriptions.Item label="Owner">{owner_username}</Descriptions.Item>
        <Descriptions.Item label="Last Updated On">{last_updated_date}</Descriptions.Item>
      </Descriptions>
    </Panel>
  )
}


class StudentManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentModalVisible:false,
      dataSource: null
    };
    this.props.getStudentList()
  }

  componentWillReceiveProps(nextProps){
    let studentList = nextProps.studentList
    studentList = studentList.map((item, index) => {
      item.key = index
      delete item.shared_to
      delete item.activeKey
      delete item.newTabIndex
      delete item.$init
      return item
    } )
    
    this.setState({dataSource:studentList})
    console.log(studentList)

  }

  showModal = (record, is_edit) =>{
    this.setState({
      formData:record,
      key:record.key,
      studentModalVisible:true,
      is_edit:is_edit,
      oldRecord: is_edit? record : null
    })
  }

  handleDelete = oldRecord => {
    delete oldRecord.key
    delete oldRecord.last_updated_date
    this.props.deleteStudent(oldRecord)
  };

  handleAdd = () => {
    const newData = {
      name: null,
      age: null,
      school: null,
    };
    this.showModal(newData, false)
  };

  displayStudentInfo = () => {
    let studentDescription = []
    for (let i in this.state.dataSource){
      studentDescription.push(
        StudentDescription({
          username:this.props.username,
          record:this.state.dataSource[i],
          showModal:this.showModal,
          handleDelete:this.handleDelete,
          viewFormBtnOnClick:(link)=> this.props.history.push(link),
          keyNo:i
        })
      )
    }
    return studentDescription
  }

  render() {
    const { dataSource } = this.state;

    return (
      <div>
          <StudentForm
          visible={this.state.studentModalVisible}
          formData={this.state.formData}
          onCancel={() => {this.setState({studentModalVisible:false})}}
          is_edit={this.state.is_edit}
          onOk={(newRecord)=>{
            this.setState({studentModalVisible:false})
            if(this.state.is_edit){
              let oldRecord = this.state.oldRecord
              delete oldRecord.last_updated_date
              delete oldRecord.key
              this.props.editStudent(oldRecord, newRecord)
            } else {
              this.props.addFormdata(newRecord)
            }
          }}
        />
        
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a Student
        </Button>

        <Collapse>
        {this.displayStudentInfo()}
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isEnlarge: state.enlarge,
    studentList: state.formdata.studentList,
    username: state.auth.username,
    isAuthenticated: state.auth.username !== undefined && state.auth.username !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStudentList: () => dispatch(formdataActions.getStudentList()),
    addFormdata: (student_data) => dispatch(formdataActions.addFormdata(student_data)),
    editStudent: (oldRecord, newRecord) => dispatch(formdataActions.editStudent(oldRecord, newRecord)),
    deleteStudent: (oldRecord) => dispatch(formdataActions.deleteStudent(oldRecord)),
    getEnlarge: () => dispatch(enlargeActions.getEnlarge()),
    updateEnlarge: (isEnlarge) => dispatch(enlargeActions.updateEnlarge(isEnlarge))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(StudentManagement);