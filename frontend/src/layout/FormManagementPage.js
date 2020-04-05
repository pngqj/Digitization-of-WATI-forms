import * as enlargeActions from '../store/actions/enlarge';
import { connect } from 'react-redux';
import * as formHandler from './forms/FormHandler'
import { Link} from 'react-router-dom';

import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Modal, message } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';


const StudentForm = ({ visible, onCancel, onOk, formData }) => {
  const [form] = Form.useForm();
  form.setFieldsValue(formData)
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
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
          name="name"
          rules={[{ required: true, message: "Please input the Student's Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please input the Student's Age!" }]}
        >
          <Input type="number"/>
        </Form.Item>

        <Form.Item
          label="School"
          name="school"
          rules={[{ required: true, message: "Please input the School!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

class FormManagement extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Student's Name",
        dataIndex: 'name',
        width: '30%',
      },
      {
        title: 'Age',
        dataIndex: 'age',
      },
      {
        title: 'School',
        dataIndex: 'school',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <ButtonGroup>
              <Button type="primary">
              <Link to={"/forms/" + record.name}>View Forms</Link>
              </Button>
              <Button onClick={() => this.showModal(record)}>Edit</Button>
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                <Button type="danger">Delete</Button>
              </Popconfirm>
            </ButtonGroup>
            
          ) : null,
      },
    ];
    this.state = {
      dataSource: [
        {
          key: '0',
          name: 'Edward Lim',
          age: '10',
          school: 'XXX Primary School',
        },
        {
          key: '1',
          name: 'John Tan',
          age: '13',
          school: 'YYY Secondary School',
        },
      ],
      studentModalVisible:false,
    };
  }

  showModal = (record) =>{
    this.setState({
      formData:record,
      key:record.key,
      studentModalVisible:true
    })
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter(item => item.key !== key),
    });
  };

  handleAdd = () => {
    const newData = {
      key: null,
      name: null,
      age: null,
      school: null,
    };
    this.showModal(newData)
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
          onOk={(newRecord)=>{
            let key = this.state.key
            let dataSource = this.state.dataSource
            key = key === null ? dataSource.length :key
            newRecord["key"] = key
            dataSource[key] = newRecord
            this.setState({dataSource:[...dataSource], studentModalVisible:false})
          }}
        />
        
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEnlarge: () => dispatch(enlargeActions.getEnlarge()),
    updateEnlarge: (isEnlarge) => dispatch(enlargeActions.updateEnlarge(isEnlarge))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FormManagement);