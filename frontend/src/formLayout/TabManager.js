import React from 'react';
import { Tabs, Modal, notification, Checkbox, Button, Input, message, Popover, Tooltip } from 'antd';
import * as enlargeActions from '../store/actions/enlarge';
import * as actions from '../store/actions/formdata';
import { connect } from 'react-redux';
import { Prompt } from 'react-router'
import * as Constants from '../Constants'
import * as EncryptString from '../EncryptString'
import * as FormHandler from './forms/FormHandler'
import {
  PlusOutlined,
  EditOutlined,
  SaveOutlined,
  ShareAltOutlined
} from '@ant-design/icons';
import CustomForm from './CustomForm';
import ButtonGroup from 'antd/lib/button/button-group';
import SharedToModel from './SharedToModel';

const { TabPane } = Tabs;

class TabManager extends React.Component {    
    constructor(props) {
        super(props);
        this.newTabIndex = 0
        let record = window.location.pathname.replace("/forms/", "")
        record = EncryptString.decrypt(record)
        record = JSON.parse(record)
        console.log(record)
        this.student_name = record.student_name
        this.student_school = record.student_school
        this.student_age = record.student_age
        this.props.getFormData(record)
        this.state = {
          formData:{},
          addTabModalVisible:false,
          leavingPrompt:false,
          panes:[],
          activeKey:"newTab0",
          selectedForms: []
        }
      }

      componentWillReceiveProps(nextprops){
        if(nextprops.newTabIndex === undefined || nextprops.activeKey === undefined){
          this.setState({error:true})
          return
        }

        this.newTabIndex = nextprops.newTabIndex 
        console.log(nextprops)

        let panes = this.getPanes(nextprops.formdata)
        let addTabModalVisible = panes.length == 0

        this.setState({
            activeKey: nextprops.activeKey,
            formData: nextprops.formdata,
            panes: panes,
            addTabModalVisible:addTabModalVisible,
            editTabNameModelVisible:false,
            error: false
        });
      }
      
      componentDidUpdate = () => {
        if (this.state.leavingPrompt) {
          window.onbeforeunload = () => true
        } else {
          window.onbeforeunload = undefined
        }
      }

      getPanes(formData){
        let panes = []
        if (formData !== null ){
            for(let key in formData){
                let title = formData[key].title
                let form_name = formData[key].form_name

                panes.push({ title: title, content: 
                    <CustomForm 
                      formDataEdited={this.formDataEdited.bind(this)} 
                      openDeleteTabNotification={this.openDeleteTabNotification.bind(this)} 
                      addReferalGuideSectionToTab = {this.addReferalGuideSectionToTab.bind(this)}
                      activeKey={key} 
                      form_name={form_name}
                      formData={formData}
                    />, key: key });
            }
        }
        return panes
      }

      formDataEdited = (formData) =>{
        this.setState({leavingPrompt:true, formData: formData})
      }
    
      onChange = activeKey => {
        this.setState({ activeKey });
      };
    
      onEdit = (targetKey, action) => {
        this[action](targetKey);
      };

      add = () => {
          this.setState({addTabModalVisible:true})
      }

      autoPopulate = (formName, formData) => {
        if (formName === "Referral/Question Identification Guide"){
          formData[0].data[0] = this.student_name
          formData[0].data[2] = this.student_age
          formData[0].data[3] = this.student_school
        }
        else if (formName === "WATI Assistive Technology Trial Use Summary"){
          formData[0].data[0] = this.student_name
          formData[0].data[1] = this.student_age
        }
        else if (formName === "WATI Assistive Technology Trial Use Guide"){
          formData[1].data[0] = this.student_name
          formData[1].data[2] = this.student_age
          formData[1].data[3] = this.student_school
        }
        else if (formName === "Environmental Observation Guide"){
          formData[0].data[0] = this.student_name
          formData[0].data[1] = this.student_school
        }
        else if (formName === "WATI Assistive Technology Assessment Directions/Procedure Guide"){
          formData[0].data[2] = this.student_name
          formData[0].data[1] = this.student_school
        }
        else if (formName === "WATI Assistive Technology Consideration Guide"){
          formData[0].data[0] = this.student_name
          formData[0].data[1] = this.student_school
        }
        
      }

      addFormsToTab = () =>{
        let activeKey = `newTab${this.newTabIndex}`;
        let formData = this.state.formData
        console.log(formData)
        for(let k in this.state.selectedForms){
            activeKey = `newTab${++this.newTabIndex}`;
            let form_name = this.state.selectedForms[k]
            let newFormData = JSON.parse(JSON.stringify(FormHandler.form_names[form_name].formData))
            this.autoPopulate(form_name, newFormData)
            let l = {formData:newFormData, title:form_name, form_name:form_name}
            formData = formData === null? {} : formData
            formData[activeKey] = l
        }
        let panes = this.getPanes(this.state.formData)
        this.setState({ panes, activeKey, formData, addTabModalVisible:false, selectedForms: [], leavingPrompt:true});
      }

