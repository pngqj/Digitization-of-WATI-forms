

export const schema= [
    {
        title:"Student’s Present Means of Communication (Check all that are used)",
        "properties": 
        {
            "Changes in breathing patterns":{type:"boolean",span:8},"Body position changes":{type:"boolean",span:8},"Eye-gaze/eye movement":{type:"boolean",span:8},
            "Facial expressions":{type:"boolean",span:8},"Gestures":{type:"boolean",span:8},"Pointing":{type:"boolean",span:8},
            "Sign language approximations":{type:"boolean",span:24},
            "Sign language": 
            {type:"switch", "properties":
                {
                    "Type":{"type":"string", span:24}, 
                    "# signs":{"type":"string", span:8, "integer":true},  
                    "# combinations":{"type":"string", span:8, "integer":true},  
                    "# signs in a combination":{"type":"string", span:8, "integer":true},  
                }
            },
            "Vocalizations, list examples":{"type":"boolean string", span:24},
            "Vowels, vowel combinations, list examples":{"type":"boolean string", span:24},
            "Single words, list examples & approx. #":{"type":"boolean string", span:24, "integer":true},
            "Reliable no":{type:"boolean",span:12},"Reliable yes":{type:"boolean",span:12},
            "2-word utterances":{type:"boolean",span:12},"3-word utterances":{type:"boolean",span:12},
            "Semi intelligible speech, estimate % intelligible":{"type":"boolean string", span:24, "integer":true},
            "Communication board":{type:"boolean",span:8},
            "Tangibles":{type:"boolean",span:8},
            "Pictures":{type:"boolean",span:8},
            "Combination pictures/words":{type:"boolean",span:8},
            "Words":{type:"boolean",span:16},
            "Voice output AC device (name of device)":{"type":"boolean string", span:24, "integer":true},
            "Intelligible speech":{type:"boolean",span:12},"Writing":{type:"boolean",span:12},
            "Other":{"type":"boolean string", span:24},
            "Primary method of communication student uses":{"type":"string", span:24},
        }
    },
    {
        title:"Those Who Understand Student’s Communication Attempts (Check best descriptor.)", 
        "properties": 
        {
            "table 1":{"type":"table", span:24, title: " ", needCheckBox:false, needAddButton:false, 
            "columns": [
                {
                    title: '',
                    dataIndex: 'colheader',
                    editable: false,
                    colheader: ["Strangers", "Teachers/therapists", "Peers", "Siblings", "Parent/Guardian"]
                },
                {
                    title: 'Most of the time',
                    dataIndex: 'most_of_the_time',
                    editable: true,
                    inputType: "boolean"
                },
                {
                    title: 'Part of the time',
                    dataIndex: 'part_of_the_time',
                    editable: true,
                    inputType: "boolean"
                },
                {
                    title: 'Rarely',
                    dataIndex: 'rarely',
                    editable: true,
                    inputType: "boolean"
                },
                {
                    title: 'Not Applicable',
                    dataIndex: 'not_applicable',
                    editable: true,
                    inputType: "boolean"
                },
            ]
        }
        }
    },
    {
        title:"Current Level of Receptive Language", 
        "properties": 
        {
            "Age approximation":{type:"string",span:8, integer:true},
            "If formal tests used, name and scores": {type:"switch", "properties":
                {
                    "name":{type:"string",span:16},
                    "score":{type:"string",span:8},
                }
            },
            "If formal testing is not used, please give an approximate age or developmental level of functioning. Explain your rationale for this estimate.": 
            {type:"switch", "properties":
                {
                    "name":{type:"string",span:24, long:true},
                }
            },            
        }
    },
    {
        title:"Current Level of Expressive Language", 
        "properties": 
        {
            "Age approximation":{type:"string",span:8, integer:true},
            "If formal tests used, name and scores": {type:"switch", "properties":
                {
                    "name":{type:"string",span:16},
                    "score":{type:"string",span:8},
                }
            },
            "If formal testing is not used, please give an approximate age or developmental level of functioning. Explain your rationale for this estimate.": 
            {type:"switch", "properties":
                {
                    "name":{type:"string",span:24, long:true},
                }
            },            
        }
    },
    {
        title:"Communication Interaction Skills", 
        "properties": 
        {
            "Desires to communicate":{type:"select", span:8, options:["Yes", "No"]},
            paragraph1: {type: "paragraph", span: 24, description: "To indicate yes and no the student"},
            "Shakes head ":{type:"boolean",span:6},"Signs":{type:"boolean",span:4},"Vocalizes":{type:"boolean",span:4},
            "Gestures":{type:"boolean",span:4},"Eye gazes":{type:"boolean",span:6},"Points to board":{type:"boolean",span:6},
            "Uses word approximations":{type:"boolean",span:8},"Does not respond consistently":{type:"boolean",span:10},
            "Can a person unfamiliar with the student understand the response?":{type:"select", span:18, options:["Yes", "No"]},
            "table 1":{"type":"table", span:24, title: " ", needCheckBox:false, needAddButton:false, 
            "columns": [
                {
                    title: '',
                    dataIndex: 'colheader',
                    editable: false,
                    colheader: [
                        "Turns toward speaker", "Interacts with peers", 
                        "Aware of listener’s attention", 
                        "Initiates interaction",
                        "Asks questions",
                        "Responds to communication interaction", 
                        "Requests clarification from communication partner", 
                        "Repairs communication breakdown",
                        "Requires frequent verbal prompts",
                        "Requires frequent physical prompts",
                        "Maintains communication exchange"
                    ]
                },
                {
                    title: 'Always',
                    dataIndex: 'always',
                    editable: true,
                    inputType: "boolean"
                },
                {
                    title: 'Frequently',
                    dataIndex: 'frequently',
                    editable: true,
                    inputType: "boolean"
                },
                {
                    title: 'Occasionally',
                    dataIndex: 'occasionally',
                    editable: true,
                    inputType: "boolean"
                },
                {
                    title: 'Seldom',
                    dataIndex: 'seldom',
                    editable: true,
                    inputType: "boolean"
                },
                {
                    title: 'Never',
                    dataIndex: 'never',
                    editable: true,
                    inputType: "boolean"
                },
            ]
        },
        question1: {type: "paragraph", span: 24, description: "Describe techniques student uses for repair (e.g. keeps trying, changes message, points to first letter etc.)."},
        _:{type:"string",span:24, long:true},
        }
    },
    {
        title:"Student’s Needs Related to Devices/Systems (Check all that apply.)", 
        "properties": 
        {
            "Walks":{type:"boolean",span:9},"Uses wheelchair":{type:"boolean",span:7},"Carries device under 2 pounds":{type:"boolean",span:8},
            "Drops or throws things frequently":{type:"boolean",span:9},"Needs digitized (human) speech":{type:"boolean",span:15},
            "Needs device w/large number of words and phrases":{type:"boolean",span:24},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"Pre-Reading and Reading Skills Related to Communication (Check all that apply.)", 
        "properties": 
        {
            "Object/picture recognition":{type:"select", span:8.5, options:["Yes", "No"]},
            "Symbol recognition (tactile, Mayer-Johnson, Rebus, etc.)":{type:"select", span:15.5, options:["Yes", "No"]},
            "Auditory discrimination of sounds ":{type:"select", span:12, options:["Yes", "No"]},
            "Auditory discrimination of words, phrases":{type:"select", span:12, options:["Yes", "No"]},
            "Selecting initial letter of word":{type:"select", span:12, options:["Yes", "No"]},
            "Following simple directions":{type:"select", span:12, options:["Yes", "No"]},
            "Sight word recognition":{type:"select", span:8, options:["Yes", "No"]},
            "Putting two symbols or words together to express an idea":{type:"select", span:16, options:["Yes", "No"]},
        }
    },
    {
        title:"Visual Abilities Related to Communication (Check all that apply.)", 
        "properties": 
        {
            "Maintains fixation on stationary object":{type:"boolean",span:12},"Looks to right and left without moving head":{type:"boolean",span:12},
            "Scans line of symbols left to right":{type:"boolean",span:12},"Scans matrix of symbols in a grid":{type:"boolean",span:12},
            "Visually recognizes people":{type:"boolean",span:12},"Visually recognizes common objects":{type:"boolean",span:12},
            "Visually recognizes photographs":{type:"boolean",span:12},"Visually recognizes symbols or pictures":{type:"boolean",span:12},
            "Needs additional space around symbol":{type:"boolean",span:12},"Visually shifts horizontally":{type:"boolean",span:12},
            "Visually shifts vertically":{type:"boolean",span:12},"Recognizes line drawings":{type:"boolean",span:12},
            "Is a specific type (brand) of symbols or pictures preferred?":{"type":"string", span:24}, 
            "What size symbols or pictures are preferred?":{"type":"string", span:24}, 
            "What line thickness of symbols is preferred? (inches)":{"type":"string", span:24, integer:true},
            paragraph1: {type: "paragraph", span: 24, description: "Does student seem to do better with black on white, or white on black, or a specific color combination for figure/ground discrimination?"},
            "":{type:"string",span:24},
        }
    },
    {
        title:"", 
        "properties": 
        {
            paragraph1: {type: "paragraph", span: 24, description: "Explain anything else you think is significant about the responses the student currently uses or his/her need for augmenting communication"},
            _:{type:"string",span:24, long:true},
        }
    },
]

export const formData =[
    {
        key:0,
        data:
        [
            false,false,false,false,false,false,false,
            ["","","",""],
            "","","",
            false,false,false,false,
            "",
            false,false,false,false,false,
            "",
            false,false,""
        ]
    },
    {
        key:1,
        data:
        [
            [
                {
                    key: 0,
                    'type':"Strangers",
                    'most_of_the_time':false,
                    'part_of_the_time':false,
                    'rarely':false,
                    'not_applicable':false,
                },
                {
                    key: 1,
                    'type':"Teachers/therapists",
                    'most_of_the_time':false,
                    'part_of_the_time':false,
                    'rarely':false,
                    'not_applicable':false,
                },
                {
                    key: 2,
                    'type':"Peers",
                    'most_of_the_time':false,
                    'part_of_the_time':false,
                    'rarely':false,
                    'not_applicable':false,
                },
                {
                    key: 3,
                    'type':"Siblings",
                    'most_of_the_time':false,
                    'part_of_the_time':false,
                    'rarely':false,
                    'not_applicable':false,
                },
                {
                    key: 4,
                    'type':"Parent/Guardian",
                    'most_of_the_time':false,
                    'part_of_the_time':false,
                    'rarely':false,
                    'not_applicable':false,
                },
                
            ]
        ]
    },
    {
        key:2,
        data:
        [
            "",["", ""], [""]
        ]
    },
    {
        key:3,
        data:
        [
            "",["", ""], [""]
        ]
    },
    {
        key:4,
        data:
        [
            "",null,false,false,false,false,false,false,false,false,"",
            [
                {
                    key: 0,
                    'type':"Turns toward speaker",
                    'always':false,
                    'frequently':false,
                    'occasionally':false,
                    'seldom':false,
                    'never':false,
                },
                {
                    key: 1,
                    'type':"Interacts with peers",
                    'always':false,
                    'frequently':false,
                    'occasionally':false,
                    'seldom':false,
                    'never':false,
                },
                {
                    key: 2,
                    'type':"Aware of listener’s attention",
                    'always':false,
                    'frequently':false,
                    'occasionally':false,
                    'seldom':false,
                    'never':false,
                },
                {
                    key: 3,
                    'type':"Initiates interaction",
                    'always':false,
                    'frequently':false,
                    'occasionally':false,
                    'seldom':false,
                    'never':false,
                },
                {
                    key: 4,
                    'type':"Asks questions",
                    'always':false,
                    'frequently':false,
                    'occasionally':false,
                    'seldom':false,
                    'never':false,
                },
                {
                    key: 5,
                    'type':"Responds to communication interaction",
                    'always':false,
                    'frequently':false,
                    'occasionally':false,
                    'seldom':false,
                    'never':false,
                },
                {
                    key: 6,
                    'type':"Requests clarification from communication partner",
                    'always':false,
                    'frequently':false,
                    'occasionally':false,
                    'seldom':false,
                    'never':false,
                },
                {
                    key: 7,
                    'type':"Repairs communication breakdown",
                    'always':false,
                    'frequently':false,
                    'occasionally':false,
                    'seldom':false,
                    'never':false,
                },
                {
                    key: 8,
                    'type':"Requires frequent verbal prompts",
                    'always':false,
                    'frequently':false,
                    'occasionally':false,
                    'seldom':false,
                    'never':false,
                },
                {
                    key: 9,
                    'type':"Requires frequent physical prompts",
                    'always':false,
                    'frequently':false,
                    'occasionally':false,
                    'seldom':false,
                    'never':false,
                },
                {
                    key: 10,
                    'type':"Maintains communication exchange",
                    'always':false,
                    'frequently':false,
                    'occasionally':false,
                    'seldom':false,
                    'never':false,
                },
                {
                    key: 11,
                    'type':"Maintains communication exchange",
                    'always':false,
                    'frequently':false,
                    'occasionally':false,
                    'seldom':false,
                    'never':false,
                },
            ],
            null, 
        ]
    },
    {
        key:5,
        data:
        [
            false,false,false,false,false,false,""
        ]
    },
    {
        key:6,
        data:
        [
            "","","","","","","","",
        ]
    },
    {
        key:7,
        data:
        [
            false,false,false,false,false,false,false,false,false,false,false,false,
            "","","",null,""
        ]
    },
    {
        key:8,
        data:
        [
            null, ""
        ]
    },
]