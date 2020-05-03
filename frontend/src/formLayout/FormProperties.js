import EditableTable from "./EditableTable"
import * as Constants from '../Constants'
import React from 'react';
import {Select, Input, Checkbox, DatePicker, List, Row, Col, Divider, Descriptions, Switch, Icon, Card, message, InputNumber } from 'antd';
import moment from 'moment';

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
        this.size = this.fontSize === Constants.fontSizeLarge? "large" : "default"
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

        let is_section = tagGroup.filter(item => item.is_section).length > 0
        if(is_section){
            return(
                <Checkbox.Group key={key} style={{width:"100%"}} value={tagGroupData}>
                        {row}
                </Checkbox.Group>
            )
        } else{
            return(
                <Checkbox.Group key={key} style={{width:"100%"}} defaultValue={tagGroupData}>
                        {row}
                </Checkbox.Group>
            )
        }        
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
                let is_long = this.properties[props].long === true
                let is_highlight = this.properties[props].highlight === true
                let after = this.properties[props].after

                let input = null
                if(!is_long){
                    input = <Input addonBefore={title} addonAfter={after} type={string_type} onChange={(e)=>inputOnChange(e, formDataNo_copy, this.formNo, undefined)} key={key} style={style} size={this.size} defaultValue={data}/>
                } else{
                    input = <TextArea onChange={(e)=>inputOnChange(e, formDataNo_copy, this.formNo, undefined)} key={key} style={style} size={this.size} autoSize={{ minRows: 4, maxRows: 100 }} defaultValue={data}/>
                }

                if(is_highlight){
                    forms.push(<div style={{borderRadius: "50px",marginBottom:20, backgroundColor:"#f3f9fF", padding: "20px"}}>{input}</div>)
                } else{
                    forms.push(input)
                }

            }  else if (type === "paragraph"){
                let isHTML = this.properties[props].isHTML

                if (isHTML){
                    forms.push(<div dangerouslySetInnerHTML={{__html: this.properties[props].description}}/>)
                } else{
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
                }
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
                        is_section: type === "boolean section", 
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
                    let after = this.properties[props].after
                    let multiple = this.properties[props].multiple
                    let input = null
                    if (multiple === undefined){
                        input = (<Input type={string_type} addonBefore={title + ": "} addonAfter={after} disabled={!checked} onChange={(e)=>inputOnChange(e, formDataNo_copy, this.formNo, undefined)} 
                        style={{width:inputSpan}} defaultValue={data} size={this.size}></Input>)
                    } else{
                        let multiLength = this.properties[props].multiLength
                        inputSpan = span === 24? 97  : span === 12? 88 : 85 //8
                        after = multiple[0]
                        input = [(<Input type={string_type} addonBefore={title + ": "} addonAfter={after} disabled={!checked} onChange={(e)=>inputOnChange(e, formDataNo_copy, this.formNo, undefined)} 
                            style={{width:(inputSpan * multiLength[0]).toString() + "%"}} defaultValue={data} size={this.size}></Input>)]
                        for (let m in multiple){
                            if (m === "0") {
                                continue
                            }
                            input.push(
                                (<Input type={string_type} addonAfter={multiple[m]} disabled={!checked} onChange={(e)=>inputOnChange(e, formDataNo_copy, this.formNo, undefined)} 
                            style={{width:(inputSpan * multiLength[parseInt(m)]).toString() + "%"}} defaultValue={data} size={this.size}></Input>)
                            )
                        }
                    }
                    

                    tagGroup.push(
                        {
                            span: span,
                            col: <Col key={key} span={span} style={{marginBottom:10, }}>
                                    <Checkbox onChange = {(e) => checkboxWithInputOnChange(e, key, boolean_checked, formNo_copy, formDataNo_copy)}
                                        defaultChecked={checked} 
                                        value={key}
                                        style={{fontSize:this.fontSize, width:checkboxSpan}}/>
                                    {input}
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
                                        style={style} defaultValue={data} size={this.size} autoSize={{ minRows: 4, maxRows: 100 }}></TextArea>
                                </Col> 
                        }                  
                    )
                }    
            } else if (type === "date"){
                const formDataNo_copy = formDataNo
                if (!this.isPDF){
                    let date = data === null? "" : moment(data, Constants.dateFormat);
                    forms.push( <DatePicker placeholder={title} onChange={(e)=>inputOnChange(e, formDataNo_copy, this.formNo, undefined)} size={this.size} key={key} style={style} defaultValue={date} format={Constants.dateFormat} />)
                } else{
                    forms.push(<Input addonBefore={title} value={data} size={this.size} key={key} style={style} ></Input>)
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
                    let heading = (<span class="ant-input-group-addon" style={{fontSize:this.fontSize}}>
                                    {title}
                                </span>)
                    
                    // if (checkbox === true){
                    //     heading = (<Checkbox>{title}</Checkbox>)
                    // }

                    forms.push(
                        <div style={{width:width_percent, display:"inline-block"}} >
                            <span class="ant-input-group ant-input-group-large">
                                {heading}
                                <Select
                                    class="ant-select ant-select-selection ant-input-group"
                                    size={this.size}
                                    labelInValue
                                    defaultValue={{ key: data }}
                                    style={{fontSize:this.fontSize, width:"100%"}}
                                    onChange={(value) => this.formData[formNo_copy].data[formDataNo_copy] = value.label}
                                    >
                                    {options}
                                </Select>
                            </span>
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
                        let width = (sub_properties[sub_name].span * 100 / 24)
                        let sub_type = sub_properties[sub_name].integer? "number":""                
                        let is_long = sub_properties[sub_name].long === true
                        let multiple = sub_properties[sub_name].multiple

                        if(!is_long && multiple === undefined){
                            width = width.toString() + "%"
                            booleanString.push(
                                <Input disabled={!checked} addonBefore={sub_name} onChange={(e)=>inputOnChange(e, formDataNo_copy, this.formNo, dataNo)} 
                                    type={sub_type} key={bs_key} style={{marginBottom:10,width:width}} defaultValue={data[i]} size={this.size}></Input>
                            )
                        } else if (multiple !== undefined){
                            let multiLength = sub_properties[sub_name].multiLength
                            let after = multiple[0]

                            let input = [(<Input addonBefore={title + ": "} addonAfter={after} disabled={!checked} onChange={(e)=>inputOnChange(e, formDataNo_copy, this.formNo, [dataNo,0])} 
                                style={{width:(width * multiLength[0]).toString() + "%"}} defaultValue={data[i][0]} size={this.size}></Input>)]
                            for (let m in multiple){
                                if (m === "0") {
                                    continue
                                }
                                input.push(
                                    (<Input addonAfter={multiple[m]} disabled={!checked} onChange={(e)=>inputOnChange(e, formDataNo_copy, this.formNo, [dataNo,m])} 
                                style={{width:(width * multiLength[parseInt(m)]).toString() + "%"}} defaultValue={data[i][m]} size={this.size}></Input>)
                                )
                            }
                            booleanString.push(input)
                        } else{
                            width = width.toString() + "%"
                            booleanString.push(
                                <TextArea disabled={!checked} onChange={(e)=>inputOnChange(e, formDataNo_copy, this.formNo, dataNo)} 
                                key={bs_key} style={{marginBottom:10,width:width}} size={this.size} autoSize={{ minRows: 4, maxRows: 100 }} defaultValue={data[i]}/>
                            )
                        }
                    }
                    i += 1
                }
                defaultValue = defaultValue.length === 0? null: defaultValue
                const c_key = defaultValue === null && !boolean_checked[key]? key+"null":key
                forms.push(
                    <div key={c_key} style={{borderRadius: "50px",marginBottom:20, backgroundColor:"#f3f9fF", padding: "20px"}}>
                        <Checkbox 
                        onChange = {(e) => checkboxWithInputOnChange(e, key, boolean_checked, formNo_copy, formDataNo_copy)}
                        style={{marginBottom:10,fontSize:this.fontSize, fontWeight:"bolder"}} defaultChecked={checked}>
                            {title}
                        </Checkbox>
                        <br/>
                        <br/>
                        <Checkbox.Group disabled={!checked} defaultValue={defaultValue}>
                            {checkGroup}
                        </Checkbox.Group>
                        <br/>
                        {booleanString}
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