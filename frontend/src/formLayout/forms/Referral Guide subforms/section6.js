

export const schema= [
    {
        title:"Difficulties Student Has Learning New Material or Studying (Check all that apply.)", 
        "properties": 
        {
            "Remembering assignments":{type:"boolean",span:12},"Organizing information/notes":{type:"boolean",span:12},
            "Remembering steps of tasks or assignments":{type:"boolean",span:12},"Organizing materials for a report or paper":{type:"boolean",span:12},
            "Finding place in textbooks":{type:"boolean",span:12},"Turning in assignments":{type:"boolean",span:12},
            "Taking notes during lectures":{type:"boolean",span:12},"Reviewing notes from lectures":{type:"boolean",span:12},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"Assistive Technology Tried (Check all that apply.)", 
        "properties": 
        {
            "Print or picture schedule":{type:"boolean",span:24},
            "Low tech aids to find materials (e.g. index tabs, color coded folders)":{type:"boolean",span:24},
            "Highlighting text (e.g. markers, highlight tape, ruler)":{type:"boolean",span:24},
            "Recorded material":{type:"boolean",span:24},
            "Voice output reminders for assignments, steps of task, etc":{type:"boolean",span:24},
            "Electronic organizers":{type:"boolean",span:24},
            "Pagers/electronic reminders":{type:"boolean",span:24},
            "Hand held scanner to read words or phrases":{type:"boolean",span:24},
            "Software for manipulation of objects/concept development":{type:"boolean",span:24},
            "Software for organization of ideas and studying":{type:"boolean",span:24},
            "Palm computers":{type:"boolean",span:24},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"Strategies Used", 
        "properties": 
        {
            paragraph1: {type: "paragraph", span: 24, description: "Please describe any adaptations or strategies that have been used to help this student with learning and studying. "},
            _:{type:"string",span:24, long:true},
        }
    },
    {
        title:"", 
        "properties": 
        {
            paragraph1: {type: "paragraph", span: 24, description: "Summary of Student’s Abilities and Concerns in the Area of Learning and Studying"},
            _:{type:"string",span:24, long:true},
        }
    }
]

export const formData =[
    {
        key:1,
        data:
        [
            false,false,false,false,false,false,false,false,""
        ]
    },
    {
        key:2,
        data:
        [
            false,false,false,false,false,false,false,false,false,false,false,""
        ]
    },
    {
        key:3,
        data:
        [
            null, ""
        ]
    },
    {
        key:4,
        data:
        [
            null, ""
        ]
    },
]