import React from 'react';
import { Modal, message, Icon, Card, Button } from 'antd';
import * as enlargeActions from '../store/actions/enlarge';
import { connect } from 'react-redux';
import { render } from "react-dom";
import ReactToPrint from "react-to-print";
import * as Constants from '../Constants'
import * as formHandler from './forms/FormHandler'
import FormProperties from './FormProperties';
import moment from 'moment';
import * as EncryptString from '../EncryptString'


class CustomForm extends React.Component {    
    constructor(props) {
        super(props);
        let boolean_checked = {}

        let formData = this.getFormData()
        this.name = this.props.form_name

        try{
            this.schema = formHandler.form_names[this.props.form_name].schema
        } catch {
            let scetionName = this.props.form_name.replace("Referral/Question Identification Guide ", "")
            this.schema = formHandler.referral_Guide_Sections[scetionName].schema
        }
        

        for (let formNo = 0; formNo < this.schema.length; formNo++){
            let properties = this.schema[formNo].properties
            let formDataNo = 0

            for(let props in properties){
                let type = properties[props].type
                // let section = properties[props].section
                const data = formData[formNo].data[formDataNo]
                let key = formNo * 1000 + formDataNo + props

                if (type === "boolean string"){
                    boolean_checked[key] = data !== ""
                }

                if (type === "switch"){
                    boolean_checked[key] = false
                    for (let d in data){
                        if(data[d] === true || (typeof data[d] === "string" && data[d] !== "")){
                            boolean_checked[key] = true
                        }

                        if(typeof data[d] === "string"){
                            boolean_checked[key + d] = data[d] !== ""
                        }
                    }
                }

                formDataNo += 1
            }
        }

        this.state = {
            fontSize:Constants.fontSize, 
            fontSizeTitle: Constants.fontSizeTitle,
            boolean_checked:boolean_checked,
        }
    }

    getFormData(){
        let savedDataName = Constants.savedDataName 
        let formData = localStorage.getItem(savedDataName)
        formData = EncryptString.decrypt(formData)
        if(formData === null){
            formData = formHandler.form_names[this.props.form_name].formData
            let l = {formData:formData, title:this.props.form_name, form_name:this.props.form_name}
            let localstr = {}
            localstr[this.props.activeKey] = l
            localstr = EncryptString.encrypt(JSON.stringify(localstr))
            localStorage.setItem(savedDataName, localstr)
        } else{
            formData = JSON.parse(formData);
            formData = formData[this.props.activeKey].formData
        }
        return formData
    }

    saveFormData(formData){
        let savedDataName = Constants.savedDataName 
        let localstr = localStorage.getItem(savedDataName)
        localstr = EncryptString.decrypt(localstr)
        localstr = JSON.parse(localstr);
        localstr[this.props.activeKey].formData = formData
        localStorage.setItem(savedDataName, EncryptString.encrypt(JSON.stringify(localstr)))
        this.props.formDataEdited()
    }

    componentDidMount(){
        this.props.getEnlarge()
    }

    saveTableData = (formNo, formDataNo, newData) => {
        let formData = this.getFormData()
        formData[formNo].data[formDataNo] = newData
        this.saveFormData(formData)
    }

    inputOnChange = (e, formDataNo, formNo, dataNo) =>{
        let formData = this.getFormData()
        if (dataNo !== undefined){
            if( Array.isArray(dataNo) ){
                formData[formNo].data[formDataNo][dataNo[0]][dataNo[1]] = e.target.value
            }else{
                formData[formNo].data[formDataNo][dataNo] = e.target.value
            }
            this.saveFormData(formData)
            return
        }
        try{
            formData[formNo].data[formDataNo] = e.target.value
        } catch {
            let value = e
            value = moment.isMoment(value)? moment(value).format(Constants.dateFormat) : value 
            formData[formNo].data[formDataNo] = value
        }
        this.saveFormData(formData)
    }

