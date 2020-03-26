import React from 'react';
import { Tabs, Modal, Dropdown, Checkbox, Button, Icon, Input, message } from 'antd';
import * as enlargeActions from '../store/actions/enlarge';
import { connect } from 'react-redux';
import * as Constants from '../Constants'
import * as FormHandler from './forms/FormHandler'

import CustomForm from './forms/CustomForm';

const { TabPane } = Tabs;

class FormLayout extends React.Component {    
    constructor(props) {
        super(props);
        let newTabIndex = localStorage.getItem(Constants.savedTabIndex)
        this.newTabIndex = newTabIndex === null ? 0 : newTabIndex
        let activeKey = localStorage.getItem(Constants.savedActiveKey)
        activeKey =  activeKey === null ? null : activeKey
        let panes = []
        let savedData = localStorage.getItem(Constants.savedDataName)

        if (savedData !== null){
            savedData = JSON.parse(savedData);

            console.log(savedData)
            
            for(let key in savedData){
                let title = savedData[key].title
                let form_name = savedData[key].form_name

                panes.push({ title: title, content: <CustomForm activeKey={key} form_name={form_name}/>, key: key });
            }
        }

        let addTabModalVisible = panes.length == 0

        this.state = {
            activeKey: activeKey,
            panes: panes,
            selectedForms: [],
            addTabModalVisible:addTabModalVisible,
            editTabNameModelVisible:false
        };
       
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
        const { panes } = this.state;
        let activeKey = `newTab${this.newTabIndex}`;
        for(let k in this.state.selectedForms){
            activeKey = `newTab${this.newTabIndex++}`;
            let form_name = this.state.selectedForms[k]
            panes.push({ title: form_name, content: <CustomForm activeKey={activeKey} 
                    form_name = {form_name}/>, key: activeKey });
        }
        this.setState({ panes, activeKey, addTabModalVisible:false, selectedForms: [] });
        localStorage.setItem(Constants.savedActiveKey, activeKey)
        localStorage.setItem(Constants.savedTabIndex, this.newTabIndex)
      }
    
      remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        console.log(targetKey)
        console.log(this.state.panes)
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        console.log(panes)
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }

        if(panes.length === 0){
          this.setState({ panes, activeKey, addTabModalVisible:true });
        } else{
          this.setState({ panes, activeKey });
        }

        let savedData = localStorage.getItem(Constants.savedDataName)
        savedData = JSON.parse(savedData);
        delete savedData[targetKey]        
        savedData = JSON.stringify(savedData)
        localStorage.setItem(Constants.savedDataName, savedData)
        localStorage.setItem(Constants.savedActiveKey, activeKey)

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

        this.setState({panes:panes, editTabNameModelVisible:false})

        let savedData = localStorage.getItem(Constants.savedDataName)
        savedData = JSON.parse(savedData);
        savedData[this.state.activeKey].title = this.state.tabName
        savedData = JSON.stringify(savedData)
        localStorage.setItem(Constants.savedDataName, savedData)
      }
    
      render() {
        return (
        <div>
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
          <Tabs
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
            tabBarExtraContent={(<Button onClick={this.showEditTabNameModel} style={{marginLeft:"2px", padding:0, height:"20px", width:"20px"}}>
              <Icon type="edit" style={{fontSize:"12px", position: "absolute", top: "10%", left:"15%"}}></Icon>
            </Button>)}
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
      
  }
}

const mapDispatchToProps = dispatch => {
  return {
      
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLayout);