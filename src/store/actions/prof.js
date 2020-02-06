import axios from 'axios';
import * as actionConst from './actionConst';
import * as constants from '../../Constants'

const profError = (err) => {
    return {
        type: actionConst.PROF_ERROR,
        error: err
    }
}

const profSave = (prof_json) => {
    return {
        type: actionConst.PROF_DOWNLOADED,
        prof: prof_json
    }
}

const downloadProf = () => {
    return dispatch => {
        console.log("downloading prof...")
        axios.get(constants.host_link + '/api/prof_with_ratings/')
        .then(res => {
            console.log("downloaded prof")
            var prof_json = res.data;
            // convert data into a string
            let prof_json_str = JSON.stringify(prof_json)
            localStorage.setItem('prof_json', prof_json_str)

            const profExpirationDate = new Date(new Date().getTime() + actionConst.DATA_EXPIRY_TIME);
            localStorage.setItem('profExpirationDate', profExpirationDate);

            console.log(prof_json)
            dispatch(profSave(prof_json));
        })
        .catch(err => {
            dispatch(profError(err))
        })
    }
}

export const getProf = () => {
    console.log("geting prof....")
    return dispatch => {
        const prof = localStorage.getItem('prof_json');
        if (prof === null ) {
            console.log("no prof in local storage")
            dispatch(downloadProf());
        } else {
            const profExpirationDate = new Date(localStorage.getItem('profExpirationDate'));
            if ( profExpirationDate <= new Date() ) {
                dispatch(updateProf());
            } else{
                console.log("prof found in local storage")
                const prof_json = JSON.parse(prof)
                dispatch(profSave(prof_json));
            }
        }
    }
}

export const updateProf = () => {
    console.log("geting prof....")
    return dispatch => {
        console.log("Updating Prof")
        localStorage.removeItem("prof_json")
        dispatch(downloadProf());
    }
}