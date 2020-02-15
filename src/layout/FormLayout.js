import React from 'react';
import { Modal, message, Select, Input, Checkbox, DatePicker, List, Row, Col, Divider, Descriptions, Switch, Icon, Card } from 'antd';
import * as enlargeActions from '../store/actions/enlarge';
import moment from 'moment';

import { connect } from 'react-redux';
import { render } from "react-dom";
import ReactToPrint from "react-to-print";
import Form from "react-jsonschema-form";
import EditableTable from "./EditableTable"
import * as constants from '../Constants'
import * as formHandler from './forms/FormHandler'
import './formstyle.css'
import Grid from 'antd/lib/card/Grid';

const { Option } = Select;
const { TextArea } = Input;
const InputGroup = Input.Group;

class FormLayout extends React.Component {    
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        let path_name = window.location.pathname.replace("/form/", "").split("_").join(" ")
        let boolean_string_checked = {}
        let ignoreSection = []
        try{
            this.schema = formHandler.form_names[path_name].schema
            this.uiSchema = formHandler.form_names[path_name].uiSchema
            this.name = path_name
            this.formData = formHandler.form_names[path_name].formData

            for (let formNo = 0; formNo < this.schema.length; formNo++){
                let properties = this.schema[formNo].properties
                let formDataNo = 0

                for(let props in properties){
                    let type = properties[props].type
                    let section = properties[props].section
                    const data = this.formData[formNo].data[formDataNo]
                    let key = formNo * 1000 + formDataNo + props

                    if (type === "boolean string"){
                        boolean_string_checked[key] = !data == ""
                    }

                    if(type === "boolean section" && section !== undefined){
                        console.log(data)
                        if (data === false){
                            ignoreSection.push(section)
                        }
                    }

                    formDataNo += 1
                }
            }
        }catch(e){
            console.log(e)
            this.schema = []
            this.uiSchema = []
            this.name = ""
            this.formData = []
        }