      addReferalGuideSectionToTab = (sectionNo, formNo, formDataNo) =>{
        let { activeKey} = this.state;
        let formData = this.state.formData
        try{
          formData[activeKey].formData[formNo].data[formDataNo] = true
        } catch{
          let key = activeKey.split("|")[0]
          formData[key].formData[formNo].data[formDataNo] = true
        }
        let sectionName = `Section ${sectionNo}`;
        let newKey = `newTab${++this.newTabIndex}`;
        let form_name = "Student Information Guide " + sectionName

        let l = {
          formData:FormHandler.referral_Guide_Sections[sectionName].formData, 
          title:form_name, 
          form_name:form_name,
          mainFormKey: activeKey,
          formNo:formNo,
          formDataNo:formDataNo
        }
        // formData = formData === null? {} : formData
        formData[newKey] = l
        let panes = this.getPanes(this.state.formData)
        this.setState({ panes, formData, leavingPrompt:true}); 
        this.openAddSectionNotification(newKey)
      }

      openAddSectionNotification = (newKey) => {
        const key = `open${Date.now()}`;
        const btn = (
          <ButtonGroup>
            <Button size="small" onClick={() => {notification.close(key)}}>No</Button>
            <Button type="primary" size="small" onClick={() => {
              this.setState({activeKey:newKey})
              window.scrollTo(0, 0);
              notification.close(key)
            }}>
              Yes
          </Button>
          </ButtonGroup>
        );
        notification.open({
          message: "Section Added!",
          description:
            'Navigate to the new section?',
          btn,
          key,
        });
      };

      remove = removeKey => {
        let pane = this.state.panes.filter(p => p.key === removeKey)[0]
        let isSection = pane.content.props.form_name.includes("Section")
        this.openDeleteTabNotification(removeKey, isSection) 
      }

      deleteTab = (removeKey, isSection) => {
        let { activeKey, panes } = this.state;

        // if remove key is an array (passed from CustomForm.js)
        if (Array.isArray(removeKey)){
          let sectionNo = removeKey[0]
          let pane = panes.filter(p => p.content.props.form_name.includes("Section " + sectionNo))[0]
          removeKey= parseInt(pane.key.replace("newTab", ""))
        }
        

        try{
          removeKey = parseInt(removeKey.replace(/\D/g,''))
        } catch{}


        let formData = this.state.formData
        if(isSection){
          let formNo = formData[`newTab${removeKey}`].formNo
          let formDataNo = formData[`newTab${removeKey}`].formDataNo
          let mainFormKey = formData[`newTab${removeKey}`].mainFormKey

          formData[mainFormKey].formData[formNo].data[formDataNo] = false
        }
        delete formData[`newTab${removeKey}`]


        let newPanes = this.getPanes(this.state.formData)
        let addTabModalVisible = newPanes.length === 0
        if(newPanes.length === 0){
          activeKey = null
        } else if(activeKey === `newTab${removeKey}`){
          let lastKey = null
          for(var index in panes) {
            if(activeKey === panes[index].key){
              if(lastKey !== null){
                activeKey = lastKey
              } else{
                let nextIndex = parseInt(index) + 1
                nextIndex = nextIndex.toString()
                activeKey = panes[nextIndex].key
              }
              break
            }
            lastKey = panes[index].key
          }
        }
        this.setState({ panes:newPanes, formData, activeKey, addTabModalVisible, leavingPrompt:true });
      }

      openDeleteTabNotification = (removeKey, isSection) => {
        const key = `open${Date.now()}`;
        const btn = (
          <ButtonGroup>
            <Button size="small" onClick={() => {notification.close(key)}}>Cancel</Button>
            <Button type="primary" size="small" onClick={() => {
              notification.close(key)
              this.deleteTab(removeKey, isSection)
            }}>
              Confirm
            </Button>
          </ButtonGroup>
        );
        notification.open({
          message: 'Confirm delete tab?',
          btn,
          key,
        });
      };

      checkboxOnChange = (selectedForms) =>{
          this.setState({selectedForms:selectedForms})
      }

      getCheckboxes = () =>{
        let options = []
        let keys = Object.keys(FormHandler.form_names)
        for (let k in keys){
            options.push({label: keys[k], value: keys[k] })
        }
        return (<Checkbox.Group options={options} value={this.state.selectedForms} onChange={this.checkboxOnChange} />)
      }

