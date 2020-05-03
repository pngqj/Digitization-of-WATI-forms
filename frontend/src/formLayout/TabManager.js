import React from 'react';
import { Tabs, Modal, notification, Checkbox, Button, Input, message } from 'antd';
import * as enlargeActions from '../store/actions/enlarge';
import * as actions from '../store/actions/formdata';
import { connect } from 'react-redux';
import { Prompt } from 'react-router'
import * as Constants from '../Constants'
import * as EncryptString from '../EncryptString'
import * as FormHandler from './forms/FormHandler'
import {
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
        this.props.getFormData(record)
        this.state = {
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
        const formdata = nextprops.formdata
        const formdataString = EncryptString.encrypt(JSON.stringify(formdata))
        localStorage.setItem(Constants.savedDataName, formdataString)
        localStorage.setItem(Constants.savedTabIndex, nextprops.newTabIndex)

        let panes = this.getPanes ()
        let addTabModalVisible = panes.length == 0

        this.setState({
            activeKey: nextprops.activeKey,
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

      getPanes(){
        let panes = []
        let savedData = localStorage.getItem(Constants.savedDataName)
        savedData = savedData === null? null : EncryptString.decrypt(savedData)
        if (savedData !== null){
            savedData = JSON.parse(savedData);
            
            for(let key in savedData){
                let title = savedData[key].title
                let form_name = savedData[key].form_name

                panes.push({ title: title, content: 
                    <CustomForm 
                      formDataEdited={this.formDataEdited.bind(this)} 
                      openDeleteTabNotification={this.openDeleteTabNotification.bind(this)} 
                      addReferalGuideSectionToTab = {this.addReferalGuideSectionToTab.bind(this)}
                      activeKey={key} 
                      form_name={form_name}
                    />, key: key });
            }
        }
        return panes
      }

      formDataEdited = () =>{
        this.setState({leavingPrompt:true})
      }
    
      onChange = activeKey => {
        this.setState({ activeKey });
        localStorage.setItem(Constants.savedActiveKey, activeKey)
      };
    
      onEdit = (targetKey, action) => {
        this[action](targetKey);
      };

      add = () => {
          this.setState({addTabModalVisible:true})
      }

      addFormsToTab = () =>{
        let activeKey = `newTab${this.newTabIndex}`;
        for(let k in this.state.selectedForms){
            activeKey = `newTab${++this.newTabIndex}`;
            let form_name = this.state.selectedForms[k]
            let formData = FormHandler.form_names[form_name].formData
            let l = {formData:formData, title:form_name, form_name:form_name}
            let savedData = localStorage.getItem(Constants.savedDataName)
            savedData = EncryptString.decrypt(savedData)
            savedData = JSON.parse(savedData);
            savedData = savedData === null? {} : savedData
            savedData[activeKey] = l
            savedData = EncryptString.encrypt(JSON.stringify(savedData))
            localStorage.setItem(Constants.savedDataName, savedData)
        }
        localStorage.setItem(Constants.savedActiveKey, activeKey)
        localStorage.setItem(Constants.savedTabIndex, this.newTabIndex)
        let panes = this.getPanes()
        this.setState({ panes, activeKey, addTabModalVisible:false, selectedForms: [], leavingPrompt:true});
      }

      addReferalGuideSectionToTab = (sectionNo, formNo, formDataNo) =>{
        let { activeKey} = this.state;
        let savedData = localStorage.getItem(Constants.savedDataName)
        savedData = EncryptString.decrypt(savedData)
        savedData = JSON.parse(savedData);
        try{
          savedData[activeKey].formData[formNo].data[formDataNo] = true
        } catch{
          let key = activeKey.split("|")[0]
          savedData[key].formData[formNo].data[formDataNo] = true
        }
        let sectionName = `Section ${sectionNo}`;
        let newKey = `newTab${++this.newTabIndex}`;
        let form_name = "Referral/Question Identification Guide " + sectionName

        let l = {
          formData:FormHandler.referral_Guide_Sections[sectionName].formData, 
          title:form_name, 
          form_name:form_name,
          mainFormKey: activeKey,
          formNo:formNo,
          formDataNo:formDataNo
        }
        // savedData = savedData === null? {} : savedData
        savedData[newKey] = l
        savedData = EncryptString.encrypt(JSON.stringify(savedData))

        localStorage.setItem(Constants.savedDataName, savedData)
        localStorage.setItem(Constants.savedActiveKey, newKey)
        localStorage.setItem(Constants.savedTabIndex, this.newTabIndex)
        let panes = this.getPanes()
        this.setState({ panes, leavingPrompt:true}); 
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


        let savedData = localStorage.getItem(Constants.savedDataName)
        savedData = EncryptString.decrypt(savedData)
        savedData = JSON.parse(savedData);
        if(isSection){
          let formNo = savedData[`newTab${removeKey}`].formNo
          let formDataNo = savedData[`newTab${removeKey}`].formDataNo
          let mainFormKey = savedData[`newTab${removeKey}`].mainFormKey

          savedData[mainFormKey].formData[formNo].data[formDataNo] = false
        }
        delete savedData[`newTab${removeKey}`]

        savedData = EncryptString.encrypt(JSON.stringify(savedData))
        localStorage.setItem(Constants.savedDataName, savedData)

        let newPanes = this.getPanes()
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
        localStorage.setItem(Constants.savedActiveKey, activeKey)
        this.setState({ panes:newPanes, activeKey, addTabModalVisible, leavingPrompt:true });
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

        let savedData = localStorage.getItem(Constants.savedDataName)
        savedData = EncryptString.decrypt(savedData)
        savedData = JSON.parse(savedData);
        savedData[this.state.activeKey].title = this.state.tabName
        savedData = EncryptString.encrypt(JSON.stringify(savedData))
        localStorage.setItem(Constants.savedDataName, savedData)
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
            type="editable-card"
            onEdit={this.onEdit}
            tabBarExtraContent={(
              <ButtonGroup>
                <Button onClick={()=>{
                  this.props.editFormdata(this.props.student_data)
                  this.setState({leavingPrompt:false})
                  }} 
                  style={{marginLeft:"2px", padding:0, height:"20px", width:"20px"}}>
                <SaveOutlined type="edit" style={{fontSize:"12px", position: "absolute", top: "10%", left:"15%"}}></SaveOutlined>
                </Button>
                <Button onClick={this.showEditTabNameModel} style={{marginLeft:"2px", padding:0, height:"20px", width:"20px"}}>
                  <EditOutlined type="edit" style={{fontSize:"12px", position: "absolute", top: "10%", left:"15%"}}></EditOutlined>
                </Button>
                
                {
                  this.props.is_owner_of_form?
                  <Button onClick={() => this.setState({shareToModelVisible:true})} style={{marginLeft:"2px", padding:0, height:"20px", width:"20px"}}>
                    <ShareAltOutlined type="edit" style={{fontSize:"12px", position: "absolute", top: "10%", left:"15%"}}></ShareAltOutlined>
                  </Button>
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
      editFormdata: (student_data) => dispatch(actions.editFormdata(student_data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabManager);