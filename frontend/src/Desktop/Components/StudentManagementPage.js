import * as enlargeActions from '../../store/actions/enlarge';
import * as formdataActions from '../../store/actions/formdata';
import * as EncryptString from '../../EncryptString';

import { connect } from 'react-redux';
import { Link} from 'react-router-dom';

import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Modal, message } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';


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


class StudentManagement extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "No",
        dataIndex: 'key',
      },
      {
        title: "Student's Name",
        dataIndex: 'student_name',
      },
      {
        title: 'Age',
        dataIndex: 'student_age',
      },
      {
        title: 'School',
        dataIndex: 'student_school',
      },
      {
        title: 'Owner',
        dataIndex: 'owner_username',
      },
      {
        title: 'Last Updated On',
        dataIndex: 'last_updated_date',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          delete record.last_updated_date
          delete record.key
          const link = "/forms/" + EncryptString.encrypt(JSON.stringify(record))
          // console.log(record);
          // console.log(this.props);
          
          return (this.state.dataSource.length >= 1 ? (
            <ButtonGroup>
              {/*<Button type="primary" onClick={()=>this.props.history.push(link)}>View Forms</Button>*/}
              <Button type="primary" onClick={()=>window.open(link, "_blank")}>View Forms</Button>
              {
                record.owner_username === this.props.username || this.props.studentList.includes(record)?
                <>
                <Button onClick={() => this.showModal(record, true)}>Edit</Button>
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record)}>
                  <Button type="danger">Delete</Button>
                </Popconfirm>
                </>
                :
                ''
              }
              
            </ButtonGroup>
            
          ) : null)
        }
        
          
      },
    ];
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

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

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
        <Table
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
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