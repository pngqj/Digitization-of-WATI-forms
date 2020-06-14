import moment from 'moment';
import * as constants from '../../../Constants'
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

const main_schema = [
    {
        title:"Student's Particulars", 
        "properties": 
        {
            "Student's Name":{"type":"string", span:12}, "Date Of Birth":{type:"date", span:6}, "Age":{"type":"string",span:6, "integer":true}, 
            "School":{"type":"string", span:12}, "Grade":{"type":"string", span:12}, 
            "School Contact Person":{"type":"string", span:12}, "Phone":{"type":"string",span:12, "integer":true}, 
            "Person Completing Guide":{"type":"string", span:12},"Guide Completion Date":{type:"date", span:12}, 
            "Parent(s) Name":{"type":"string", span:15},"Parent(s) Phone":{"type":"string",span:9, "integer":true}, 
            "Address":{"type":"string", span:24}, 
            "Student's Primary Language":{"type":"string", span:12},"Family's Primary Language":{"type":"string", span:12}
        }
    },
    {
        title:"Disability", 
        "properties": 
        {
            "Speech/Language":{type:"boolean",span:8}, "Significant Development Delay":{type:"boolean",span:8},
            "Specific Learning Disability":{type:"boolean",span:8}, "Cognitive Disbility":{type:"boolean",span:8}, 
            "Other Health Impairment":{type:"boolean",span:8}, "Hearing Impaierment":{type:"boolean",span:8},
        }
    },
    {
        title:"Current Age Group", 
        "properties": 
        {
            "Birth to Three":{type:"boolean",span:8}, "Early Childhood":{type:"boolean",span:8}, 
            "Elementary":{type:"boolean",span:8}, "Middle School":{type:"boolean",span:8}, 
            "Secondary":{type:"boolean",span:8}, 
        }
    },
    {
        title:"Classroom Setting", 
        "properties": 
        {
            "Regular Education Classroom":{type:"boolean",span:8}, "Resource Room":{type:"boolean",span:8}, 
            "Self-contained":{type:"boolean",span:8}, "Home":{type:"boolean",span:8}, 
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"Current Service Providers", 
        "properties": 
        {
            "Occupational Therapy":{type:"boolean",span:8}, "Physical Therapy":{type:"boolean",span:8}, 
            "Speech Language":{type:"boolean",span:8}, 
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"Medical Considerations (Check all that apply.)", 
        "properties": 
        {
            "History of seizures":{type:"boolean",span:12}, "Fatigues easily":{type:"boolean",span:12}, 
            "Has degenerative medical condition":{type:"boolean",span:12}, "Has frequent pain":{type:"boolean",span:12}, 
            "Has multiple health problems":{type:"boolean",span:12}, "Has frequent upper respiratory infections":{type:"boolean",span:12}, 
            "Has frequent ear infections":{type:"boolean",span:12}, "Has digestive problems":{type:"boolean",span:12}, 
            "Has allergies to":{"type":"boolean string", span:24},
            "Currently taking medication for":{"type":"boolean string", span:24},
            "Other – Describe briefly":{"type":"boolean string", span:24},
            "Other Issues of Concern":{"type":"string", span:24}
        }
    },
    {
        title:"Assistive Technology Currently Used (Check all that apply.) ", 
        "properties": 
        {
            "None":{type:"boolean",span:12},"Low Tech Writing Aids":{type:"boolean",span:12},
            "Manual Communication Board":{type:"boolean",span:12},"Augmentative Communication System":{type:"boolean",span:12},
            "Low Tech Vision Aids":{type:"boolean",span:12},"Amplification System":{type:"boolean",span:12},
            "Environmental Control Unit/EADL":{type:"boolean",span:12},"Manual Wheelchair":{type:"boolean",span:12},
            "Power Wheelchair":{type:"boolean",span:12},
            "Voice Recognition":{type:"boolean",span:12},"Word Prediction":{type:"boolean",span:12},

            "Computer – Type (platform)":{"type":"boolean string", span:24},
            "Adaptive Input - Describe":{"type":"boolean string", span:24},
            "Adaptive Output - Describe":{"type":"boolean string", span:24},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"Assistive Technology Tried", 
        "properties": 
        {
            "table 1":{"type":"table", span:24, title: " ", needCheckBox:false, needAddButton:true, 
                      "columns": [
                            {
                                title: 'Assistive Technology',
                                dataIndex: 'assistive_technology',
                                width:"10%",
                                editable: true,
                            },
                            {
                                title: 'Number of Trial(s) ',
                                dataIndex: 'number_of_trails',
                                editable: true,
                                inputType: "number"
                            },
                            {
                                title: 'Dates of Trial(s) ',
                                dataIndex: 'date_of_trails',
                                editable: true,
                                inputType: "date"
                            },
                            {
                                title: 'Outcome',
                                dataIndex: 'outcome',
                                editable: true,
                            }
                      ]
            },
        }
    },
    {
        title:"REFERRAL QUESTION", 
        "properties": 
        {
            question1: {type: "paragraph", span: 24, description: "What task(s) does the student need to do that is currently difficult or impossible, and for which assistive technology may be an option?"},
            _:{type:"string",span:24, long:true},
            question2: {type: "paragraph", span: 24, description: "Based on the referral question, select the sections of the Student Information Guide to be completed. (Check all that apply.)"},
            "Section 1 Fine Motor Related to Computer or Device Access":{type:"boolean section",span:12, section:1},
            "Section 8 Recreation and Leisure":{type:"boolean section",span:12, section:8},
            "Section 2 Motor Aspects of Writing":{type:"boolean section",span:12, section:2},
            "Section 9 Seating and Positioning":{type:"boolean section",span:12, section:9},
            "Section 3 Composing Written Material":{type:"boolean section",span:12, section:3},
            "Section 10 Mobility":{type:"boolean section",span:12, section:10},
            "Section 4 Communication ":{type:"boolean section",span:12, section:4},
            "Section 11 Vision":{type:"boolean section",span:12, section:11},
            "Section 5 Reading":{type:"boolean section",span:12, section:5},
            "Section 12 Hearing":{type:"boolean section",span:12, section:12},
            "Section 6 Learning and Studying":{type:"boolean section",span:12, section:6},
            "Section 13 General":{type:"boolean section",span:12, section:13},
            "Section 7 Math": {type:"boolean section",span:12, section:7},


        }
    },
]

const addSectionNo = (schema, no) => {
    for(let i in schema){
        schema[i]['section'] = no
    }
    return schema
}

let schema1 = JSON.parse(JSON.stringify(section1.schema))
schema1 = addSectionNo(schema1, 1)
let schema2 = JSON.parse(JSON.stringify(section2.schema))
schema2 = addSectionNo(schema2, 2)
let schema3 = JSON.parse(JSON.stringify(section3.schema))
schema3 = addSectionNo(schema3, 3)
let schema4 = JSON.parse(JSON.stringify(section4.schema))
schema4 = addSectionNo(schema4, 4)
let schema5 = JSON.parse(JSON.stringify(section5.schema))
schema5 = addSectionNo(schema5, 5)
let schema6 = JSON.parse(JSON.stringify(section6.schema))
schema6 = addSectionNo(schema6, 6)
let schema7 = JSON.parse(JSON.stringify(section7.schema))
schema7 = addSectionNo(schema7, 7)
let schema8 = JSON.parse(JSON.stringify(section8.schema))
schema8 = addSectionNo(schema8, 8)
let schema9 = JSON.parse(JSON.stringify(section9.schema))
schema9 = addSectionNo(schema9, 9)
let schema10 = JSON.parse(JSON.stringify(section10.schema))
schema10 = addSectionNo(schema10, 10)
let schema11 = JSON.parse(JSON.stringify(section11.schema))
schema11 = addSectionNo(schema11, 11)
let schema12 = JSON.parse(JSON.stringify(section12.schema))
schema12 = addSectionNo(schema12, 12)
let schema13 = JSON.parse(JSON.stringify(section13.schema))
schema13 = addSectionNo(schema13, 13)


let temp_schema = main_schema
// temp_schema = temp_schema.concat([{section:1 ,heading:"Section 1: Fine Motor Related to Computer or Device Access"}]);
// temp_schema = temp_schema.concat(schema1);
// temp_schema = temp_schema.concat([{section:2 ,heading:"Section 2: Motor Aspects of Writing"}]);
// temp_schema = temp_schema.concat(schema2);
// temp_schema = temp_schema.concat([{section:3 ,heading:"Section 3: Composing Written Material"}]);
// temp_schema = temp_schema.concat(schema3);
// temp_schema = temp_schema.concat([{section:4 ,heading:"Section 4: Communication"}]);
// temp_schema = temp_schema.concat(schema4);
// temp_schema = temp_schema.concat([{section:5 ,heading:"Section 5: Reading"}]);
// temp_schema = temp_schema.concat(schema5);
// temp_schema = temp_schema.concat([{section:6 ,heading:"Section 6: Learning and Studying"}]);
// temp_schema = temp_schema.concat(schema6);
// temp_schema = temp_schema.concat([{section:7 ,heading:"Section 7: Math "}]);
// temp_schema = temp_schema.concat(schema7);
// temp_schema = temp_schema.concat([{section:8 ,heading:"Section 8: Recreation and Leisure"}]);
// temp_schema = temp_schema.concat(schema8);
// temp_schema = temp_schema.concat([{section:9 ,heading:"Section 9: Seating and Positioning"}]);
// temp_schema = temp_schema.concat(schema9);
// temp_schema = temp_schema.concat([{section:10 ,heading:"Section 10:  Mobility"}]);
// temp_schema = temp_schema.concat(schema10);
// temp_schema = temp_schema.concat([{section:11 ,heading:"Section 11:  Vision"}]);
// temp_schema = temp_schema.concat(schema11);
// temp_schema = temp_schema.concat([{section:12 ,heading:"Section 12:  Hearing"}]);
// temp_schema = temp_schema.concat(schema12);
// temp_schema = temp_schema.concat([{section:13 ,heading:"Section 13:  General"}]);
// temp_schema = temp_schema.concat(schema13);

export const schema = temp_schema 
