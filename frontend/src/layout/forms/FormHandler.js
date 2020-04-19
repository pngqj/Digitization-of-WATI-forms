import * as exampleForm from "./exampleForm"
import * as WATI_Consideration_Guide from "./WATI Consideration Guide"
import * as Referral_Guide from "./Referral Guide"
import * as Assistive_Procedure_Guide from "./Assistive Procedure Guide"
import * as Environmental_Guide from "./Environmental Guide"
import * as Environmental_Summary from "./Environmental Summary"
import * as WATI_Making_Guide from "./WATI Making Guide"
import * as WATI_Use_Guide from "./WATI Use Guide"
import * as WATI_Use_Summary from "./WATI Use Summary"
import * as WATI_Technology_Checklist from "./WATI Technology Checklist"

import * as section1 from './Referral Guide subforms/section1'
import * as section2 from './Referral Guide subforms/section2'
import * as section3 from './Referral Guide subforms/section3'
import * as section4 from './Referral Guide subforms/section4'
import * as section5 from './Referral Guide subforms/section5'
import * as section6 from './Referral Guide subforms/section6'
import * as section7 from './Referral Guide subforms/section7'
import * as section8 from './Referral Guide subforms/section8'
import * as section9 from './Referral Guide subforms/section9'
import * as section10 from './Referral Guide subforms/section10'
import * as section11 from './Referral Guide subforms/section11'
import * as section12 from './Referral Guide subforms/section12'
import * as section13 from './Referral Guide subforms/section13'

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

        data = []
        let i = 0
        do{
            let d = {key: i}
            for(let col in property.columns){
                let input = property.columns[col].inputType
                if(property.columns[col].editable){
                    input = input === "boolean"? false : ""
                    d[property.columns[col].dataIndex] = input
                } else{
                    d[property.columns[col].dataIndex] = {header: property.columns[col].colheader[i]}

                    try{
                        d[property.columns[col].dataIndex]['hover'] = property.columns[col].hover[i]
                        d[property.columns[col].dataIndex]['hoverTitle'] = property.columns[col].hoverTitle[i]
                    } catch {}
                }
                
            }
            d['enabled'] = !property.needCheckBox === true

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
    "WATI Assistive Technology Consideration Guide":{schema: WATI_Consideration_Guide.schema, formData:createEmptyData(WATI_Consideration_Guide.schema)},
    "WATI Assistive Technology Assessment Directions/Procedure Guide":{schema: Assistive_Procedure_Guide.schema, formData:createEmptyData(Assistive_Procedure_Guide.schema)},
    "Referral/Question Identification Guide":{schema: Referral_Guide.schema, formData:createEmptyData(Referral_Guide.schema)},
    // "WATI Student Information Guide":{schema: [], formData:[]},
    "Environmental Observation Guide":{schema: Environmental_Guide.schema, formData:createEmptyData(Environmental_Guide.schema)},
    "Environmental Observation Summary":{schema: Environmental_Summary.schema, formData:createEmptyData(Environmental_Summary.schema)},
    "WATI Assistive Technology Decision Making Guide":{schema: WATI_Making_Guide.schema, formData:createEmptyData(WATI_Making_Guide.schema)},
    "WATI Assistive Technology Assessment Technology Checklist":{schema: WATI_Technology_Checklist.schema, formData:createEmptyData(WATI_Technology_Checklist.schema)},
    "WATI Assistive Technology Trial Use Guide":{schema: WATI_Use_Guide.schema, formData:createEmptyData(WATI_Use_Guide.schema)},
    "WATI Assistive Technology Trial Use Summary":{schema: WATI_Use_Summary.schema, formData:createEmptyData(WATI_Use_Summary.schema)},
}

export const referral_Guide_Sections = {
    "Section 1":{schema: section1.schema, formData:createEmptyData(section1.schema)},
    "Section 2":{schema: section2.schema, formData:createEmptyData(section2.schema)},
    "Section 3":{schema: section3.schema, formData:createEmptyData(section3.schema)},
    "Section 4":{schema: section4.schema, formData:createEmptyData(section4.schema)},
    "Section 5":{schema: section5.schema, formData:createEmptyData(section5.schema)},
    "Section 6":{schema: section6.schema, formData:createEmptyData(section6.schema)},
    "Section 7":{schema: section7.schema, formData:createEmptyData(section7.schema)},
    "Section 8":{schema: section8.schema, formData:createEmptyData(section8.schema)},
    "Section 9":{schema: section9.schema, formData:createEmptyData(section9.schema)},
    "Section 10":{schema: section10.schema, formData:createEmptyData(section10.schema)},
    "Section 11":{schema: section11.schema, formData:createEmptyData(section11.schema)},
    "Section 12":{schema: section12.schema, formData:createEmptyData(section12.schema)},
    "Section 13":{schema: section13.schema, formData:createEmptyData(section13.schema)},
}