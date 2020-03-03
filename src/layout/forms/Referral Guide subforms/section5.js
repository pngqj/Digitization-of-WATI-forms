

export const schema= [
    {
        title:"The Student Demonstrates the Following Literacy Skills. (Check all that apply.)", 
        "properties": 
        {
            "Engages in joint attention with adult caregiver to activities (e.g. songs, stories, games and/or toys)":{type:"boolean",span:24},
            "Shows an interest in books and stories with adult":{type:"boolean",span:24},
            "Shows and interest in looking at books independently":{type:"boolean",span:24},
            "Associates pictures with spoken words when being read to":{type:"boolean",span:24},
            "Realizes text conveys meaning when being read to":{type:"boolean",span:24},
            "Recognizes connection between spoken words and specific text when being read to":{type:"boolean",span:24},
            "Pretend writes and “reads” what he or she has written, even if scribbles":{type:"boolean",span:24},
            "When asked to spell a word, gets first consonant correct, but not the rest of the word":{type:"boolean",span:24},
            "Demonstrates sound manipulation skills including": 
            {type:"switch", "properties":
                {
                    "Initial and final sounds in words":{type:"boolean",span:12},"Initial letter names/sounds":{type:"boolean",span:12},
                }
            },
            "Recognizes, names and prints the alphabet (if motor skills are limited, may use alternative means rather than printing to demonstrate knowledge of the alphabet)":{type:"boolean",span:24},
            "When asked to spell a word, gets first and last sounds correct":{type:"boolean",span:24},
            "Applies phonics rules when attempting to decode printed words":{type:"boolean",span:24},
            "Sound blends words":{type:"boolean",span:24},
            "Reads and understands words in context":{type:"boolean",span:24},
            "Spells words using conventional spelling in situations other than memorized spelling tests":{type:"boolean",span:24},
            "Reads and understands sentences":{type:"boolean",span:24},
            "Composes sentences using nouns and verbs":{type:"boolean",span:24},
            "Reads fluently with expression":{type:"boolean",span:24},
            "Reads and understands paragraphs":{type:"boolean",span:24},
            "Composes meaningful paragraphs using correct syntax and punctuation":{type:"boolean",span:24},
        }
    },
    {
        title:"Student’s Performance Is Improved by (Check all that apply.)", 
        "properties": 
        {
            "Smaller amount of text on page":{type:"boolean",span:12},"Enlarged print":{type:"boolean",span:12},
            "Word wall to refer to":{type:"boolean",span:12},"Pre-teaching concepts":{type:"boolean",span:12},
            "Graphics to communicate ideas":{type:"boolean",span:12},"Text rewritten at lower reading level":{type:"boolean",span:12},
            "Bold type for main ideas":{type:"boolean",span:12},"Reduced length of assignment":{type:"boolean",span:12},
            "Additional time":{type:"boolean",span:12},"Being placed where there are few distractions":{type:"boolean",span:12},
            "Spoken text to accompany print":{type:"boolean",span:12},"Color overlay list color":{"type":"boolean string", span:12},
            "Other":{"type":"boolean string", span:24},


        }
    },
    {
        title:"Reading Assistance Used", 
        "properties": 
        {
            paragraph1: {type: "paragraph", span: 24, description: "Please describe the non-technology based strategies and accommodations that have been used with this student"},
            _:{type:"string",span:24, long:true},
        }
    },
    {
        title:"Assistive Technology Used", 
        "properties": 
        {
            paragraph1: {type: "paragraph", span: 24, description: "The following have been tried. (Check all that apply.)"},
            "Highlighter, marker, template, or other self-help aid in visual tracking":{type:"boolean",span:24},
            "Colored overlay to change contrast between text and background ":{type:"boolean",span:24},
            "Tape recorder, taped text, or talking books to “read along” with text":{type:"boolean",span:24},
            "Talking dictionary or talking spell checker to pronounce single words":{type:"boolean",span:24},
            "Hand held scanner to pronounce difficult words or phrases":{type:"boolean",span:24},
            "Computer with text to speech software to": 
            {type:"switch", "properties":
                {
                    "Speak single words":{type:"boolean",span:6}, "Speak sentences":{type:"boolean",span:6},
                    "Speak paragraphs":{type:"boolean",span:6},"Read entire document":{type:"boolean",span:6},
                }
            },
            paragraph2: {type: "paragraph", span: 24, description: "Explain what seemed to work about any of the above assistive technology that has been tried."},
            _:{type:"string",span:24, long:true},
        }
    },
    {
        title:"Approximate Age or Grade Level of Reading Skills", 
        "properties": 
        {
            "":{type:"string",span:24},
        }
    },
    {
        title:"Cognitive Ability in General", 
        "properties": 
        {
            "Significantly below average":{type:"boolean",span:8},
            "Below average":{type:"boolean",span:6},
            "Average":{type:"boolean",span:4},
            "Above average":{type:"boolean",span:6},

        }
    },
    {
        title:"Difficulty", 
        "properties": 
        {
            paragraph1: {type: "paragraph", span: 24, description: "Student has difficulty in the following."},
            "Worksheets":{type:"select", span:11, options:["", "Decoding", "Comprehending", "Decoding and comprehending"]},
            "Reading Textbook":{type:"select", span:13, options:["", "Decoding", "Comprehending", "Decoding and comprehending"]},
            "Subject Area Textbooks":{type:"select", span:14, options:["", "Decoding", "Comprehending", "Decoding and comprehending"]},
            "Tests":{type:"select", span:10, options:["", "Decoding", "Comprehending", "Decoding and comprehending"]},
        }
    },
    {
        title:"Computer Availability and Use", 
        "properties": 
        {
            paragraph1: {type: "paragraph", span: 24, description: "The student has access to the following computer(s)"},
            "PC":{type:"boolean",span:12},
            "Macintosh":{type:"boolean",span:12},
        }
    },
    {
        title:"The Student Uses a Computer:", 
        "properties": 
        {
            "Rarely":{type:"boolean",span:12},
            "Frequently":{type:"boolean",span:12},
            "Daily for one or more subjects or periods":{type:"boolean",span:12},
            "Every day, most of the day":{type:"boolean",span:12},
        } 
    },
    {
        title:"Summary of Student’s Abilities and Concerns Related to Reading", 
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
            false,false,false,false,false,false,false,false,
            [false,false],
            false,false,false,false,false,false,false,false,false,false,false,
        ]
    },
    {
        key:1,
        data:
        [
            false,false,false,false,false,false,false,false,false,false,false,
            "",""
        ]
    },
    {
        key:2,
        data:
        [
            null, ""
        ]
    },
    {
        key:3,
        data:
        [
            null, false,false,false,false,false,[false,false,false,false], null, ""
        ]
    },
    {
        key:4,
        data:
        [
            ""
        ]
    },
    {
        key:5,
        data:
        [
            false,false,false,false,
        ]
    },
    {
        key:6,
        data:
        [
            null,"","","",""
        ]
    },
    {
        key:7,
        data:
        [
            null,false,false,
        ]
    },
    {
        key:8,
        data:
        [
            false,false,false,false,
        ]
    },
    {
        key:9,
        data:
        [
            ""
        ]
    },
]