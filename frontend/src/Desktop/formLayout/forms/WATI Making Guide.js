

export const schema = [
    {
        title: "", 
        "properties": 
        {
            "Referral Question":{"type":"string", span:24}, 
            
            
        }
    },
    {
        title: "Problem Identification", 
        "properties": 
        {
            "table 1":{"type":"table", span:24, title: " ", 
                      "columns": [
                            {
                                title: 'Topic',
                                dataIndex: 'colheader',
                                editable: false,
                                width:"20%",
                                colheader: ["Student’s Abilities/Difficulties", "Environmental Considerations", "Tasks", "Reframed Question", "Solution Generation", "Solution Selection", "Implementation Plan", "Follow-Up Plan"],
                                hover:[
                                    "Writing/Use of Hands, Communication, Reading/Academics, Mobility, Vision, Hearing, Behavior, Other",
                                    "e.g. Classroom, Playground, Lunch Room, Home, etc.\nIn Each: Technology Equipment Available, Room Arrangement, Lighting, Sound, Activities, etc. ",
                                    "e.g. Produce legible written material, Produce audible speech, Read text, Complete math problems, Participate in recreation/leisure, Move independently in the school, environment ",
                                    "i.e. Specific task identified for solution generation ",
                                    "Brainstorming Only, No Decision ", 
                                    "Discuss & Select Idea from Solution Generation",
                                    "AT Trials/Services Needed: Date, Length, Person Responsible ",
                                    "Who & When. Set specific date now."
                                ],
                                hoverTitle:["Hint","Hint","Hint","Hint","Hint","Hint","Hint","Hint"]
                            },
                            {
                                title: 'Description',
                                dataIndex: 'description',
                                editable: true
                            },
                      ]
            },
        }
    },
]