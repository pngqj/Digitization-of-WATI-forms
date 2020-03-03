

export const schema= [
    {
        title:"Mobility (Check all that apply.)", 
        "properties": 
        {
            "Crawls, rolls, or creeps independently":{type:"boolean",span:24},
            "Is pushed in manual wheelchair":{type:"boolean",span:24},
            "Uses wheelchair for long distances only":{type:"boolean",span:24},
            "Uses manual wheelchair independently":{type:"boolean",span:24},
            "Is learning to use power wheelchair":{type:"boolean",span:24},
            "Uses power wheelchair":{type:"boolean",span:24},
            "Needs help to transfer in and out of wheelchair":{type:"boolean",span:24},
            "Transfers independently":{type:"boolean",span:24},
            "Has difficulty walking":{type:"boolean",span:24},
            "Walks with assistance":{type:"boolean",span:24},
            "Has difficulty walking up stairs":{type:"boolean",span:24},
            "Has difficulty walking down stairs":{type:"boolean",span:24},
            "Needs extra time to reach destination":{type:"boolean",span:24},
            "Walks independently":{type:"boolean",span:24},
            "Walks with appliance":{type:"boolean",span:24},
            "Uses elevator key independently":{type:"boolean",span:24},
        }
    },
    {
        title:" Concerns About Mobility (Check all that apply.)", 
        "properties":
        {
            "Student seems extremely tired after walking, requires a long time to recover":{type:"boolean",span:24},
            "Student seems to be having more difficulty than in the past":{type:"boolean",span:24},
            "Student complains about pain or discomfort":{type:"boolean",span:24},
            "Changes in schedule require more time for travel":{type:"boolean",span:24},
            "Changes in class location or building are making it more challenging to get around":{type:"boolean",span:24},
            "Transition to new school will require consideration of mobility needs":{type:"boolean",span:24},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"Summary of Student’s Abilities and Concerns Related to Mobility", 
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
            false,false,false,false,
            false,false,false,false,
            false,false,false,false,
            false,false,false,false,
        ]
    },
    {
        key:1,
        data:
        [
            false,false,false,false,
            false,false,""
        ]
    },
    {
        key:2,
        data:
        [
            ""
        ]
    },
]