      showEditTabNameModel = () =>{
        if(this.state.panes.length === 0){
          message.error("Add a form first!")
          return
        }

        let tabName = this.state.panes.filter(pane => pane.key === this.state.activeKey)[0].title;
        this.setState({editTabNameModelVisible:true,tabName:tabName})
      }
      
      editTabName = () =>{
        const { panes } = this.state;

        let index = panes.findIndex(pane => pane.key === this.state.activeKey);
        panes[index].title = this.state.tabName

        this.setState({panes:panes, editTabNameModelVisible:false, leavingPrompt:true})

        let formData = this.state.formData
        formData[this.state.activeKey].title = this.state.tabName
        this.setState(formData)
      }
    
      render() {
        if(this.state.error){
          return (
            <div>
              <h1 style={{textAlign:"center"}}>Hmm, we can't reach this page</h1>
              <div style={{textAlign:"center"}}>
                <ul style={{display:"inline-block", textAlign:"left", fontSize:20}}>
                  <li>Make sure you have entered the correct URL</li>
                  <li>Refresh the page</li>
                </ul>  
              </div>
            </div>
          )
        }


        return (
        <div>
            <Prompt
              when={this.state.leavingPrompt}
              message='Changes you made may not be saved.'
            />
            <Modal 
                title="Add a form"
                visible={this.state.addTabModalVisible}
                onCancel={()=>this.setState({addTabModalVisible:false})}
                onOk={this.addFormsToTab}>
                {
                    this.getCheckboxes()
                }
            </Modal>

            <Modal 
                visible={this.state.editTabNameModelVisible}
                onCancel={()=>this.setState({editTabNameModelVisible:false})}
                onOk={this.editTabName}
                title="Edit Tab Name">
                <Input value={this.state.tabName} onChange={(e)=>this.setState({tabName:e.target.value})}></Input>
            </Modal>

            <SharedToModel
                visible={this.state.shareToModelVisible}
                closeModel={()=>this.setState({shareToModelVisible:false})}>
            </SharedToModel>

          <Tabs
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            hideAdd
            type="editable-card"
            onEdit={this.onEdit}
            tabBarExtraContent={(
              <ButtonGroup>
                <Tooltip placement="topLeft" title="Add">
                  <Button onClick={this.add} style={{marginLeft:"2px", padding:0, height:"20px", width:"20px"}}>
                    <PlusOutlined type="edit" style={{fontSize:"12px", position: "absolute", top: "10%", left:"15%"}}></PlusOutlined>
                  </Button>
                </Tooltip>
                <Tooltip placement="topLeft" title="Save">
                  <Button onClick={()=>{
                    this.props.editFormdata(this.props.student_data, this.state.formData, this.state.activeKey, this.newTabIndex)
                    this.setState({leavingPrompt:false})
                    }} 
                    style={{marginLeft:"2px", padding:0, height:"20px", width:"20px"}}>
                  <SaveOutlined type="edit" style={{fontSize:"12px", position: "absolute", top: "10%", left:"15%"}}></SaveOutlined>
                  </Button>
                </Tooltip>
                
                <Tooltip placement="topLeft" title="Edit">
                  <Button onClick={this.showEditTabNameModel} style={{marginLeft:"2px", padding:0, height:"20px", width:"20px"}}>
                    <EditOutlined type="edit" style={{fontSize:"12px", position: "absolute", top: "10%", left:"15%"}}></EditOutlined>
                  </Button>
                </Tooltip>
                
                {
                  this.props.is_owner_of_form?
                  <Tooltip placement="topLeft" title="Share">
                    <Button onClick={() => this.setState({shareToModelVisible:true})} style={{marginLeft:"2px", padding:0, height:"20px", width:"20px"}}>
                      <ShareAltOutlined type="edit" style={{fontSize:"12px", position: "absolute", top: "10%", left:"15%"}}></ShareAltOutlined>
                    </Button>
                  </Tooltip>
                  :
                  ''
                }
              </ButtonGroup>
            )}
          >
            {this.state.panes.map(pane => (
              <TabPane tab={pane.title} key={pane.key} closable={pane.closable} forceRender={true} >
                {pane.content}
              </TabPane>
            ))}
          </Tabs>
        
        </div>
        );
      }
}

const mapStateToProps = state => {
  return {
      is_owner_of_form: state.auth.username === state.formdata.owner_username,
      formdata: state.formdata.formdata,
      activeKey: state.formdata.activeKey,
      newTabIndex: state.formdata.newTabIndex,
      student_data: state.formdata.student_data
  }
}

const mapDispatchToProps = dispatch => {
  return {
      getFormData: (record) => dispatch(actions.getFormdata(record)),
      editFormdata: (student_data, formData, activeKey, newTabIndex) => dispatch(actions.editFormdata(student_data, formData, activeKey, newTabIndex))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabManager);