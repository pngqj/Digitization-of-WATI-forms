

export const schema= [
    {
        title:"", 
        "properties": 
        {
            paragraph1: {type: "paragraph", span: 24, description: "A hearing specialist should be consulted to complete this section."},
        }
    },
    {
        title:"Audiological Information", 
        "properties": 
        {
            "Date of Last Vision Report":{type:"string",span:24},
            "Right Ear Hearing loss identified":{type:"select", span:12, options:["Mild", "Moderate", "Severe", "Profound"]},
            "Left Ear Hearing loss identified":{type:"select", span:12, options:["Mild", "Moderate", "Severe", "Profound"]},
            "Onset of hearing loss":{"type":"string", span:12},
            "Etiology":{"type":"string", span:12},
        }
    },
    {
        title:"Unaided Auditory Abilities (Check all that apply.)", 
        "properties": 
        {
            "Attends to sounds": 
            {type:"switch", "properties":
                {
                    "High pitch":{type:"boolean",span:6},
                    "Low pitch":{type:"boolean",span:6},
                    "Voice":{type:"boolean",span:6},
                    "Background noises":{type:"boolean",span:6},
                }
            },
        },
        "Discriminates environmental vs. non-environmental sounds ":{type:"boolean",span:24},
        "Turns toward sound":{type:"boolean",span:24},
        "Hears some speech sounds":{type:"boolean",span:24},
        "Understands synthesized speech":{type:"boolean",span:24},
    },
    {
        title:"Student’s Eye Contact and Attention to Communication", 
        "properties": 
        {
            "Check best descriptor":
            {type:"switch", "properties":
                {
                    "Poor":{type:"boolean",span:4},
                    "Inconsistent":{type:"boolean",span:4},
                    "Limited":{type:"boolean",span:4},
                    "Good":{type:"boolean",span:4},
                    "Excellent":{type:"boolean",span:4},
                }
            },
            
        }
    },
    {
        title:"Communication Used by Others", 
        "properties": 
        {
            paragraph1: {type: "paragraph", span: 24, description: "Indicate the form of communication generally used by others in each of the following environments. (Check all that apply.) "},
            "table 1":{"type":"table", span:24, title: " ", needCheckBox:true, needAddButton:false, 
            "columns": [
                {
                    title: '',
                    dataIndex: 'colheader',
                    editable: false,
                    colheader: ["Body language", "Tangible symbols", "Gestures", "Speech", "Cued speech", "Picture cues", "Written messages", "Signs and speech together", "Signed English", "Contact (Pidgin) sign language", "American Sign Language (ASL)", "Singpore Sign Language (SgSL)"]
                },
                {
                    title: 'School',
                    dataIndex: 'school',
                    editable: true,
                    inputType: "boolean"
                },
                {
                    title: 'Home',
                    dataIndex: 'home',
                    editable: true,
                    inputType: "boolean"
                },
                {
                    title: 'Community',
                    dataIndex: 'community',
                    editable: true,
                    inputType: "boolean"
                },
            ]
            }
        }
    },
    {
        title:"Communication Used by Others", 
        "properties": 
        {
            "table 1":{"type":"table", span:24, title: " ", needCheckBox:true, needAddButton:false, 
            "columns": [
                {
                    title: '',
                    dataIndex: 'colheader',
                    editable: false,
                    colheader: ["Understands single words", "Understands short phrases", "Understands majority of communications"]
                },
                {
                    title: 'School',
                    dataIndex: 'school',
                    editable: true,
                    inputType: "boolean"
                },
                {
                    title: 'Home',
                    dataIndex: 'home',
                    editable: true,
                    inputType: "boolean"
                },
                {
                    title: 'Community',
                    dataIndex: 'community',
                    editable: true,
                    inputType: "boolean"
                },
            ]
            }
        }
    },
    {
        title:"Student Communicates with Others Using (Check all that apply)", 
        "properties": 
        {
            "Speech":{type:"boolean",span:8},"American Sign Language":{type:"boolean",span:8},"Singapore Sign Language":{type:"boolean",span:8},
            "Body language":{type:"boolean",span:8},"Signs and speech together":{type:"boolean",span:8},"Gestures":{type:"boolean",span:8},
            "Written messages":{type:"boolean",span:8},"Signed English":{type:"boolean",span:8},"Picture cues":{type:"boolean",span:8},
            "Contact (Pidgin) sign language":{type:"boolean",span:24},
            "Other":{type:"boolean string",span:24},
            paragraph1: {type: "paragraph", span: 24, description: "Level of expressive communication: "},
            "Single words":{type:"boolean",span:8},"Combination of words":{type:"boolean",span:8},"Proficient":{type:"boolean",span:8},
        }
    },
    {
        title:"Receptive and Expressive Abilities", 
        "properties": 
        { 
            "Is There a Discrepancy Between Receptive and Expressive Abilities?": 
            {type:"switch", "properties":
                {
                    question1: {type: "paragraph", span: 24, description: "If yes, describe further"},
                    _:{type:"string",span:24, long:true},
                }
            }
        }
    },
    {
        title:"Services Currently Used (Check all that apply)", 
        "properties": 
        {
            "Audiology":{type:"boolean string",span:12},"Note taker":{type:"boolean",span:12},
            "Educational interpreter using:":
            {type:"switch", "properties":
                {
                    "ASL":{type:"boolean",span:5},"SgSL":{type:"boolean",span:5},"Transliterating":{type:"boolean",span:5},"PSE":{type:"boolean",span:5},"Oral ":{type:"boolean",span:4},
                    "Other":{type:"boolean string",span:24},
                }
            }

        }
    },
    {
        title:"Equipment Currently Used (Check all that apply.)", 
        "properties": 
        {
            
            "Hearing aids":{type:"boolean",span:8},"Cochlear implant":{type:"boolean",span:8},"Telecaption decoder":{type:"boolean",span:8},
            "Vibrotactile devices":{type:"boolean",span:8},"Classroom amplification system":{type:"boolean",span:8},"TTY/TDD":{type:"boolean",span:8},
            "FM system":{type:"boolean",span:8},"Other":{type:"boolean string",span:16},
        }
    },
    {
        title:"Present Concerns for Communication, Writing, and/or Educational Materials", 
        "properties": 
        {
            "Cannot hear teacher/other students":{type:"boolean",span:12},"Cannot respond to emergency alarm":{type:"boolean",span:12},
            "Cannot participate in class discussions ":{type:"boolean",span:12},"Cannot benefit from educational videos/programs":{type:"boolean",span:12},
            "Displays rec./exp. language delays":{type:"boolean",span:12},"Cannot use telephone to communicate":{type:"boolean",span:12},    
        }
    },
    {
        title:"Current communication functioning (Check all that apply)", 
        "properties": 
        {
            "Desires to communicate":{type:"boolean",span:24},
            "Initiates interaction":{type:"boolean",span:24},
            "Responds to communication requests":{type:"boolean",span:24},
            "Reads lips":{type:"boolean",span:24},
            "Appears frustrated with current communication functioning":{type:"boolean",span:24},
            "Requests clarification from communication partners (“Would you please repeat that?”)":{type:"boolean",span:24},
            "Repairs communication breakdown (Keeps trying, changes message)":{type:"boolean",span:24},
        }
    },
    {
        title:"Summary", 
        "properties": 
        {
            "Current Reading Level": {type:"string", span:24},
            paragraph1: {type: "paragraph", span: 24, description: "Summary of Hearing Abilities and Concern"},
            _:{type:"string",span:24, long:true},
        }
    }
]

export const formData =[
    {
        key:0,
        data:
        [
            ""
        ]
    }
]