

export const schema= [
    {
        title:"Current Seating and Positioning of Student (Check all that apply.)", 
        "properties": 
        {
            "Sits in regular chair w/ feet on floor":{type:"boolean",span:24},
            "Sits in regular chair w/ pelvic belt or foot rest":{type:"boolean",span:24},
            "Sits in adapted chair":{type:"boolean",span:24},
            "Sits in seat with adaptive cushion that allows needed movement":{type:"boolean",span:24},
            "Sits in wheelchair part of day":{type:"boolean",span:24},
            "Sits comfortably in wheelchair most of day":{type:"boolean",span:24},
            "Wheelchair in process of being adapted to fit":{type:"boolean",span:24},
            "Spends part of day out of chair due to prescribed positions":{type:"boolean",span:24},
            "Spends part of day out of chair due to discomfort":{type:"boolean",span:24},
            "Enjoys many positions throughout the day, based on activity":{type:"boolean",span:24},
            "Has few opportunities for other positions":{type:"boolean",span:24},
            "Uses regular desk":{type:"boolean",span:24},
            "Uses desk with height adjusted":{type:"boolean",span:24},
            "Uses tray on wheelchair for desktop":{type:"boolean",span:24},
            "Uses adapted table":{type:"boolean",span:24},
        }
    },
    {
        title:"Description of Seating (Check all that apply.)",
        "properties": 
        {
            "Seating provides trunk stability":{type:"boolean",span:24},
            "Seating allows feet to be on floor or foot rest":{type:"boolean",span:24},
            "Seating facilitates readiness to perform task":{type:"boolean",span:24},
            "There are questions or concerns about the student's seating ":{type:"boolean",span:24},
            // "Student dislikes some positions":
            // {type:"switch", "properties":
            //     {
            //         question1: {type: "paragraph", span: 24, description: "Student dislikes some positions, often indicates discomfort in the following positions"},
            //         _:{type:"string",span:24, long:true},
            //         question2: {type: "paragraph", span: 24, description: "How is the discomfort communicated?"},
            //         _2:{type:"string",span:24, long:true},
            //     }
            // },
            "Student dislikes some positions, often indicates discomfort in the following positions":
                {"type":"boolean string", span:24, multiple:["How is the discomfort communicated?", ""], multiLength: [0.575,0.425]},
            "Student has difficulty using table or desk":{type:"boolean",span:24},
            "There are concerns or questions about current wheelchair. ":{type:"boolean",span:24},
            // question1: {type: "paragraph", span: 24, description: "Student has difficulty achieving and maintaining head control, best position for head control is"},
            // _:{type:"string",span:24, long:true},
            // "Where are their hips?":{type:"string",span:24, long:true},
            "Student has difficulty achieving and maintaining head control, best position for head control is":
                {"type":"boolean string", span:24, multiple:["Where are their hips?", ""], multiLength: [0.575,0.425]},

            // "Number of minutes student can maintain head control in this position":{"type":"string",span:24, "integer":true},
            "Can maintain head control for":{"type":"boolean string", span:24, after:"minutes in this position."}
        }
    },
    {
        title:"Summary of Student’s Abilities and Concerns Related to Seating and Positioning", 
        "properties": 
        {
            _:{type:"string",span:24, long:true},
        }
    }
]

export const formData =[
    {
        key:0,
        data:
        [
            false,false,false,false,false,
            false,false,false,false,false,
            false,false,false,false,true,
        ]
    },
    {
        key:1,
        data:
        [
            false,false,false,false,[null,"",null,""],false,false,null,"","",""
        ]
    },
    {
        key:2,
        data:
        [
            ""
        ]
    }
]