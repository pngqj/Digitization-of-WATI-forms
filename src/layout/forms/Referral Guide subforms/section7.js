

export const schema= [
    {
        title:"Difficulties Student Has with Math (Check all that apply.)", 
        "properties": 
        {
            "Legibly writing numerals":{type:"boolean",span:12},"Understanding math related language":{type:"boolean",span:12},
            "Understanding meaning of numbers":{type:"boolean",span:12},"Understanding place values":{type:"boolean",span:12},
            "Understanding money concepts":{type:"boolean",span:12},"Completing simple addition and subtraction":{type:"boolean",span:12},
            "Completing multiplication and division":{type:"boolean",span:12},"Completing complex addition and subtraction":{type:"boolean",span:12},
            "Understanding units of measurement":{type:"boolean",span:12},"Understanding tables and graphs":{type:"boolean",span:12},
            "Creating graphs and tables":{type:"boolean",span:12},"Understanding time concepts":{type:"boolean",span:12},
            "Understanding fractions":{type:"boolean",span:12},"Working with fractions":{type:"boolean",span:12},
            "Converting to mixed numbers":{type:"boolean",span:12},"Understanding decimals /percents":{type:"boolean",span:12},
            "Solving story problems":{type:"boolean",span:12},"Understanding geometry":{type:"boolean",span:12},
            "Graphing":{type:"boolean",span:12},"Understanding the use of formulas":{type:"boolean",span:12},
            "Understanding and use of trigonometry functions ":{type:"boolean",span:12},"Checking work":{type:"boolean",span:12},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"Assistive Technology Tried", 
        "properties": 
        {
            "Abacus":{type:"boolean",span:12},"Talking calculator":{type:"boolean",span:12},
            "Math line":{type:"boolean",span:12},"Braille calculator":{type:"boolean",span:12},
            "Enlarged math worksheets":{type:"boolean",span:12},"Alternative keyboards (e.g., IntelliKeys)":{type:"boolean",span:12},
            "Low-tech alternatives for answering":{type:"boolean",span:12},"Math “Smart Chart”":{type:"boolean",span:12},
            "Recorded material":{type:"boolean",span:12},"Tactile math devices (ruler, clock, etc.)":{type:"boolean",span:12},
            "Voice output reminders for assignments, steps of task, etc.":{type:"boolean",span:12},"Electronic organizers":{type:"boolean",span:12},
            "Pagers/electronic reminders":{type:"boolean",span:12},"Single word scanners":{type:"boolean",span:12},
            "Software for manipulation of objects/concept development":{type:"boolean",span:12},"On screen scanning calculator":{type:"boolean",span:12},
            "Talking or Braille watch":{type:"boolean",span:12},"Software for organization of ideas and studying":{type:"boolean",span:12},
            "Palm computers":{type:"boolean",span:24},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"Strategies Used", 
        "properties": 
        {
            paragraph1: {type: "paragraph", span: 24, description: "Please describe any strategies that have been used to help."},
            _:{type:"string",span:24, long:true},
        }
    },
    {
        title:"", 
        "properties": 
        {
            paragraph1: {type: "paragraph", span: 24, description: "Summary of Student’s Abilities and Concerns Related to Math"},
            _:{type:"string",span:24, long:true},
        }
    }
]

export const formData =[
    {
        key:1,
        data:
        [
            false,false,false,false,
            false,false,false,false,
            false,false,false,false,
            false,false,false,false,
            false,false,false,false,
            false,false,""
        ]
    },
    {
        key:2,
        data:
        [
            false,false,false,false,
            false,false,false,false,
            false,false,false,false,
            false,false,false,false,false,""
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