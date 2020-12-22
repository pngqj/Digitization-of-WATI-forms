

export const schema= [
    {
        title:"", 
        "properties": 
        {
            paragraph1: {type: "paragraph", span: 24, description: "A vision specialist should be consulted to complete this section."},
        }
    },
    {
        title:"Vision Information", 
        "properties": 
        {
            "Date of Last Vision Report":{type:"string",span:24},
            paragraph1: {type: "paragraph", span: 24, description: "Report indicates (please address any field loss, vision condition, etc.)"},
            _:{type:"string",span:24, long:true},
        }
    },
    {
        title:"Visual Abilities (Check all that apply.)", 
        "properties": 
        {
            "Read standard textbook print":{type:"boolean",span:24},
            "Read text if enlarged to (indicate size in inches)":{"type":"boolean string", span:24},
            "Requires specialized lighting such as":{"type":"boolean string", span:24},
            "Requires materials tilted at a certain angle (indicate angle)":{"type":"boolean string", span:24},
            "Can read using optical aids, list":{"type":"boolean string", span:24},
            "Currently uses the following screen enlargement device":{"type":"boolean string", span:24},
            "Currently uses the following screen enlargement software":{"type":"boolean string", span:24},
            "Recognizes letters enlarged to":{"type":"boolean string", span:24, after:"pt. type on computer screen"},
            "Recognizes letters enlarged to ":{"type":"boolean string", span:24, multiple:['pt. type for', 'minutes without eye fatigue.'], multiLength: [0.575,0.425]},
            "Prefers": 
            {type:"switch", "properties":
                {
                    "Black letters on white":{type:"boolean",span:24},
                    "White on black":{type:"boolean",span:24},
                    "":{type:"string",span:24, multiple:['(color) on', ""], multiLength:[0.5,0.5]},
                    
                }
            },
            "Tilts head when reading":{type:"boolean",span:24},
            "Uses only one eye:": 
            {type:"switch", "properties":
                {
                    "Right eye":{type:"boolean",span:24},
                    "Left eye":{type:"boolean",span:24},
                }
            },
            // "Uses screen reader:":{"type":"boolean string", span:24, multiple:['pt. type for', 'minutes without eye fatigue.'], multiLength: [0.575,0.425]},
            "Uses screen reader:":{"type":"boolean string", span:24},
            "Requires recorded material, text to speech, or Braille materials":{type:"boolean",span:24},
        },
    },
    {
        title:"Alternative Output ", 
        "properties":
            {
                "Slate and stylus":{type:"boolean",span:24},
                "Talking calculator":{type:"boolean",span:24},
                "Braille calculator":{type:"boolean",span:24},
                "Braille notetaker":{type:"boolean",span:24},
                "Electric Brailler":{type:"boolean",span:24},
                "Refreshable Braille display":{type:"boolean",span:24},
                "Tactile images":{type:"boolean",span:24},
                "Screen reader":{type:"boolean",span:24},
                "Braille translation software":{"type":"boolean string", span:24},
            }

    },
    {
        title:"Level of Proficiency (Check the one that most closely describes the student)",
        "properties":{
            "Requires frequent physical prompts":{type:"boolean",span:12},
            "Requires frequent verbal cues":{type:"boolean",span:12},
            "Needs only intermittent cues":{type:"boolean",span:12},
            "Uses device to complete tasks independently":{type:"boolean",span:12},
            "Trouble-shoots problems related to device":{type:"boolean",span:24}
        }

    },
    {
        title:"Writing/Handwritten materials (Check all that apply).",
        "properties": 
        {
            "Writes using space correctly":{type:"boolean",span:12},"Writes on line":{type:"boolean",span:12},
            "Writes appropriate size":{type:"boolean",span:12},"Reads own handwriting":{type:"boolean",span:12},
            "Reads someone else’s writing":{type:"boolean",span:12},"Reads hand printing":{type:"boolean",span:12},
            "Reads cursive":{type:"boolean",span:12},"Skips letters when copying":{type:"boolean",span:12},
            "Requires bold or raised-line paper":{type:"boolean",span:12},"Requires softer lead pencils":{type:"boolean",span:12},
            "Requires colored pencils, pens, or paper":{type:"boolean",span:24},
            "Requires felt tip pen": 
            {type:"switch", "properties":
                {
                    "Thin point":{type:"boolean",span:24},
                    "Thick point":{type:"boolean",span:24},
                }
            },

        }
    },
    {
        title:"Summary of Student’s Abilities and Concerns Related to Vision", 
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
            ""
        ]
    }
]