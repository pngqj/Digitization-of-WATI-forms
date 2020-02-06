import React from 'react';
import { Modal, message, Select, Table, Button, Collapse, Input, Checkbox, DatePicker, List } from 'antd';
import * as enlargeActions from '../store/actions/enlarge';

import { connect } from 'react-redux';
import { render } from "react-dom";
import ReactToPrint from "react-to-print";
import Form from "react-jsonschema-form";
import EditableTable from "./EditableTable"
import * as constants from '../Constants'
import * as formHandler from './forms/FormHandler'
import './formstyle.css'

const { Option } = Select;
const { TextArea } = Input;

class FormLayout extends React.Component {    
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        let path_name = window.location.pathname.replace("/form/", "").split("_").join(" ")
        this.state = {fontSize:constants.fontSize, fontSizeTitle: constants.fontSizeTitle}
        
        try{
            this.schema = formHandler.form_names[path_name].schema
            this.uiSchema = formHandler.form_names[path_name].uiSchema
            this.name = path_name
            this.formData = formHandler.form_names[path_name].formData
        }catch{
            this.schema = []
            this.uiSchema = []
            this.name = ""
            this.formData = []
        }
    }

    componentDidMount(){
        this.props.getEnlarge()
    }

    inputOnChange = (e, formDataNo, formNo) =>{
        console.log(this.formData)
        console.log(formDataNo)
        console.log(formNo)
        console.log(this.formData[formNo].data[formDataNo])
        this.formData[formNo].data[formDataNo] = e.target.value
        console.log(this.formData[formNo].data[formDataNo])
        console.log(this.formData)
    }

    createForm = (fontSize, fontSizeTitle, isPDF) => {
        let forms = [<h1 key="form name">{this.name}</h1>]
        let previous_is_checkbox = false
        for (let formNo = 0; formNo < this.schema.length; formNo++){
            let title = this.schema[formNo].title
            forms.push(<span style={{fontSize: fontSizeTitle}} key={title + " title"}>{title}</span>)
            forms.push(<br key={title + " br1"}/>)
            forms.push(<br key={title + " br2"}/>)
            let properties = this.schema[formNo].properties
            let formDataNo = 0

            for(let props in properties){
                let type = properties[props].type
                let span = properties[props].span
                let width_percent = (span * 100 / 24).toString() + "%"
                let style = {width:width_percent, marginBottom:10, fontSize:fontSize}
                let size = fontSize === constants.fontSizeLarge? "large" : "default"
                const data = this.formData[formNo].data[formDataNo]
                let key = isPDF? props + "pdf":props
    
                if(previous_is_checkbox && type !== "boolean"){
                    forms.push(<br/>)
                    previous_is_checkbox = false
                }
    
                if (type === "string"){
                    forms.push(<Input key={key} style={style} size={size} addonBefore={key} defaultValue={data}/>)
                } else if (type === "long string"){
                    // need inputOnChange because TextArea is buggy
                    const formDataNo_copy = formDataNo
                    forms.push(<TextArea onChange={(e)=>this.inputOnChange(e, formDataNo_copy, formNo)} key={key} style={style} size={size} rows={4} defaultValue={data}/>)
                }
                 else if (type === "integer"){
                    forms.push(<Input key={key} style={style} size={size} addonBefore={key} type="number" defaultValue={data}/>)
                } else if (type === "paragraph"){
                    forms.push(<List 
                                key={key}
                                bordered={false}
                                dataSource={[properties[props].description]}
                                renderItem={(paragraph) => {
                                    let items = []
                                    paragraph = paragraph.split("\n")
                                    for(let p in paragraph){
                                        items.push(<span style={{fontSize: fontSize}} bordered="false" key = {p}>{paragraph[p]}</span>)
                                        items.push(<br key={p + "br"}/>)
                                    }
                                    return items
                                }}
                                />)
                } else if (type === "boolean"){
                    forms.push(<Checkbox key={key} style={{marginBottom:10, fontSize: fontSize}}  defaultChecked={data}>{key}</Checkbox>)
                    previous_is_checkbox = true
                } else if (type === "date"){
                    forms.push( <DatePicker size={size} key={key} style={style} defaultValue={data} format={'YYYY/MM/DD'} />)
                } else if (type === "table"){
                    let columns = properties[props].columns

                    // update table by changing tablekey
                    let tablekey = formNo.toString()
                    tablekey += isPDF? "pdf": "edit"
                    tablekey += this.state.fontSize == constants.fontSize? "normal": "large"
                    let needCheckBox = properties[props].needCheckBox
                    forms.push(<EditableTable
                        fontSize={fontSize}
                        needCheckBox={needCheckBox}
                        key={tablekey}
                        columns={columns}
                        data={data}
                        saveTableData={this.saveTableData}
                        formNo={formNo}
                        isPDF={isPDF}
                        formDataNo={formDataNo}
                    />)
                }
                // forms.push(<br key={key + "br divider"}/>)
                formDataNo+=1
            }
                    
        }

        return (
            <div>
                {forms}
            </div>
        )
    }

    saveTableData = (formNo, formDataNo, newData) => {
        this.formData[formNo].data[formDataNo] = newData
    }

    saveData(){
        this.setState({isPDF:true}) //trigger rerender
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.isEnlarge !== null){
            if(nextProps.isEnlarge.enlarge){
                this.setState({fontSize:constants.fontSize, fontSizeTitle: constants.fontSizeTitle})
            } else{
                this.setState({fontSize:constants.fontSizeLarge, fontSizeTitle: constants.fontSizeTitleLarge})
            }
        }
    }


    render() {
        return (
            <div>
                {
                    this.state.isPDF?
                    <div className="PDF download" style={{visibility: "hidden", display: "none"}}>
                        <div style={{padding:50}} ref={el => (this.myRef = el)} >
                            <h1>{this.name}</h1>
                            {this.createForm(true, this.state.fontSize, this.state.fontSizeTitle, true)}
                        </div> 
                    </div>
                    :
                    ''
                }
                

                
                {this.createForm(this.state.fontSize, this.state.fontSizeTitle, false)}
                
                
                {
                    this.schema.length > 0 ?
                    <div>
                        <button className="btn btn-primary"
                        // type="submit" onClick={()=>message.info("Coming Soon!")}>
                        type="submit" onClick={()=>message.info("Coming Soon!")}>
                            Save
                        </button>
                        <ReactToPrint
                            key="2"
                            trigger={() =><button onFocus={()=>this.saveData()} className="btn btn-primary">Download</button>}
                            content={() => this.myRef}
                            onAfterPrint={() => this.setState({isPDF:false})}
                        />
                    </div>
                    :
                    ''
                }
                
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    // is_admin: state.auth.is_admin,
    // isAuthenticated: state.auth.token !== null,
    // course: state.course.course,
    // prof: state.prof.prof,
    // nightMode: state.night.nightMode
    isEnlarge: state.enlarge,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //   getCourse: (searchStr) => dispatch(courseActions.getCourse(searchStr)),
    //   getProf: () => dispatch(profActions.getProf()),
    //   getNightMode: () => dispatch(nightModeActions.getNightMode()),
    getEnlarge: () => dispatch(enlargeActions.getEnlarge()),
    updateEnlarge: (isEnlarge) => dispatch(enlargeActions.updateEnlarge(isEnlarge))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLayout);