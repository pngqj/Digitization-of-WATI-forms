import {Form, Input, Modal, Icon, Radio, message} from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';

import axios from 'axios';
import * as constants from '../Constants'

const FormItem = Form.Item;

class UserSettingsModal extends React.Component {
  state = {
      user_id: null
  };

    handleChangePasswordSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.props.changePassword(
              values.old_password,
              values.new_password,
              values.confirm
          );
          this.props.handleModalClose()
        }
      });
    }

    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('new_password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }
  
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }


    
    async componentDidMount() {
    }

    render() {
      const { visible} = this.props;
      const { getFieldDecorator } = this.props.form;
    
      return (
      <Modal
          title= {"Change Password"}
          visible={visible}
          onCancel={this.props.handleModalClose}
          footer={null}
      >

        <Form>

          <FormItem>
            {getFieldDecorator('old_password', {
              rules: [{
                required: true, message: 'Please input your old password!',
              }],
            })(
              <Input placeholder="Old Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('new_password', {
              rules: [{
                required: true, message: 'Please input your new password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input placeholder="New Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"/>
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input placeholder="Confirm Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
        </Form>  

        <FormItem>
          <Radio.Group style={{float:"right", marginTop:"20px"}} value={null} onChange={this.radioOnChange}>
            <Radio.Button onClick={this.props.handleModalClose} style = {constants.blue_button_style} value="delete">Cancel</Radio.Button>
            <Radio.Button onClick={this.handleChangePasswordSubmit} style = {constants.blue_button_style} value="edit">Submit</Radio.Button>
          </Radio.Group> 
        </FormItem>
      </Modal>
      );
    }
    }

    const mapStateToProps = (state) => {
      return {
        loading: state.auth.loading,
        error: state.auth.error
      }
    }
    
    const mapDispatchToProps = dispatch => {
        return {
          changePassword: (oldPassword, newPassword1, newPassword2) => dispatch(actions.changePassword(oldPassword, newPassword1, newPassword2))
        }
    }
    const WrappedRegistrationForm = Form.create()(UserSettingsModal)
    export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WrappedRegistrationForm));