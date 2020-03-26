

export const schema = [
    {
        title:"COMPUTER ACCESS ", 
        "properties": 
        {
            "Keyboard using accessibility options":{type:"boolean",span:12}, 
            "Word prediction, abbreviation/expansion to reduce keystrokes":{type:"boolean",span:12}, 
            "Keyguard":{type:"boolean",span:12}, 
            "Arm support":{type:"boolean",span:12}, 
            "Track ball/track pad/joystick with on-screen keyboard":{type:"boolean",span:12}, 
            "Alternate keyboard":{type:"boolean",span:12}, 
            "Mouth stick/head mouse with on-screen keyboard":{type:"boolean",span:12}, 
            "Switch with Morse code":{type:"boolean",span:12}, 
            "Switch with scanning":{type:"boolean",span:12}, 
            "Voice recognition software":{type:"boolean",span:12},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"READING, STUDYING, AND MATH", 
        "properties": {}
    },
    {
        title:"", 
        "properties": 
        {
            paragraph1: {type: "paragraph", span: 24, isHTML:true, description: "<h6>Reading</h6>"},
            "Standard text":{type:"boolean",span:12}, 
            "Predictable books":{type:"boolean",span:12}, 
            "Changes in text size, spacing, color, background color ":{type:"boolean",span:12}, 
            "Book adapted for page turning (e.g. page fluffers, 3-ring binder)":{type:"boolean",span:12}, 
            "Use of pictures/symbols with text":{type:"boolean",span:12}, 
            "Talking electronic device/software to pronounce challenging words":{type:"boolean",span:12}, 
            "Single word scanners":{type:"boolean",span:12}, 
            "Scanner w/OCR and text to speech software":{type:"boolean",span:12}, 
            "Software to read websites and emails":{type:"boolean",span:24}, 
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"",
        "properties":
        {
            paragraph1: {type: "paragraph", span: 24, isHTML:true, description: "<h6>Learning/Studying</h6>"},
            "Print or picture schedule":{type:"boolean",span:12}, 
            "Low tech aids to find materials (e.g. index tabs, color coded folders)":{type:"boolean",span:12}, 
            "Highlight text (e.g. markers, highlight tape, ruler, etc.)":{type:"boolean",span:12}, 
            "Recorded material (books on tape, taped lectures with number coded index, etc.)":{type:"boolean",span:12}, 
            "Voice output reminders for assignments, steps of task, etc":{type:"boolean",span:12}, 
            "Electronic organizers":{type:"boolean",span:12}, 
            "Pagers/electronic reminders":{type:"boolean",span:12}, 
            "Hand-held scanners":{type:"boolean",span:12}, 
            "Software for concept development/manipulation of objects – may use alternate input device, e.g. switch,":{type:"boolean",span:12}, 
            "Touch Window":{type:"boolean",span:12}, 
            "Software for organization of ideas and studying":{type:"boolean",span:12}, 
            "Palm computers":{type:"boolean",span:12}, 
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"",
        "properties":
        {
            paragraph1: {type: "paragraph", span: 24, isHTML:true, description: "<h6>Math</h6>"},
            "Abacus/Math Line":{type:"boolean",span:12}, 
            "Enlarged math worksheets":{type:"boolean",span:12}, 
            "Low tech alternatives for answering":{type:"boolean",span:12}, 
            "Math “Smart Chart” ":{type:"boolean",span:12}, 
            "Money calculator and Coinulator":{type:"boolean",span:12}, 
            "Tactile/voice output measuring devices":{type:"boolean",span:12}, 
            "Talking watches/clocks":{type:"boolean",span:12}, 
            "Calculator/calculator with printout":{type:"boolean",span:12}, 
            "Calculator with large keys and/or large display":{type:"boolean",span:12}, 
            "Talking calculator":{type:"boolean",span:12}, 
            "Calculator with special features (e.g. fraction translation)":{type:"boolean",span:12}, 
            "On-screen/scanning calculator":{type:"boolean",span:12}, 
            "Alternative keyboard":{type:"boolean",span:12}, 
            "Software with cueing for math computation (may use adapted input methods)":{type:"boolean",span:12}, 
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"WRITING", 
        "properties": {}
    },
    {
        title:"", 
        "properties": 
        {
            paragraph1: {type: "paragraph", span: 24, isHTML:true, description: "<h6>Motor Aspects of Writing</h6>"},
            "Regular pencil/pen":{type:"boolean",span:12}, 
            "Pencil/pen with adaptive grip":{type:"boolean",span:12}, 
            "Adapted paper (e.g. raised line, highlighted lines)":{type:"boolean",span:12}, 
            "Slantboard":{type:"boolean",span:12}, 
            "Use of prewritten words/phrases":{type:"boolean",span:12}, 
            "Portable word processor to keyboard instead of write":{type:"boolean",span:12}, 
            "Computer with word processing software":{type:"boolean",span:12}, 
            "Portable scanner with word processing software":{type:"boolean",span:12}, 
            "Voice recognition software to word process":{type:"boolean",span:24}, 
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"", 
        "properties": 
        {
            paragraph1: {type: "paragraph", span: 24, isHTML:true, description: "<h6>Composing Written Material</h6>"},
            "Word cards/word book/word wall":{type:"boolean",span:12}, 
            "Pocket dictionary/thesaurus":{type:"boolean",span:12}, 
            "Writing templates":{type:"boolean",span:12}, 
            "Electronic/talking electronic dictionary/thesaurus/spell checker":{type:"boolean",span:12}, 
            "Word processing with spell checker/grammar checker":{type:"boolean",span:12}, 
            "Talking word processing":{type:"boolean",span:12}, 
            "Abbreviation/expansion":{type:"boolean",span:12}, 
            "Word processing with writing supports":{type:"boolean",span:12}, 
            " Multimedia software":{type:"boolean",span:12}, 
            "Voice recognition software ":{type:"boolean",span:12}, 
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"", 
        "properties": 
        {
            paragraph1: {type: "paragraph", span: 24, isHTML:true, description: "<h6>Communication</h6>"},
            "Communication board/book with pictures/objects/letters/words":{type:"boolean",span:12}, 
            "Eye gaze board/frame communication system":{type:"boolean",span:12}, 
            "Simple voice output device":{type:"boolean",span:12}, 
            "Voice output device w/levels":{type:"boolean",span:12}, 
            "Voice output device w/icon sequencing":{type:"boolean",span:12}, 
            "Voice output device w/dynamic display":{type:"boolean",span:12}, 
            "Device w/speech synthesis for typing":{type:"boolean",span:24}, 
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"RECREATION AND LEISURE", 
        "properties": 
        {
            "Toys adapted with Velcro, magnets, handles, etc.":{type:"boolean",span:12},
            "Toys adapted for single switch operation":{type:"boolean",span:12},
            "Adaptive sporting equipment (e.g. lighted or beeping ball)":{type:"boolean",span:12},
            "Universal cuff/strap to hold crayons, markers, etc.":{type:"boolean",span:12},
            "Modified utensils (e.g. rubber stamps, brushes, etc.)":{type:"boolean",span:12},
            "Ergo Rest or other arm support for drawing/painting":{type:"boolean",span:12},
            "Electronic aids to control/operate TV, VCR, CD player, etc.":{type:"boolean",span:12},
            "Software":{type:"boolean",span:12},
            "Completion of art activities":{type:"boolean",span:12},
            "Games on the computer":{type:"boolean",span:12},
            " Other computer software":{type:"boolean",span:24},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"ACTIVITIES OF DAILY LIVING (ADLS)", 
        "properties": 
        {
            "Non slip materials to hold things in place":{type:"boolean",span:12},
            "Universal cuff/strap to hold items in hand":{type:"boolean",span:12},
            "Color coded items for easier locating and identifying":{type:"boolean",span:12},
            "Adaptive eating utensils (e.g. foam handles, deep sides)":{type:"boolean",span:12},
            "Adaptive drinking devices (e.g. cup with cut-out rim)":{type:"boolean",span:12},
            "Adaptive dressing equipment (e.g. button hook, elastic shoelaces, Velcro instead of buttons, etc.)":{type:"boolean",span:12},
            "Adaptive devices for hygiene (e.g. adapted toothbrush, raised toilet seat, etc.) ":{type:"boolean",span:12},
            "Adaptive bathing devices":{type:"boolean",span:12},
            "Adaptive equipment for cooking":{type:"boolean",span:24},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"MOBILITY", 
        "properties": 
        {
            "Walker":{type:"boolean",span:12},
            "Grab bars and rails":{type:"boolean",span:12},
            "Manual wheelchair including sports chair":{type:"boolean",span:12},
            "Powered mobility toy (e.g. Cooper Car, GoBot)":{type:"boolean",span:12},
            "Powered scooter or cart":{type:"boolean",span:12},
            "Powered wheelchair w/ joystick or other control":{type:"boolean",span:12},
            "Adapted vehicle for driving":{type:"boolean",span:24},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"POSITIONING AND SEATING", 
        "properties": 
        {
            "Non-slip surface on chair to prevent slipping (e.g. Dycem)":{type:"boolean",span:12},
            "Bolster, rolled towel, blocks for feet":{type:"boolean",span:12},
            "Adapted/alternate chair, sidelyer, stander":{type:"boolean",span:12},
            "Custom fitted wheelchair or insert":{type:"boolean",span:12},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"VISION", 
        "properties": 
        {
            "Eye glasses":{type:"boolean",span:12},
            "Optical aids":{type:"boolean",span:12},
            "Large print materials":{type:"boolean",span:12},
            "Auditory materials":{type:"boolean",span:12},
            "Dictation software (voice input)":{type:"boolean",span:12},
            "CCTV (closed circuit television)":{type:"boolean",span:12},
            "Screen magnifier (mounted over screen)":{type:"boolean",span:12},
            "Screen magnification software":{type:"boolean",span:12},
            "Screen color contrast":{type:"boolean",span:12},
            "Screen reader, text reader":{type:"boolean",span:12},
            "Braille notetaker":{type:"boolean",span:12},
            "Braille translation software":{type:"boolean",span:12},
            "Braille embosser":{type:"boolean",span:12},
            "Enlarged or Braille/tactile labels for keyboard":{type:"boolean",span:12},
            "Alternate keyboard":{type:"boolean",span:24},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"HEARING", 
        "properties": 
        {
            "Pen and paper":{type:"boolean",span:12},
            "Computer/portable word processor":{type:"boolean",span:12},
            "TDD for phone access with or without relay":{type:"boolean",span:12},
            "Signaling device (e.g. flashing light or vibrating pager)":{type:"boolean",span:12},
            "Closed captioning":{type:"boolean",span:12},
            "Real Time captioning":{type:"boolean",span:12},
            "Computer aided note taking":{type:"boolean",span:12},
            "Screen flash for alert signals on computer":{type:"boolean",span:12},
            "Phone amplifier":{type:"boolean",span:12},
            "Personal amplification system/hearing aid":{type:"boolean",span:12},
            "FM or loop system":{type:"boolean",span:12},
            "Infrared system":{type:"boolean",span:12},
            "Other":{"type":"boolean string", span:24},
        }
    },
    {
        title:"Comments", 
        "properties": 
        {
            _:{type:"string", long:true,span:24},
        }
    },
]