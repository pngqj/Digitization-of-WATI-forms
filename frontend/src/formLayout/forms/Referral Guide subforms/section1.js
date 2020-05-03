

export const schema= [
    {
        title:"Current Fine Motor Abilities", 
        "properties": 
        {
            paragraph1: {type: "paragraph", span: 24, description: "Observe the student using paper and pencil, typewriter, computer, switch, etc. Look at the movements as well as the activities and situations. Does the student have voluntary, isolated, controlled movements using the following? (Check all that apply.)"},
            "Left hand":{type:"boolean",span:8},"Right hand":{type:"boolean",span:8},"Eye(s)":{type:"boolean",span:8},
            "Left arm":{type:"boolean",span:8},"Right arm":{type:"boolean",span:8},"Head":{type:"boolean",span:8},
            "Left leg":{type:"boolean",span:8},"Right leg":{type:"boolean",span:8},"Mouth":{type:"boolean",span:8},
            "Left foot":{type:"boolean",span:8},"Right foot":{type:"boolean",span:8},"Tongue":{type:"boolean",span:8},
            "Finger(s) ":{type:"boolean",span:8},"Eyebrows":{type:"boolean",span:8},
            "Other":{"type":"boolean string", span:24},
            question1: {type: "paragraph", span: 24, description: "Describe briefly the activities/situations observed"},
            _:{type:"string",span:24, long:true},
        }
    },
    {
        title:"Range of Motion", 
        "properties": 
        {
            "Student has specific limitations to range":{"type":"boolean string", span:24, is_TextArea:true, paragraph:"Describe the specific range in which the student has the most motor control"},
        }
    },
    {
        title:"Abnormal Reflexes and Muscle Tone", 
        "properties": 
        {
            "Student has abnormal reflexes or abnormal muscle tone":{"type":"boolean string", span:24, is_TextArea:true, paragraph:"Describe briefly any abnormal reflex patterns or patterns of low or high muscle tone that may interfere with the student’s voluntary motor control"},
        }
    },
    {
        title:"Accuracy", 
        "properties": 
        {
            "Student has difficulty with accuracy":{"type":"boolean string", span:24, is_TextArea:true, paragraph:"Describe how accurate, reliable and consistent the student is in performing a particular fine motor task"},
        }
    },
    {
        title:"Fatigue", 
        "properties": 
        {
            "Student fatigues easily":{"type":"boolean string", span:24, is_TextArea:true, paragraph:"Describe how easily the student becomes fatigued."},
        }
    },
    {
        title:"Assisted Direct Selection", 
        "properties": 
        {
            "Keyguard":{type:"boolean",span:12},"Head pointer/head stick":{type:"boolean",span:12},
            "Pointers, hand grips, splints etc.":{type:"boolean",span:12},"Light beam/laser":{type:"boolean",span:12},
            "Other":{"type":"boolean string", span:24},
            question1: {type: "paragraph", span: 24, description: "Describe which seemed to work the best and why"},
            _:{type:"string",span:24, long:true},
        }
    },
    {
        title:"Size of Grid Student Is Able to Access", 
        "properties": 
        {
            "What is the smallest square the student can accurately access?":{type:"select", span:13, options:["1\"","2\"","3\"","4\""]},
            paragraph1: {type: "paragraph", span: 24, description: "What is the optimal size grid?"},
            "table 1":{"type":"table", span:24, title: " ", needCheckBox:false, needAddButton:false, 
                      "columns": [
                            {
                                title: 'Size of square',
                                dataIndex: 'size_of_square',
                                editable: true,
                                inputType: "number"
                            },
                            {
                                title: 'Number of squares across',
                                dataIndex: 'number_of_squares_across',
                                editable: true,
                                inputType: "number"
                            },
                            {
                                title: 'Number of squares down',
                                dataIndex: 'number_of_squares_down',
                                editable: true,
                                inputType: "number"
                            }
                      ]
            }
        }
    },
    {
        title:"Scanning", 
        "properties": 
        {
            "If student cannot direct select, does the student use scanning?": 
            {type:"switch", "properties":
                {
                    "Step":{type:"boolean",span:12},"Automatic":{type:"boolean",span:12},"Inverse":{type:"boolean",span:12},
                    "Other":{"type":"boolean string", span:24}, 
                }
            },
            "Preferred control site (body site)":{"type":"string", span:24}, 
            "Other possible control sites":{"type":"string", span:24}, 
        }
    },
    {
        title:"Type of Switch", 
        "properties": 
        {
            "Touch (jellybean)":{type:"boolean",span:6},"Light touch":{type:"boolean",span:6},"Wobble":{type:"boolean",span:6},"Rocker":{type:"boolean",span:6},
            "Joystick":{type:"boolean",span:6},"Lever":{type:"boolean",span:6},"Head switch":{type:"boolean",span:6}," Mercury (tilt)":{type:"boolean",span:6},
            "Arm slot":{type:"boolean",span:6},"Eye brow":{type:"boolean",span:6},"Tongue":{type:"boolean",span:6},"Sip/puff":{type:"boolean",span:6},
            "Tread":{type:"boolean",span:6},"Other":{"type":"boolean string", span:24}, 
            question1: {type: "paragraph", span: 24, description: "Summary of Student’s Abilities and Concerns Related to Computer/Device Access"},
            _:{type:"string",span:24, long:true},

        }
    },
]