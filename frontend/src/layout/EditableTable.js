import { Checkbox, Table, Input, InputNumber, Popconfirm, Form, message, Modal, DatePicker, Button } from 'antd';
import React from 'react';
import * as Constants from '../Constants'
import moment from 'moment';

const EditableContext = React.createContext();

const { TextArea } = Input;

class EditableTable extends React.Component {

  getInput = (col, value, row, index) => {
    let disabled = this.props.needAddButton? false : row.enabled? false : true
    if(col.dataIndex === "colheader"){
      return <span key={index}>{value}</span>
    } else if(col.inputType === "boolean"){
      return <Checkbox onChange={(e) => this.save(e, index, row, col.dataIndex)} key={index} disabled={disabled} checked={value}></Checkbox>
    } else if(col.inputType == "number"){
      return <InputNumber onChange={(value) => this.save(value, index, row, col.dataIndex)} key={index} disabled={disabled} value={value}/>;
    } else if(col.inputType === "date"){
      if(this.props.isPDF){
        value = moment(value).format(Constants.dateFormat);
        return <Input value={value}></Input>
      } else{
        if(value!=='' && value!==undefined){
          value = new Date(value);
          value = moment(value);
        }
        return <DatePicker onChange={(date, datestr) => this.save(date, index, row, col.dataIndex)} key={index} disabled={disabled} format={Constants.dateFormat} value={value}/>
      }
    } else{
      let minRows = col.minRows === undefined? 4 : col.minRows
      return <TextArea onChange={(e) => this.save(e.target.value, index, row, col.dataIndex)} key={index} disabled={disabled} placeholder="Input your data" autosize={{ minRows: 4, maxRows: 100 }} value={value}/>;

    }
    
  };

  constructor(props) {
    super(props);
    this.state = { data: this.props.data, confirmDeleteModalVisible: false};
  }

  save(value, index, row, dataIndex) {
    const newData = [...this.state.data];

    if (index > -1) {
      const item = newData[index];
      row[dataIndex] = value
      newData.splice(index, 1, {
        ...item,
        ...row
      });
      this.setState({ data: newData});

      let formNo = this.props.formNo
      let formDataNo = this.props.formDataNo
      this.props.saveTableData(formNo, formDataNo, newData)
    } else {
      // newData.push(row);
      // this.setState({ data: newData});
    }
  }

  addRow = () => {
    const data = this.state.data;
    const newData = {key: data.length};

    for(let c in this.columns){
      newData[c.dataIndex] = ""
    }
    

    this.setState({data: [...data, newData],});
    let formNo = this.props.formNo
    let formDataNo = this.props.formDataNo
    this.props.saveTableData(formNo, formDataNo, [...data, newData])
  };

  deleteRow = (key)  => {
    const data = this.state.data;
    data.splice(key,1);

    for (let d = 0; d < data.length; d++){
      data[d].key = d
    }  
    console.log(data)
    this.setState({data: [...data]});
    let formNo = this.props.formNo
    let formDataNo = this.props.formDataNo
    this.props.saveTableData(formNo, formDataNo, data)
  }

  toggleRowDisable = (record, enabled) =>{
    let data = this.state.data
    data[record.key].enabled = enabled
    if(!enabled){
      for(let d in record){
        if( d !== "key" &&   d !== "colheader" && 
          d !== "enabled" &&   d !== "render"){
            if (typeof  record[d] !== "boolean"){
              record[d] = ""
            } else{
              record[d] = false
            }
            this.save(record[d], record.key, data[record.key], d)   
        }
      }
    }
    this.setState({
      data:data,
      confirmDeleteModalVisible:false
    })
  }

  render() {
    let columns = this.props.columns
    columns = JSON.parse(JSON.stringify(columns))

    //add inputs
    for (let c in columns){
      columns[c].render = (value, row, index) => {
        let cell = null
        if (columns[c].isHTML){
          cell = (<div dangerouslySetInnerHTML={{__html: value}}></div>)
        } else {
          cell = this.getInput(columns[c], value, row, index)
        }
        let color = this.props.needAddButton? "#ffffff" : row.enabled? "#ffffff" : '#dddddd'
        return {props: {style: { background: color },},children: cell,};
      }
      // columns[c].width = (100 / columns.length).toString() + "%"
      
      columns[c].title = <span style={{fontSize:this.props.fontSize}}>{columns[c].title}</span>
    }

    //add delete button
    if(!this.props.isPDF && this.props.needAddButton){
      columns.push({
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <Popconfirm title="Confirm Delete?" onConfirm={() => this.deleteRow(record.key)}>
              <Button type="danger"> Delete</Button>
            </Popconfirm>
          )
        }
      })
    }

    columns = columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.inputType,
          dataIndex: col.dataIndex,
          minRows: col.minRows,
          title: col.title,
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
                let stringNotEmpty = record[d] !== "" && typeof record[d] === "string"
                let booleanNotEmpty = record[d] !== false && typeof record[d] === "boolean"

                if(stringNotEmpty || booleanNotEmpty){
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
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination= {{position : "none",pageSize:100}}
        />
      </EditableContext.Provider>
      {
        !this.props.isPDF && this.props.needAddButton?
        <Button style={{width:"100%"}} type={"primary"} onClick={()=> this.addRow()}>Add Row</Button>
        :
        ''
      }
      </div>
    );
  }
}

export default (EditableTable);
