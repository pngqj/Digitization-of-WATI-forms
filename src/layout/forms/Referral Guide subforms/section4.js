

export const schema= [
    {
        title:"Student’s Present Means of Communication", 
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
            "Other":{"type":"boolean string", span:24, "integer":true},
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
                    dataIndex: 'type',
                    editable: false,
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
            "":{type:"boolean",span:8},
        }
    },
    {
        title:"Current Level of Expressive Language", 
        "properties": 
        {
            "":{type:"boolean",span:8},
        }
    },
    {
        title:"Communication Interaction Skills", 
        "properties": 
        {
            "":{type:"boolean",span:8},
        }
    },
    {
        title:"Student’s Needs Related to Devices/Systems (Check all that apply.)", 
        "properties": 
        {
            "":{type:"boolean",span:8},
        }
    },
    {
        title:"Pre-Reading and Reading Skills Related to Communication (Check all that apply.)", 
        "properties": 
        {
            "":{type:"boolean",span:8},
        }
    },
    {
        title:"Visual Abilities Related to Communication (Check all that apply.)", 
        "properties": 
        {
            "":{type:"boolean",span:8},
        }
    },
    {
        title:"", 
        "properties": 
        {
            "":{type:"boolean",span:8},
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
            true
        ]
    },
    {
        key:3,
        data:
        [
            true
        ]
    },
    {
        key:4,
        data:
        [
            true
        ]
    },
    {
        key:5,
        data:
        [
            true
        ]
    },
    {
        key:6,
        data:
        [
            true
        ]
    },
    {
        key:7,
        data:
        [
            true
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