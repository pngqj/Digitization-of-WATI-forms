

export const schema= [
    {
        title:"section1", 
        "properties": 
        {
            "Understanding cause and effect":{type:"boolean",span:12},"Following complex directions":{type:"boolean",span:12},
            "Understanding turn taking":{type:"boolean",span:12},"Communicating with others":{type:"boolean",span:12},
            "Handing/manipulating objects":{type:"boolean",span:12},"Hearing others":{type:"boolean",span:12},
            "Throwing/catching objects":{type:"boolean",span:12},"Seeing equipment or materials":{type:"boolean",span:12},
            "Understanding rules":{type:"boolean",span:12},"Operating TV, VCR, etc.":{type:"boolean",span:12},
            "Waiting for his/her turn":{type:"boolean",span:12},"Operating computer":{type:"boolean",span:12},
            "Following simple directions":{type:"boolean",span:12},"Other":{"type":"boolean string", span:12},
        }
    },
    {
        title:"Activities Student Especially Enjoys", 
        "properties": 
        {
            _:{type:"string",span:24, long:true},
        }
    },
    {
        title:"Adaptations Tried to Enhance Participation in Recreation and Leisure", 
        "properties": 
        {
            _:{type:"string",span:24, long:true},
            paragraph1: {type: "paragraph", span: 24, description: "How did they help?"},
            _2:{type:"string",span:24, long:true},
        }
    },
    {
        title:"Assistive Technology Tried", 
        "properties": 
        {
            "Toys adapted with Velcro®, magnets, handles etc.":{type:"boolean",span:24},
            "Toys adapted for single switch operation":{type:"boolean",span:24},
            "Adaptive sporting equipment, such as lighted or beeping ball":{type:"boolean",span:24},
            "Universal cuff or strap to hold crayons, markers, etc.":{type:"boolean",span:24},
            "Modified utensils, e.g. rubber stamps, rollers, brushes":{type:"boolean",span:24},
            "Ergo Rest or other arm support":{type:"boolean",span:24},
            "Electronic aids to control/operate TV, VCR, CD player, etc.":{type:"boolean",span:24},
            "Software to complete art activities":{type:"boolean",span:12},"Games on the computer":{type:"boolean",span:12},
            "Other computer software":{type:"boolean",span:12},"Other":{"type":"boolean string", span:12},
        }
    },
    {
        title:"Summary of Student’s Abilities and Concerns in the Area of Recreation and Leisure", 
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
            false,false,false,
            false,false,false,
            false,false,false,
            false,false,false,
            false,""
        ]
    },
    {
        key:1,
        data:
        [
            ""
        ]
    },
    {
        key:2,
        data:
        [
            "",null,""
        ]
    },
    {
        key:3,
        data:
        [
            false,false,false,false,false,
            false,false,false,false,false,
            ""
        ]
    },
    {
        key:5,
        data:
        [
            ""
        ]
    }
]