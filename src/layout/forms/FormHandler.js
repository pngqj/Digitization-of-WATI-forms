import * as exampleForm from "./exampleForm"
import * as WATI_Consideration_Guide from "./WATI Consideration Guide"
import * as Referral_Guide from "./Referral Guide"
import * as Assistive_Procedure_Guide from "./Assistive Procedure Guide"

const createEmptyDataFromProps = (property) =>{
    let data = null
    if (property.type === "paragraph" || property.type === "date"){
        data = null
    } else if (property.type === "boolean" || property.type === "boolean section"){
        data = false
    } else if (property.type === "string" || property.type === "boolean string" || property.type === "select"){
        if (property.multiple !== undefined){
            data = Array(property.multiple.length).fill("")
        } else{
            data = ""
        }
    } else if (property.type === "switch"){
        data = []
        for (let sw in property.properties){
            data.push(createEmptyDataFromProps(property.properties[sw])) //recursive
        }
    } else if (property.type === "table"){
        let colheadersMaxLen = 0

        for(let col in property.columns){
            if(property.columns[col].colheader !== undefined){
                if(colheadersMaxLen < property.columns[col].colheader.length){
                    colheadersMaxLen = property.columns[col].colheader.length
                }
            }
        }

        console.log(colheadersMaxLen)

        data = []
        let i = 0
        do{
            let d = {key: i}
            for(let col in property.columns){
                let inputType = property.columns[col].inputType
                if(property.columns[col].editable){
                    inputType = inputType === "boolean"? false : ""
                    d[property.columns[col].dataIndex] = inputType
                } else{
                    d[property.columns[col].dataIndex] = property.columns[col].colheader[i]
                }
                
            }
            d['enabled'] = !property.needCheckBox === true
            console.log(i)
            console.log(d)

            data.push(d)
            i += 1
        }while(i < colheadersMaxLen)
    }

    return data
}

const createEmptyData = (schema) => {
    let formData = []
    for (let i in schema){
        let s = schema[i]

        if(s.heading !== undefined){
            formData = formData.concat([{key:null, data:[]}]);
            continue
        }

        let s_data = {}
        s_data.key = i
        s_data.data = []

        for (let p in s.properties){
            let new_data = createEmptyDataFromProps(s.properties[p])
            s_data.data.push(new_data)
        }
        formData.push(s_data)
    }

    return formData
}



export const form_names = {
    "example form": {schema: exampleForm.schema, formData:createEmptyData(exampleForm.schema)},
    "WATI Assistive Technology Consideration Guide":{schema: WATI_Consideration_Guide.schema, formData:createEmptyData(WATI_Consideration_Guide.schema)},
    "WATI Assistive Technology Assessment Directions/Procedure Guide":{schema: Assistive_Procedure_Guide.schema, formData:createEmptyData(Assistive_Procedure_Guide.schema)},
    "Referral/Question Identification Guide":{schema: Referral_Guide.schema, formData:createEmptyData(Referral_Guide.schema)},
    "WAT Student Infomation Guide":{schema: [], formData:[]},
    "Environmental Observation Guide":{schema: [], formData:[]},
    "Environmental Observation Summary":{schema: [], formData:[]},
    "WATI Assistive Technology Decision Making Guide":{schema: [], formData:[]},
    "WATI Assistive Technology Assessment Technology Checklist":{schema: [], formData:[]},
    "WATI Assistive Technology Trial Use Guide":{schema: [], formData:[]},
    "WATI Assistive Technology Trial Use Summary":{schema: [], formData:[]},
}