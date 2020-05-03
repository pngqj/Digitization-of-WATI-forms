import * as actionConst from '../actions/actionConst';
import { updateObject } from '../utility';

const initialState = {
    formdata: [],
    studentList: [],
    shared_to:{found:[],not_found:[]},
    student_data: {},
    owner_username:null
}

const formdataStart = (state, action) => {
    return updateObject(state, {
        formdata: [],
    });
}

const formdataDownloaded = (state, action) => {
    return updateObject(state, {
        formdata: action.formdata,
        activeKey: action.activeKey,
        newTabIndex: action.newTabIndex,
        student_data: action.student_data,
        shared_to: action.shared_to,
        owner_username: action.owner_username
    });
}

const studentListStart = (state, action) => {
    return updateObject(state, {
        studentList: [],
    });
}

const studentListDownloaded = (state, action) => {
    return updateObject(state, {
        studentList: action.studentList
    });
}

const sharedToUpdated = (state, action) => {
    return updateObject(state, {
        shared_to: action.shared_to
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionConst.FORMDATA_START: return formdataStart(state, action);
        case actionConst.FORMDATA_DOWNLOADED: return formdataDownloaded(state, action);
        case actionConst.STUDENTLIST_START: return studentListStart(state, action);
        case actionConst.STUDENTLIST_DOWNLOADED: return studentListDownloaded(state, action);
        case actionConst.SHAREDTO_UPDATED: return sharedToUpdated(state, action);
        default:
            return state;
    }
}

export default reducer;