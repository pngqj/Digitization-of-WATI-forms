import axios from 'axios';
import * as actionConst from './actionConst';
import * as constants from '../../Constants'

const courseError = (err) => {
    return {
        type: actionConst.COURSE_ERROR,
        error: err
    }
}

const courseSave = (course_json) => {
    return {
        type: actionConst.COURSE_DOWNLOADED,
        course: course_json
    }
}

const downloadCourse = (searchStr) => {
    return dispatch => {
        console.log("downloading course...")
        axios.post(constants.host_link + '/api/course_with_ratings/',{
            searchStr:searchStr
        })
        .then(res => {
            console.log("downloaded course")
            var course_json = res.data;
            console.log(course_json)
            dispatch(courseSave(course_json));
        })
        .catch(err => {
            console.log(err)
            dispatch(courseError(err))
        })
    }
}

export const getCourse = (searchStr) => {
    return dispatch => {
        console.log("geting course....")
        dispatch(downloadCourse(searchStr));
    }
}

export const updateCourse = () => {
    console.log("geting course....")
    return dispatch => {
        console.log("Updating Course")
        dispatch(downloadCourse());
    }
}