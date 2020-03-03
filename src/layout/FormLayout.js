import React from 'react';
import { Modal, message, Icon, Card, Button } from 'antd';
import * as enlargeActions from '../store/actions/enlarge';
import { connect } from 'react-redux';
import { render } from "react-dom";
import ReactToPrint from "react-to-print";
import Form from "react-jsonschema-form";
import * as constants from '../Constants'
import * as formHandler from './forms/FormHandler'
import './formstyle.css'
import Grid from 'antd/lib/card/Grid';
import FormProperties from './FormProperties';


class FormLayout extends React.Component {    
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        let path_name = window.location.pathname.replace("/form/", "").split("_").join(" ")
        let boolean_checked = {}
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
            boolean_checked:boolean_checked,
            ignoreSection:ignoreSection
        }
    }

    componentDidMount(){
        this.props.getEnlarge()
    }

    saveTableData = (formNo, formDataNo, newData) => {
        this.formData[formNo].data[formDataNo] = newData
    }

    inputOnChange = (e, formDataNo, formNo, dataNo) =>{
        if (dataNo !== undefined){
            if( Array.isArray(dataNo) ){
                this.formData[formNo].data[formDataNo][dataNo[0]][dataNo[1]] = e.target.value
            }else{
                this.formData[formNo].data[formDataNo][dataNo] = e.target.value
            }
            return
        }
        try{
            this.formData[formNo].data[formDataNo] = e.target.value
        } catch {
            this.formData[formNo].data[formDataNo] = e
        }
    }

    checkboxOnChange = (e, checkType, formNo, formDataNo, sectionNo, dataNo)=>{
        if(checkType==="switch" && dataNo !== undefined){
            this.formData[formNo].data[formDataNo][dataNo] = e.target.checked
            return
        }
        this.formData[formNo].data[formDataNo] = e.target.checked
        if(checkType==="boolean section"){
            let ignoreSection = this.state.ignoreSection
            if(e.target.checked){
                ignoreSection.splice(ignoreSection.indexOf(sectionNo),1);
            } else{
                ignoreSection.push(sectionNo);
            }
            this.setState({ignoreSection: ignoreSection})
        }
    }

    checkboxWithInputOnChange = (e, key, boolean_checked, formNo, formDataNo) =>{
        if (!e.target.checked){
            if(typeof this.formData[formNo].data[formDataNo] === "string"){
                this.formData[formNo].data[formDataNo] = ""
            } else{
                for(let i in this.formData[formNo].data[formDataNo]){
                    if(typeof this.formData[formNo].data[formDataNo][i] === "string"){
                        this.formData[formNo].data[formDataNo][i] = ""
                    } else if (typeof this.formData[formNo].data[formDataNo][i] === "boolean"){
                        this.formData[formNo].data[formDataNo][i] = false
                    }
                }
            }
        }
        boolean_checked[key] = e.target.checked

        this.setState({boolean_checked: boolean_checked})
    }

    createForm = (fontSize, fontSizeTitle, isPDF) => {
        let forms = [<h1 key="form name">{this.name}</h1>]
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
            if(mainTitle !== ""){
                forms.push(<span style={{fontSize: fontSizeTitle}} key={mainTitle + formNo}>{mainTitle}</span>)
                forms.push(<br key={mainTitle + " br1" + formNo}/>)
                forms.push(<br key={mainTitle + " br2" + formNo}/>)
            }
            
            let properties = this.schema[formNo].properties

            let formprops = new FormProperties(properties,formNo,isPDF,fontSize,this.formData)
            let props_form = formprops.getFormProperties(this.state, this.inputOnChange.bind(this), 
                this.saveTableData.bind(this), this.checkboxOnChange.bind(this), 
                this.checkboxWithInputOnChange.bind(this))
            forms = forms.concat(props_form)

            forms.push(<br key={"form br " + formNo}/>)
        }

        let mainKey = "main div"
        mainKey = isPDF? mainKey + "pdf": mainKey
        console.log(this.state.boolean_checked)
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

                <Button
                shape="circle"
                style={{
                    position: "fixed",
                    bottom: "100px",
                    right: "100px",
                    height:"50px",
                    width:"50px"}}><Icon  style={{
                                    height:"50px",
                                    width:"50px"}} type="bars"/></Button>
                
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