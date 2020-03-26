import axios from 'axios';
import * as actionConst from './actionConst';
import * as constants from '../../Constants'

const tagsError = (err) => {
    return {
        type: actionConst.TAGS_ERROR,
        error: err
    }
}

const tagsSave = (tags_json) => {
    return {
        type: actionConst.TAGS_DOWNLOADED,
        tags: tags_json
    }
}

const downloadTags = () => {
    return dispatch => {
        console.log("downloading tags...")
        axios.get(constants.host_link + '/api/tags_viewset/')
        .then(res => {
            console.log("downloaded tags")
            const tags_json = res.data;
            localStorage.setItem('tags_json', JSON.stringify(tags_json))

            const tagExpirationDate = new Date(new Date().getTime() + actionConst.DATA_EXPIRY_TIME);
            localStorage.setItem('tagExpirationDate', tagExpirationDate);
            
            dispatch(tagsSave(tags_json));
        })
        .catch(err => {
            dispatch(tagsError(err))
        })
    }
}

export const getTags = () => {
    console.log("geting tags....")
    return dispatch => {
        const tag = localStorage.getItem('tags_json');
        if (tag === null ) {
            console.log("no tags in local storage")
            dispatch(downloadTags());
        } else {
            const tagExpirationDate = new Date(localStorage.getItem('tagExpirationDate'));
            if ( tagExpirationDate <= new Date() ) {
                dispatch(updateTag());
            } else{
                console.log("tags found in local storage")
                const tags_json = JSON.parse(tag)
                dispatch(tagsSave(tags_json));
            }
        }
    }
}

export const updateTag = () => {
    console.log("geting tag....")
    return dispatch => {
        console.log("Updating Tag")
        localStorage.removeItem("tag_json")
        dispatch(downloadTags());
    }
}