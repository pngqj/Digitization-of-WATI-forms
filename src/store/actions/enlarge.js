

const enlargeSave = (enlarge) => {
    return {
        type: "enlarge",
        enlarge: enlarge
    }
}

export const getEnlarge = () => {
    console.log("geting enlarge....")
    return dispatch => {
        const enlarge = localStorage.getItem("enlarge");
        if(enlarge === null){
            dispatch(updateEnlarge(false));
            localStorage.setItem("enlarge",false)
        }else{
            dispatch(enlargeSave(enlarge === "true"));
        }   
    }
}

export const updateEnlarge = (isEnlarge) => {
    return dispatch => {
        localStorage.setItem("enlarge",isEnlarge? "true":"false")
        dispatch(getEnlarge());
    }
}