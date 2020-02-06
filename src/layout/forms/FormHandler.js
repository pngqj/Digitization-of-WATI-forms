import * as exampleForm from "./exampleForm"
import * as WATI_Consideration_Guide from "./WATI Consideration Guide"
import * as Referral_Guide from "./Referral Guide"

export const form_names = {
    "example form": {schema: exampleForm.schema, formData:exampleForm.formData},
    "WATI Assistive Technology Consideration Guide":{schema: WATI_Consideration_Guide.schema, formData:WATI_Consideration_Guide.formData},
    "WATI Assistive Technology Assessment Directions/Procedure Guide":{schema: [], formData:[]},
    "Referral/Question Identification Guide":{schema: Referral_Guide.schema, formData:Referral_Guide.formData},
    "WAT Student Infomation Guide":{schema: [], formData:[]},
    "Environmental Observation Guide":{schema: [], formData:[]},
    "Environmental Observation Summary":{schema: [], formData:[]},
    "WATI Assistive Technology Decision Making Guide":{schema: [], formData:[]},
    "WATI Assistive Technology Assessment Technology Checklist":{schema: [], formData:[]},
    "WATI Assistive Technology Trial Use Guide":{schema: [], formData:[]},
    "WATI Assistive Technology Trial Use Summary":{schema: [], formData:[]},
}