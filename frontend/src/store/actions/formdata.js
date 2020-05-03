import { message } from "antd";
import axios from 'axios';
import * as constants from '../../Constants'
import * as actionConst from './actionConst';
import * as EncryptString from '../../EncryptString'


axios.defaults.withCredentials = true;


export const formdataStart = () => {
    return {
        type: actionConst.FORMDATA_START
    }
}

export const formdataDownloaded = (formdata, activeKey, newTabIndex, student_data,shared_to,owner_username) => {
    return {
        type: actionConst.FORMDATA_DOWNLOADED,
        formdata:formdata,
        activeKey:activeKey,
        newTabIndex:newTabIndex,
        student_data:student_data,
        shared_to:shared_to,
        owner_username:owner_username
    }
}

export const studentListStart = () => {
    return {
        type: actionConst.STUDENTLIST_START
    }
}

export const studentListDownloaded = (studentList) => {
    return {
        type: actionConst.STUDENTLIST_DOWNLOADED,
        studentList:studentList
    }
}

export const sharedToUpdated = (shared_to) => {
    return {
        type: actionConst.SHAREDTO_UPDATED,
        shared_to:shared_to
    }
}

export const getFormdata = (record) => {
    if (record === undefined || record === null) {
        message.error("error!")
        return null
    }

    return dispatch => {
        axios.post(constants.host_link + '/formdata/get_formdata/', {
            record:record
        })
        .then(res => {
            const formdata = res.data.formdata.formdata
            const activeKey = res.data.formdata.activeKey
            const newTabIndex = res.data.formdata.newTabIndex
            const owner_username = res.data.formdata.owner_username
            let shared_to = res.data.formdata.shared_to
            shared_to = {found:shared_to, not_found:[]}
            const student_data = res.data.formdata
            delete student_data.formdata
            delete student_data.activeKey
            delete student_data.newTabIndex
            delete student_data.last_updated_date
            delete student_data.owner_username
            delete student_data.shared_to

            dispatch(formdataDownloaded(formdata,activeKey,newTabIndex,student_data,shared_to,owner_username));
        })
        .catch(err => {
            message.error('error!');
            console.log(err)
        })
    }
}

export const getStudentList = () => {
    return dispatch => {
        dispatch(studentListStart());
        axios.get(constants.host_link + '/formdata/get_student_list/')
        .then(res => {
            let studentList = res.data.studentList
            dispatch(studentListDownloaded(studentList));

        })
        .catch(err => {
            message.error('error!');
        })
    }
}

export const addFormdata = (record) => {
    delete record.key
    return dispatch => {
        axios.post(constants.host_link + '/formdata/add_formdata/', {
            record: record
        })
        .then(res => {
            dispatch(getStudentList())
            message.success("Student added!")
        })
        .catch(err => {
            message.error('error!');
        })
    }
}

export const editStudent = (oldRecord, newRecord) => {
    return dispatch => {
        axios.post(constants.host_link + '/formdata/edit_student/', {
            oldRecord: oldRecord,
            newRecord: newRecord
        })
        .then(res => {
            dispatch(getStudentList())
            message.success("Student edited!")
        })
        .catch(err => {
            message.error('error!');
        })
    }
}

export const deleteStudent = (oldRecord) => {
    return dispatch => {
        axios.post(constants.host_link + '/formdata/delete_student/', {
            oldRecord: oldRecord,
        })
        .then(res => {
            dispatch(getStudentList())
            message.success("Student deleted!")
        })
        .catch(err => {
            message.error('error!');
        })
    }
}

export const editFormdata = (student_data) => {
    return dispatch => {
        let savedData = localStorage.getItem(constants.savedDataName)
        let savedActiveKey = localStorage.getItem(constants.savedActiveKey)
        let savedTabIndex = localStorage.getItem(constants.savedTabIndex)

        savedData = EncryptString.decrypt(savedData)
        savedData = JSON.parse(savedData);

        axios.post(constants.host_link + '/formdata/edit_formdata/', {
            record: student_data,
            formdata: savedData,
            activeKey: savedActiveKey, 
            newTabIndex: savedTabIndex
        })
        .then(res => {
            message.success("Saved!")
        })
        .catch(err => {
            message.error('error!');
        })
    }
}

export const editSharedTo = (shared_to_list, record) => {
    return dispatch => {
        axios.post(constants.host_link + '/formdata/edit_shared_to/', {
            record: record,
            shared_to_list: {shared_to_list:shared_to_list},
        })
        .then(res => {
            message.success("Shared!")
            const shared_to = {found:res.data.found, not_found:res.data.not_found}
            dispatch(sharedToUpdated(shared_to))
        })
        .catch(err => {
            message.error('error!');
        })
    }
}