        this.state = {
            fontSize:constants.fontSize, 
            fontSizeTitle: constants.fontSizeTitle,
            boolean_string_checked:boolean_string_checked,
            ignoreSection:ignoreSection
        }
    }

    componentDidMount(){
        this.props.getEnlarge()
    }

    inputOnChange = (e, formDataNo, formNo) =>{
        try{
            this.formData[formNo].data[formDataNo] = e.target.value
        } catch {
            this.formData[formNo].data[formDataNo] = e
        }
    }

    createForm = (fontSize, fontSizeTitle, isPDF) => {
        let forms = [<h1 key="form name">{this.name}</h1>]
        let previous_is_checkbox = false
        console.log(this.schema)
        for (let formNo = 0; formNo < this.schema.length; formNo++){
            let section = this.schema[formNo].section
            if (section !== undefined && this.state.ignoreSection.includes(section)){
                continue
            }
            
            let heading = this.schema[formNo].heading
            if (heading !== undefined){
                forms.push(<h1 key={"form heading " + heading + formNo}>{heading}</h1>)
                continue
            }

            let mainTitle = this.schema[formNo].title
            forms.push(<span style={{fontSize: fontSizeTitle}} key={mainTitle + formNo}>{mainTitle}</span>)
            forms.push(<br key={mainTitle + " br1" + formNo}/>)
            forms.push(<br key={mainTitle + " br2" + formNo}/>)
            let properties = this.schema[formNo].properties
            let formDataNo = 0
            let tagGroup = []
            let tagGroupData = []

            for(let props in properties){
                let type = properties[props].type
                let span = properties[props].span
                let width_percent = (span * 100 / 24).toString() + "%"
                let style = {width:width_percent, marginBottom:10, fontSize:fontSize}
                let size = fontSize === constants.fontSizeLarge? "large" : "default"
                const data = this.formData[formNo].data[formDataNo]
                let key = formNo * 1000 + formDataNo + props
                let title = props
    
                if(previous_is_checkbox && type !== "boolean" && type !== "boolean section"){
                    forms.push(<div key={key + "previous"} style={{width:"100%"}}>
                        <Checkbox.Group style={{width:"100%"}} defaultValue={tagGroupData}>
                            <Row style={{width:"100%"}}>
                                {tagGroup}
                            </Row>
                        </Checkbox.Group>
                    </div>
                    )
                    tagGroup = []
                    previous_is_checkbox = false
                }
    
                if (type === "string"){
                    const formDataNo_copy = formDataNo
                    forms.push(<Input onChange={(e)=>this.inputOnChange(e, formDataNo_copy, formNo)} key={key} style={style} size={size} addonBefore={title} defaultValue={data}/>)
                } else if (type === "long string"){
                    const formDataNo_copy = formDataNo
                    forms.push(<TextArea onChange={(e)=>this.inputOnChange(e, formDataNo_copy, formNo)} key={key} style={style} size={size} rows={4} defaultValue={data}/>)
                }
                 else if (type === "integer"){
                    const formDataNo_copy = formDataNo
                    forms.push(<Input onChange={(e)=>this.inputOnChange(e, formDataNo_copy, formNo)} key={key} style={style} size={size} addonBefore={title} type="number" defaultValue={data}/>)
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
                } else if (type === "boolean" || type === "boolean section"){
                    let checked = data
                    const formNo_copy = formNo
                    const formDataNo_copy = formDataNo
                    const checkType = type
                    const sectionNo = properties[props].section
                    if(checked){
                        tagGroupData.push(title)
                    }
                    tagGroup.push(
                        <Col key={key} span={span}>
                            <Checkbox style={{marginBottom:10, fontSize: fontSize}}
                                        onChange = {(e) => {
                                            this.formData[formNo_copy].data[formDataNo_copy] = e.target.checked
                                            if(checkType==="boolean section"){
                                                let ignoreSection = this.state.ignoreSection
                                                if(e.target.checked){
                                                    ignoreSection.splice(ignoreSection.indexOf(sectionNo),1);
                                                } else{
                                                    ignoreSection.push(sectionNo);
                                                }
                                                console.log(ignoreSection)
                                                this.setState({ignoreSection:ignoreSection})
                                            }
                                        }}
                                        value={title}>
                                        {title}
                            </Checkbox>
                        </Col>
                    )
                    previous_is_checkbox = true
                } else if (type === "boolean string"){
                    const formNo_copy = formNo
                    const formDataNo_copy = formDataNo
                    let boolean_string_checked = this.state.boolean_string_checked
                    let checked = boolean_string_checked[key]

                    if(properties[props].is_TextArea === undefined || properties[props].is_TextArea === false){
                        forms.push(
                            <div key={key + Math.random()} style={{width:width_percent}}>
                                <Checkbox onChange = {(e) => {
                                        if (!e.target.checked){
                                            this.formData[formNo_copy].data[formDataNo_copy] = ""
                                        }
                                        boolean_string_checked[key] = e.target.checked
                                        this.setState({boolean_string_checked: boolean_string_checked})
                                    }}
                                    defaultChecked={checked} 
                                    style={{fontSize:fontSize, width:"3%"}}/>
                                <Input addonBefore={title + ": "} disabled={!checked} onChange={(e)=>this.inputOnChange(e, formDataNo_copy, formNo)} 
                                    style={{width:"97%"}} defaultValue={data} size={size}></Input>
                            </div>                   
                        )
                    } else{
                        let paragraph = properties[props].paragraph
                        forms.push(
                            <div key={key + Math.random()} style={{width:width_percent}}>
                                <Checkbox onChange = {(e) => {
                                        if (!e.target.checked){
                                            this.formData[formNo_copy].data[formDataNo_copy] = ""
                                        }
                                        boolean_string_checked[key] = e.target.checked
                                        this.setState({boolean_string_checked: boolean_string_checked})
                                    }}
                                    defaultChecked={checked} 
                                    style={{marginBottom:10, fontSize: fontSize}}>
                                    
                                    {title}
                                </Checkbox>
                                {
                                    paragraph !== undefined?
                                    <div>
                                        <br/>
                                        <span style={{fontSize: fontSize}} bordered="false">{paragraph}</span>
                                    </div>
                                    :
                                    ''
                                }
                                <TextArea disabled={!checked} onChange={(e)=>this.inputOnChange(e, formDataNo_copy, formNo)} 
                                    style={style} defaultValue={data} size={size} rows={4}></TextArea>
                            </div>                   
                        )
                    }
                    
                    forms.push(<br key={key + " <br/>"} />)

                } else if (type === "date"){
                    const formDataNo_copy = formDataNo
                    if (!isPDF){
                        forms.push( <DatePicker placeholder={title} onChange={(e)=>this.inputOnChange(e, formDataNo_copy, formNo)} size={size} key={key} style={style} defaultValue={data} format={constants.dateFormat} />)
                    } else{
                        try{
                            forms.push(<Input addonBefore={title} value={data.format(constants.dateFormat)} size={size} key={key} style={style} ></Input>)
                        } catch{
                            forms.push(<Input addonBefore={title} value={""} size={size} key={key} style={style} ></Input>)
                        }
                    }
                } else if (type === "table"){
                    let columns = properties[props].columns

                    // update table by changing tablekey
                    let needCheckBox = properties[props].needCheckBox
                    let needAddButton = properties[props].needAddButton
                    forms.push(<EditableTable
                        fontSize={fontSize}
                        needCheckBox={needCheckBox}
                        needAddButton={needAddButton}
                        key={key}
                        columns={columns}
                        data={data}
                        saveTableData={this.saveTableData}
                        formNo={formNo}
                        isPDF={isPDF}
                        formDataNo={formDataNo}
                    />)
                } else if(type === "select"){
                    let op = properties[props].options
                    const formDataNo_copy = formDataNo
                    const formNo_copy = formNo
                    let options = []
                    for (let o in op){
                        options.push(<Option value={op[o]}>{op[o]}</Option>)
                    }
                    if(isPDF){
                        forms.push(<Input  addonBefore={title} value={data} size={size} key={key} style={style} />)
                    }else{
                        forms.push(
                            <div>
                                <Row>
                                    <Col span={span}>
                                        <TextArea autosize disabled={true} showArrow={false} value={title} style={{resize:"none", color:"#757575", backgroundColor:"#fafafa"}}/>
                                    </Col>
                                    <Col span={24-span}>
                                        <Select
                                        labelInValue
                                        defaultValue={{ key: data }}
                                        style={{fontSize:fontSize, overflow: "auto", maxHeight:"100000px", height:"100%", width:"100%"}}
                                        onChange={(value) => this.formData[formNo_copy].data[formDataNo_copy] = value.label}
                                        >
                                        {options}
                                    </Select>
                                    </Col>
                                </Row>
                                 
                            </div>
                        )
                    }
                } else if(type === "switch"){
                    forms.push(
                        <div>
                            <Checkbox style={{fontSize:fontSize}}>
                                {title}
                            </Checkbox>
                            <Card>
                                wasd
                            </Card>
                        </div>
                    )
                }
                // forms.push(<br key={key + "br divider"}/>)
                formDataNo += 1
            }
            if (tagGroup.length > 0){
                forms.push(<div key={"last checkbox group" + formNo} style={{width:"100%"}}>
                    <Checkbox.Group style={{width:"100%"}}  defaultValue={tagGroupData}>
                        <Row style={{width:"100%"}}>
                            {tagGroup}
                        </Row>
                    </Checkbox.Group>
                </div>
                )
            }
            forms.push(<br key={"form br " + formNo}/>)
        }

        

        return (
            <div key={"main div"}>
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