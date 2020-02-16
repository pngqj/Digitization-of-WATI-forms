

export const schema= [
    {
        title:"Current Writing Ability (Check all that apply.)", 
        "properties": 
        {
            "Holds pencil, but does not write":{type:"boolean",span:12}, "Pretend writes ":{type:"boolean",span:12},
            "Scribbles with a few recognizable letters":{type:"boolean",span:12}, "Uses regular pencil":{type:"boolean",span:12},
            "Uses pencil adapted with":{"type":"boolean string", span:12},"Copies simple shapes":{type:"boolean",span:12}, 
            "Copies from book (near point)":{type:"boolean",span:12}, "Copies from board (far point)":{type:"boolean",span:12},
            "Prints a few words":{type:"boolean",span:12}, "Writes on 1\" lines":{type:"boolean",span:12},
            "Prints name":{type:"boolean",span:12}, "Writes on narrow lines":{type:"boolean",span:12},
            "Writes cursive":{type:"boolean",span:12}, "Uses space correctly":{type:"boolean",span:12},
            "Writing is limited due to fatigue":{type:"boolean",span:12}, "Sizes writing to fit spaces":{type:"boolean",span:12},
            "Writing is slow and arduous":{type:"boolean",span:12}, "Writes independently and legibly":{type:"boolean",span:12},
            
        }
    },
    {
        title:"Assistive Technology Used (Check all that apply.)", 
        "properties": 
        {
            "Paper with heavier lines":{type:"boolean",span:8},"Paper with raised lines":{type:"boolean",span:8},"Pencil grip":{type:"boolean",span:8},
            "Special pencil or marker":{type:"boolean",span:8},"Splint or pencil holder":{type:"boolean",span:8},"Typewriter":{type:"boolean",span:8},
            "Computer":{type:"boolean",span:24},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"Current Keyboarding Ability (Check all that apply.)", 
        "properties": 
        {
            "Does not currently type":{type:"boolean",span:12},"Activates desired key on command":{type:"boolean",span:12},
            "Types slowly, with one finger":{type:"boolean",span:12},"Types slowly, with more than one finger":{type:"boolean",span:12},
            "Accidentally hits unwanted keys":{type:"boolean",span:12},"Performs 10 finger typing":{type:"boolean",span:12},
            "Requires arm or wrist support to type":{type:"boolean",span:12},"Accesses keyboard with head or mouth stick":{type:"boolean",span:12},
            "Uses mini keyboard to reduce fatigue":{type:"boolean",span:12},"Uses switch to access computer":{type:"boolean",span:12},
            "Uses Touch Window":{type:"boolean",span:12},"Uses alternative keyboard":{type:"boolean",span:12},
            "Uses access software":{type:"boolean",span:12},"Uses Morse code to access computer":{type:"boolean",span:12},
            "Uses adapted or alternate keyboard, such as":{"type":"boolean string", span:24},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"Computer Use (Check all that apply.)", 
        "properties": 
        {
            "Has never used a computer":{type:"boolean",span:8},"Uses computer at school":{type:"boolean",span:8},"Uses computer at home ":{type:"boolean",span:8},
            "Uses computer for games":{type:"boolean",span:12},"Uses computer for word processing":{type:"boolean",span:12},
            "Uses computer’s spell checker":{type:"boolean",span:24},
            "Uses computer for a variety of purposes, such as":{"type":"boolean string", span:24},
            "Has potential to use computer but has not used a computer because":{"type":"boolean string", span:24, is_TextArea:true},
        }
    },
    {
        title:"Computer Availability and Use", 
        "properties": 
        {
            "PC":{type:"boolean",span:8},"Macintosh":{type:"boolean",span:8},"Other":{"type":"boolean string", span:8},
            "Desktop":{type:"boolean",span:8},"Laptop ":{type:"boolean",span:16},
            "Location":{"type":"boolean string", span:24},
            "The student uses a computer ":{type:"select", span:13, options:["Rarely","Frequently","Daily for one or more subjects or periods","Every day, all day"]}
        }
    },
    {
        title:"", 
        "properties": 
        {
            question1: {type: "paragraph", span: 24, description: "Summary of Student’s Abilities and Concerns Related to Writing"},
            _:{type:"long string",span:24},
        }
    }

]

export const formData =[
    {
        key:0,
        data:
        [
            false,false,false,false,"",false,false,false,false,false,false,false,false,false,false,false,false,false,
        ]
    },
    {
        key:1,
        data:
        [
            false,false,false,false,false,false,false,""
        ]
    },
    {
        key:2,
        data:
        [
            false,false,false,false,false,false,false,false,false,false,false,false,false,false,"",""
        ]
    },
    {
        key:3,
        data:
        [
            false,false,false,false,false,false,"",""
        ]
    },
    {
        key:4,
        data:
        [
            false,false,"",false,false,"",""
        ]
    },
    {
        key:4,
        data:
        [
            null, ""
        ]
    }
]