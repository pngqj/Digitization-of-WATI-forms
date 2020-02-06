import { Table, Input, InputNumber, Popconfirm, Form, message, Modal } from 'antd';
import React from 'react';
const EditableContext = React.createContext();

const { TextArea } = Input;

class EditableCell extends React.Component {

  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <TextArea placeholder="Input your data" autosize={{minRows:4}}/>;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.data, editingKey: '', confirmDeleteModalVisible: false};
    let columns = this.props.columns
    columns = JSON.parse(JSON.stringify(columns))
    
    let isEditable = false
    for(let i = 0; i < columns.length; i++){
        if(columns[i].editable){
            isEditable = true
            break
        }
    }

    if(isEditable && !this.props.isPDF){
        columns.push({
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => {
              const { editingKey } = this.state;
              const editable = this.isEditing(record);
              return editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : record.enabled ? 
              (
                <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                  Edit
                </a>
              )
              :
              ''
            }
        })
    }

    for (let c in columns){
      if(columns[c].title !== "operation"){
        columns[c].render = (value, row, index) => {
          let cell = null
          if(!value.includes("\n")){
            cell = (<span style={{fontSize:this.props.fontSize}}>{value}</span>)
          } else{
            let splited = value.split("\n")
            let v = []
            for(let s in splited){
                v.push(<span style={{fontSize:this.props.fontSize}} key={s}>{splited[s]}</span>)
            }
            cell =  (<div>{v}</div>)
          }
          let color = row.enabled? "#ffffff" : '#dddddd'
          return {props: {style: { background: color },},children: cell,};
        }
        columns[c].width = (100 / columns.length).toString() + "%"
      }
      
      columns[c].title = <span style={{fontSize:this.props.fontSize}}>{columns[c].title}</span>
  }

    this.columns = columns
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ data: newData, editingKey: '' });

        let formNo = this.props.formNo
        let formDataNo = this.props.formDataNo
        this.props.saveTableData(formNo, formDataNo, newData)
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  toggleRowDisable = (record, enabled) =>{
    let data = this.state.data
    data[record.key].enabled = enabled
    if(!enabled){
      for(let d in record){
        if( d !== "key" &&   d !== "colheader" && 
          d !== "enabled" &&   d !== "render"){
            record[d] = ""
        }
      }
    }
    this.setState({
      data:data,
      confirmDeleteModalVisible:false
    })
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
          render: col.render
        })
      };
    });
    const rowSelection = !this.props.needCheckBox? null : {
      getCheckboxProps: record => ({
        name: record.colheader,
        checked: record.enabled
      }),
      onSelect: (record, selected, selectedRows, nativeEvent) => {
        if(!selected){
          for(let d in record){
            if( d !== "key" &&   d !== "colheader" && 
              d !== "enabled" &&   d !== "render"){
                //if record not empty
                if(record[d] !== ""){
                  this.setState({
                    confirmDeleteModalVisible:true,
                    recordToDelete: record
                  })
                  return
                }
            }
          }
        }
        this.toggleRowDisable(record, selected)
      },
      columnTitle:" "
    };

    return (
      <div>
        <Modal visible={this.state.confirmDeleteModalVisible} 
          onCancel={()=>this.setState({confirmDeleteModalVisible:false})}
          onOk={()=>this.toggleRowDisable(this.state.recordToDelete, false)}>
          Confirm disable Row? Content will be deleted
        </Modal>
        <EditableContext.Provider value={this.props.form}>
        <Table
          rowSelection={rowSelection}
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination= {{position : "none",pageSize:100}}
        />
      </EditableContext.Provider>
      </div>
    );
  }
}

export default Form.create()(EditableTable);