    checkboxOnChange = (e, checkType, formNo, formDataNo, sectionNo, dataNo)=>{
        let formData = this.getFormData()
        if(checkType==="switch" && dataNo !== undefined){
            formData[formNo].data[formDataNo][dataNo] = e.target.checked
            return
        }
        if(checkType==="boolean section"){
            if(e.target.checked){
                this.props.addReferalGuideSectionToTab(sectionNo, formNo, formDataNo)
            } else{
                let isSection = true
                this.props.openDeleteTabNotification([sectionNo, this.props.activeKey], isSection)
            }
            
            return
        }
        formData[formNo].data[formDataNo] = e.target.checked
        this.saveFormData(formData)

    }

    checkboxWithInputOnChange = (e, key, boolean_checked, formNo, formDataNo) =>{
        let formData = this.getFormData()
        if (!e.target.checked){
            if(typeof formData[formNo].data[formDataNo] === "string"){
                formData[formNo].data[formDataNo] = ""
            } else{
                for(let i in formData[formNo].data[formDataNo]){
                    if(typeof formData[formNo].data[formDataNo][i] === "string"){
                        formData[formNo].data[formDataNo][i] = ""
                    } else if (typeof formData[formNo].data[formDataNo][i] === "boolean"){
                        formData[formNo].data[formDataNo][i] = false
                    }
                }
            }
        }
        boolean_checked[key] = e.target.checked
        this.saveFormData(formData)
        this.setState({boolean_checked: boolean_checked})
    }

    createForm = (fontSize, fontSizeTitle, isPDF) => {
        let forms = [<h1 key="form name">{this.name}</h1>]
        let formData = this.getFormData()
        for (let formNo = 0; formNo < formData.length; formNo++){ 
        // for (let formNo = 0; formNo < this.schema.length; formNo++){ // old. 
            let section = this.schema[formNo].section
            if (section !== undefined){
                continue
            }
            
            let heading = this.schema[formNo].heading
            if (heading !== undefined){
                forms.push(<h1 key={"form heading " + heading + formNo}>{heading}</h1>)
                continue
            }

            let mainTitle = this.schema[formNo].title
            if(mainTitle !== ""){
                forms.push(<span style={{fontSize: fontSizeTitle}} key={mainTitle + formNo}>{mainTitle}</span>)
                forms.push(<br key={mainTitle + " br1" + formNo}/>)
                forms.push(<br key={mainTitle + " br2" + formNo}/>)
            }
            
            let properties = this.schema[formNo].properties
            let formprops = new FormProperties(properties,formNo,isPDF,fontSize,formData)
            let props_form = formprops.getFormProperties(this.state, this.inputOnChange.bind(this), 
                this.saveTableData.bind(this), this.checkboxOnChange.bind(this), 
                this.checkboxWithInputOnChange.bind(this))
            forms = forms.concat(props_form)

            forms.push(<br key={"form br " + formNo}/>)
        }

        let mainKey = "main div"
        mainKey = isPDF? mainKey + "pdf": mainKey
        return (
            <div key={mainKey}>
                {forms}
            </div>
        )
    }

    saveData(){
        this.setState({isPDF:true}) //trigger rerender
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.isEnlarge !== null){
            if(nextProps.isEnlarge.enlarge){
                this.setState({fontSize:Constants.fontSize, fontSizeTitle: Constants.fontSizeTitle})
            } else{
                this.setState({fontSize:Constants.fontSizeLarge, fontSizeTitle: Constants.fontSizeTitleLarge})
            }
        }
    }


    render() {
        return (
            <div>
                {
                    this.schema.length > 0 ?
                    <div>
                        <ReactToPrint
                            key="2"
                            trigger={() =><button style={{float:"right"}} onFocus={()=>this.saveData()} className="btn btn-primary">Download this form</button>}
                            content={() => this.myRef}
                            onAfterPrint={() => this.setState({isPDF:false})}
                        />
                    </div>
                    :
                    ''
                }

                {
                    this.state.isPDF?
                    <div className="PDF download" style={{visibility: "hidden", display: "none"}}>
                        <div style={{padding:50}} ref={el => (this.myRef = el)} >
                            {this.createForm(true, this.state.fontSize, this.state.fontSizeTitle, true)}
                        </div> 
                    </div>
                    :
                    ''
                }
                
                {this.createForm(this.state.fontSize, this.state.fontSizeTitle, false)}
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomForm);