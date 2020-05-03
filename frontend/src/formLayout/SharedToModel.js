import { Select, Modal, message, Button } from 'antd';
import React from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as EncryptString from '../EncryptString'
import * as actions from '../store/actions/formdata';

const { Option } = Select;

const findDifferenceBetween2Array = (a1, a2) => {
    const dic = {}

    for (let i in a1) {
        dic[a1[i]] = true;
    }
    for (let i in a2) {
        if (dic[a2[i]] && a2.filter(x => x==a2[i]).length === 1) {
            delete dic[a2[i]];
        } else {
            dic[a2[i]] = true;
        }
    }
    return Object.keys(dic)
}

class SharedToModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shared_to_list:[],
            error_msg:null
        }

        let record = window.location.pathname.replace("/forms/", "")
        record = EncryptString.decrypt(record)
        this.record = JSON.parse(record)
    }

    componentWillReceiveProps(nextProps){
        let closeModel = true
        let error_msg = null
        const diff_not_found = findDifferenceBetween2Array(nextProps.shared_to.not_found, this.props.shared_to.not_found)
        const diff_found = findDifferenceBetween2Array(nextProps.shared_to.found, this.props.shared_to.found)
        if(nextProps.shared_to.not_found.length > 0){
            // if there is a change in prop.shared_to
            if(diff_found.length > 0 || diff_not_found.length > 0){
                error_msg = JSON.stringify(nextProps.shared_to.not_found)
                error_msg = error_msg.replace(/\[/, '')
                error_msg = error_msg.replace(/\]/, "")
                error_msg = "No account with " + error_msg + " as username or email address exist!" 
                closeModel = false
            }
        }
        this.setState({
            shared_to_list:nextProps.shared_to.found,
            error_msg:error_msg
        })

        if(closeModel && (diff_found.length > 0 || diff_not_found.length > 0)){
            this.props.closeModel()
        }

    }

    render(){
        return(
            <div>
            <Modal
                title="Share form with others"
                visible={this.props.visible}
                onCancel={()=>this.props.closeModel()}
                onOk={()=>{
                    let different = findDifferenceBetween2Array(this.state.shared_to_list, this.props.shared_to.found)
                    different = different.length > 0
                    if(different){
                        this.props.editSharedTo(this.state.shared_to_list, this.record)
                    } else{
                        this.props.closeModel()
                    }
                }}
                >
                <Select 
                    value={this.state.shared_to_list}
                    mode="tags" 
                    placeholder="Enter usernames or email addresses..."
                    style={{ width: '100%' }} 
                    onChange={(value)=>this.setState({shared_to_list:value})} 
                    tokenSeparators={[',']}>
                </Select>
            </Modal>

            <Modal
                title="Error"
                visible={this.state.error_msg !== null}
                footer={[<Button type="primary" onClick={()=>this.setState({error_msg:null})}>Close</Button>]}
                >
                {this.state.error_msg}
            </Modal>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        shared_to: state.formdata.shared_to,
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        editSharedTo: (shared_to_list, record) => dispatch(actions.editSharedTo(shared_to_list, record)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SharedToModel));
