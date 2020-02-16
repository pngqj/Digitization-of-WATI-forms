import EditableTable from "./EditableTable"
import * as constants from '../Constants'
import React from 'react';
import {Select, Input, Checkbox, DatePicker, List, Row, Col, Divider, Descriptions, Switch, Icon, Card, message, InputNumber } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
const InputGroup = Input.Group;


class FormProperties{
    constructor(properties,formNo,isPDF,fontSize,formData) {
        this.properties = properties
        this.formNo = formNo
        this.fontSize = fontSize
        this.formData = formData
        this.isPDF = isPDF
        this.size = this.fontSize === constants.fontSizeLarge? "large" : "default"
    }

    getCheckBoxGroup(tagGroup, tagGroupData, key){
        let totalspan = 0
        let col = []
        let row = []
        for (let tg in tagGroup){
            totalspan += tagGroup[tg].span
            col.push(tagGroup[tg].col)
            if(totalspan === 24){
                row.push(<Row key={tg} style={{width:"100%"}}>{col}</Row>)
                totalspan = 0
                col = []
            }
        }

        return(
            <Checkbox.Group key={key} style={{width:"100%"}} defaultValue={tagGroupData}>
                    {row}
            </Checkbox.Group>
        )
    }

    getFormProperties(state,inputOnChange,
        saveTableData, checkboxOnChange, checkboxWithInputOnChange){
        let formDataNo = 0
        let previous_is_checkbox = false
        let forms = []
        let tagGroup = []
        let tagGroupData = []
    
        for(var props in this.properties){
            let type = this.properties[props].type
            let span = this.properties[props].span
            let width_percent = (span * 100 / 24).toString() + "%"
            let style = {width:width_percent, marginBottom:10, fontSize:this.fontSize}
            const data = this.formData[this.formNo].data[formDataNo]
            let key = this.formNo * 1000 + formDataNo + props
            let title = props
    
            if(previous_is_checkbox && type !== "boolean" && type !== "boolean section" && type !== "boolean string"){
                forms.push(this.getCheckBoxGroup(tagGroup, tagGroupData, key + "checkboxGrp"))
                tagGroup = []
                tagGroupData = []
                previous_is_checkbox = false 
            }
    
            if (type === "string"){
                const formDataNo_copy = formDataNo
                let string_type = this.properties[props].integer === true? "number": ""
                forms.push(<Input type={string_type} onChange={(e)=>inputOnChange(e, formDataNo_copy, this.formNo, undefined)} key={key} style={style} size={this.size} addonBefore={title} defaultValue={data}/>)
            } else if (type === "long string"){
                const formDataNo_copy = formDataNo
                forms.push(<TextArea onChange={(e)=>inputOnChange(e, formDataNo_copy, this.formNo, undefined)} key={key} style={style} size={this.size} rows={4} defaultValue={data}/>)
            } else if (type === "paragraph"){
                forms.push(<List 
                            key={key}
                            bordered={false}
                            dataSource={[this.properties[props].description]}
                            renderItem={(paragraph) => {
                                let items = []
                                paragraph = paragraph.split("\n")
                                for(let p in paragraph){
                                    items.push(<span style={{fontSize: this.fontSize}} bordered="false" key = {p}>{paragraph[p]}</span>)
                                    items.push(<br key={p + "br"}/>)
                                }
                                return items
                            }}
                            />)
            } else if (type === "boolean" || type === "boolean section"){
                let checked = data
                const formNo_copy = this.formNo
                const formDataNo_copy = formDataNo
                const checkType = type
                const sectionNo = this.properties[props].section
                if(checked){
                    tagGroupData.push(title)
                }
                tagGroup.push(
                    {
                        span: span,
                        col: <Col key={key} span={span}>
                                <Checkbox style={{marginBottom:10, fontSize: this.fontSize}}
                                            onChange = {(e) => checkboxOnChange(e, checkType, formNo_copy, formDataNo_copy, sectionNo, undefined)}
                                            value={title}>
                                            {title}
                                </Checkbox>
                            </Col>
                    }
                )
                previous_is_checkbox = true
            } else if (type === "boolean string"){
                const formNo_copy = this.formNo
                const formDataNo_copy = formDataNo
                let boolean_checked = state.boolean_checked
                let checked = boolean_checked[key]
                let string_type = this.properties[props].integer === true? "number": ""
    
                if(this.properties[props].is_TextArea === undefined || this.properties[props].is_TextArea === false){
                    let inputSpan =     span === 24? "97%"  : span === 12? "88%"    : "85% " //8
                    let checkboxSpan =  span === 24? "3%"   : span === 12? "6%"     : "12% " //8
                    tagGroup.push(
                        {
                            span: span,
                            col: <Col key={key} span={span} style={{marginBottom:10, }}>
                                    <Checkbox onChange = {(e) => checkboxWithInputOnChange(e, key, boolean_checked, formNo_copy, formDataNo_copy)}
                                        defaultChecked={checked} 
                                        value={key}
                                        style={{fontSize:this.fontSize, width:checkboxSpan}}/>
                                    <Input type={string_type} addonBefore={title + ": "} disabled={!checked} onChange={(e)=>inputOnChange(e, formDataNo_copy, this.formNo, undefined)} 
                                        style={{width:inputSpan}} defaultValue={data} size={this.size}></Input>
                                </Col> 
                        }
                                          
                    )
                } else{
                    let paragraph = this.properties[props].paragraph
                    tagGroup.push(
                        {
                            span:span,
                            col:<Col key={key} span={span}>
                                    <Checkbox onChange = {(e) => checkboxWithInputOnChange(e, key, boolean_checked, formNo_copy, formDataNo_copy)}
                                        defaultChecked={checked} 
                                        style={{marginBottom:10, fontSize: this.fontSize}}
                                        value={key}>
                                        {title}
                                    </Checkbox>
                                    {
                                        paragraph !== undefined?
                                        <div>
                                            <br/>
                                            <span style={{fontSize: this.fontSize}} bordered="false">{paragraph}</span>
                                        </div>
                                        :
                                        ''
                                    }
                                    <TextArea disabled={!checked} onChange={(e)=>inputOnChange(e, formDataNo_copy, this.formNo, undefined)} 
                                        style={style} defaultValue={data} size={this.size} rows={4}></TextArea>
                                </Col> 
                        }                  
                    )
                }    
            } else if (type === "date"){
                const formDataNo_copy = formDataNo
                if (!this.isPDF){
                    forms.push( <DatePicker placeholder={title} onChange={(e)=>inputOnChange(e, formDataNo_copy, this.formNo, undefined)} size={this.size} key={key} style={style} defaultValue={data} format={constants.dateFormat} />)
                } else{
                    try{
                        forms.push(<Input addonBefore={title} value={data.format(constants.dateFormat)} size={this.size} key={key} style={style} ></Input>)
                    } catch{
                        forms.push(<Input addonBefore={title} value={""} size={this.size} key={key} style={style} ></Input>)
                    }
                }
            } else if (type === "table"){
                let columns = this.properties[props].columns
    
                // update table by changing tablekey
                let needCheckBox = this.properties[props].needCheckBox
                let needAddButton = this.properties[props].needAddButton
                forms.push(<EditableTable
                    fontSize={this.fontSize}
                    needCheckBox={needCheckBox}
                    needAddButton={needAddButton}
                    key={key}
                    columns={columns}
                    data={data}
                    saveTableData={saveTableData}
                    formNo={this.formNo}
                    isPDF={this.isPDF}
                    formDataNo={formDataNo}
                />)
            } else if(type === "select"){
                let op = this.properties[props].options
                const formDataNo_copy = formDataNo
                const formNo_copy = this.formNo
                let options = []
                for (let o in op){
                    options.push(<Option value={op[o]}>{op[o]}</Option>)
                }
                if(this.isPDF){
                    forms.push(<Input  addonBefore={title} value={data} size={this.size} key={key} style={style} />)
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
                                    style={{fontSize:this.fontSize, overflow: "auto", width:"100%"}}
                                    onChange={(value) => this.formData[formNo_copy].data[formDataNo_copy] = value.label}
                                    >
                                    {options}
                                </Select>
                                </Col>
                            </Row>
                             <br/>
                        </div>
                    )
                }
            } else if(type === "switch"){
                let sub_properties = this.properties[props].properties
                const formNo_copy = this.formNo
                const formDataNo_copy = formDataNo
                let boolean_checked = state.boolean_checked
                const checked = boolean_checked[key]
                const checkType = type
                let checkGroup = []
                let booleanString = []
                let defaultValue = []

                let i = 0
                for (let sub_name in sub_properties){
                    const dataNo = i
                    const sub_type = sub_properties[sub_name].type
                    if(sub_type === "boolean"){
                        if(data[i] && boolean_checked[key]){
                            defaultValue.push(sub_name)
                        }
                        checkGroup.push(
                            <Checkbox 
                                style={{marginBottom:10, fontSize: this.fontSize}}
                                onChange = {(e) => checkboxOnChange(e, checkType, formNo_copy, formDataNo_copy, undefined, dataNo)}
                                value={sub_name}>
                                {sub_name}
                            </Checkbox>
                        )
                    } else if(sub_type=== "boolean string"){
                        const b_key = key + i
                        const dataNo = i
                        const b_checked = boolean_checked[b_key] && boolean_checked[key]
                        const bs_key = data[i] === "" && !boolean_checked[key]? key + "empty": key
                        let sub_type = sub_properties[sub_name].integer === true? "number":""
                        booleanString.push(
                            <div key={bs_key} style={{marginBottom:10, }}>
                                <Checkbox disabled={!checked} onChange = {(e) => checkboxWithInputOnChange(e, b_key, boolean_checked, formNo_copy, formDataNo_copy)}
                                    defaultChecked={b_checked} 
                                    style={{fontSize:this.fontSize, width:"3%"}}/>
                                <Input addonBefore={sub_name} disabled={!b_checked} onChange={(e)=>inputOnChange(e, formDataNo_copy, this.formNo, dataNo)} 
                                    type={sub_type} style={{width:"97%"}} defaultValue={data[i]} size={this.size}></Input>
                            </div>
                        )
                    } else if(sub_type=== "string"){
                        const dataNo = i
                        const bs_key = data[i] === "" && !boolean_checked[key]? key + "empty": key
                        let width = (sub_properties[sub_name].span * 100 / 24).toString() + "%"
                        let sub_type = sub_properties[sub_name].integer? "number":""
                        booleanString.push(
                            <Input disabled={!checked} addonBefore={sub_name} onChange={(e)=>inputOnChange(e, formDataNo_copy, this.formNo, dataNo)} 
                                type={sub_type} key={bs_key} style={{marginBottom:10,width:width}} defaultValue={data[i]} size={this.size}></Input>
                        )
                    }
                    i += 1
                }
                defaultValue = defaultValue.length === 0? null: defaultValue
                const c_key = defaultValue === null && !boolean_checked[key]? key+"null":key
                forms.push(
                    <div key={c_key}>
                        <Checkbox 
                        onChange = {(e) => checkboxWithInputOnChange(e, key, boolean_checked, formNo_copy, formDataNo_copy)}
                        style={{marginBottom:10,fontSize:this.fontSize}} defaultChecked={checked}>
                            {title}
                        </Checkbox>
                        <br/>
                        <Checkbox.Group disabled={!checked} defaultValue={defaultValue}>
                            {checkGroup}
                        </Checkbox.Group>
                        {booleanString}
                        <br/>
                    </div>
                )
            }
            // forms.push(<br key={key + "br divider"}/>)
            formDataNo += 1
        }

        let key = this.formNo * 1000 + formDataNo + props 
    
        if (tagGroup.length > 0){
            forms.push(this.getCheckBoxGroup(tagGroup, tagGroupData, key))
        }
    
        return forms
    }
}

export default FormProperties