

export const schema= [
    {
        title:"Typical of Student’s Present Writing (Check all that apply.)", 
        "properties": 
        {
            "Short words ":{type:"boolean",span:8},"Sentences":{type:"boolean",span:8},"Multi-paragraph reports":{type:"boolean",span:8},
            "Short phrases":{type:"boolean",span:8},"Paragraphs of 2-5 sentences":{type:"boolean",span:8},"Complex phrases":{type:"boolean",span:8},
            "Longer paragraphs":{type:"boolean",span:24},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"Difficulties Currently Experienced by Student (Check all that apply.) ", 
        "properties": 
        {
            "Answering questions":{type:"boolean",span:12},"Generating ideas":{type:"boolean",span:12},
            "Getting started on a sentence or story":{type:"boolean",span:12},"Working w/peers to generate ideas and information":{type:"boolean",span:12},
            "Adding information to a topic":{type:"boolean",span:12},"Planning content":{type:"boolean",span:12},
            "Sequencing information":{type:"boolean",span:12},"Using a variety of vocabulary":{type:"boolean",span:12},
            "Integrating information from two or more sources":{type:"boolean",span:12},"Summarizing information":{type:"boolean",span:12},
            "Relating information to specific topics":{type:"boolean",span:12},"Determining when to begin a new paragraph":{type:"boolean",span:12},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"Strategies for Composing Written Materials Student Currently Utilizes (Check all that apply.) ", 
        "properties": 
        {
            "Story starters ":{type:"boolean",span:12},"Webbing/concept mapping":{type:"boolean",span:12},
            "Preset choices or plot twists":{type:"boolean",span:12},"Outlines":{type:"boolean",span:12},
            "Templates to provide the format or structure (both paper and electronic)":{type:"boolean",span:24},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"Aids/Assistive Technology for Composing Written Materials Utilized by Student (Check all that apply.) ",
        "properties": 
        {
            "Word cards":{type:"boolean",span:12},"Word book":{type:"boolean",span:12},
            "Word wall/word lists":{type:"boolean",span:12}, "Prewritten words on cards or labels":{type:"boolean",span:12},
            "Dictionary":{type:"boolean",span:12},"Electronic dictionary/spell checker":{type:"boolean",span:12},
            "Whole words using software or hardware (e.g. IntelliKeys)":{type:"boolean",span:12}, "Symbol-based software for writing (e.g. Writing with Symbols 2000 or Pix Writer)":{type:"boolean",span:12},
            "Word processing with spell checker/grammar checker":{type:"boolean",span:12}, "Talking word processing":{type:"boolean",span:12},
            "Abbreviation/expansion":{type:"boolean",span:12}, "Word processing with writing support":{type:"boolean",span:12},
            "Multimedia software":{type:"boolean",span:12},"Voice recognition software":{type:"boolean",span:12},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"", 
        "properties": 
        {
            question1: {type: "paragraph", span: 24, description: "Summary of Student’s Abilities and Concerns Related to Computer/Device Access"},
            _:{type:"string",span:24, long:true},
        }
    }
]

export const formData =[
    {
        key:0,
        data:
        [
            false,false,false,false,false,false,false,""
        ]
    },
    {
        key:1,
        data:
        [
            false,false,false,false,false,false,false,false,false,false,false,false,""
        ]
    },
    {
        key:2,
        data:
        [
            false,false,false,false,false,""
        ]
    },
    {
        key:3,
        data:
        [
            false,false,false,false,false,false,false,false,false,false,false,false,false,false,""
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