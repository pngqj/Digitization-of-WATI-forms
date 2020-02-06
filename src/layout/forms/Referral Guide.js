import moment from 'moment';
import * as constants from '../../Constants'


export const schema = [
    {
        type:"object",
        title:"Student's Particulars", 
        "properties": 
        {
            "Student's Name":{"type":"string", span:12}, "Date Of Birth":{type:"date", span:6}, "Age":{"type":"integer",span:6}, 
            "School":{"type":"string", span:12}, "Grade":{"type":"string", span:12}, 
            "School Contact Person":{"type":"string", span:12}, "Phone":{"type":"integer",span:12}, 
            "Person Completing Guide":{"type":"string", span:12},"Guide Completion Date":{type:"date", span:12}, 
            "Parent(s) Name":{"type":"string", span:15},"Parent(s) Phone":{"type":"integer",span:9}, 
            "Address":{"type":"string", span:24}, 
            "Student's Primary Language":{"type":"string", span:12},"Family's Primary Language":{"type":"string", span:12}
        }
    },
    {
        type:"object",
        title:"Disability", 
        "properties": 
        {
            "Speech/Language":{type:"boolean",span:10}, "Significant Development Delay":{type:"boolean",span:10},
            "Specific Learning Disability":{type:"boolean",span:10}, "Cognitive Disbility":{type:"boolean",span:10}, 
            "Other Health Impairment":{type:"boolean",span:10}, "Hearing Impaierment":{type:"boolean",span:10},
        }
    }
]

// export const formData = [
//     {
//         key:0,
//         data:
//         [
//             "test_name", moment('01/01/2019', constants.dateFormat), 12, "xxx primary school", "P3",
//             "contact_name", 6543210, "complete_name", moment('01/01/2020', constants.dateFormat),
//             "parent_name", 1234567, "random_address", "English", "Chinese"
//         ]
//     },
//     {
//         key:1,
//         data:
//         [
//             true,true,true,false,false,false,null
//         ]
//     }
// ]

export const formData = [
    {
        key:0,
        data:
        [
            "", "", "", "", "",
            "", "", "", "",
            "", "", "", "", ""
        ]
    },
    {
        key:1,
        data:
        [
            false,false,false,false,false,false,null
        ]
    }
]

