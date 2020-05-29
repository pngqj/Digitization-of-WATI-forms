

export const schema = [
    {
        title:"Student's Particulars", 
        "properties": 
        {
            "Student's Name":{"type":"string", span:24}, 
            "School":{type:"string", span:24}, 
            "Observer":{type:"string", span:24}, 
            "Date of Observation":{type:"date", span:24}, 
            "Type of class":{type:"string", span:24}, 
            paragraph1: {type: "paragraph", span: 24, description: "Directions: Complete this Environmental Assessment Checklist before beginning "},
            paragraph2: {type: "paragraph", span: 24, description: ""},
            paragraph3: {type: "paragraph", span: 24, description: "Describe the environment: Record short responses in the space provided. "},
            "table 1":{"type":"table", span:24, title: " ", 
            "columns": [
                  {
                      title: '',
                      dataIndex: 'colheader',
                      editable: false,
                      width:"50%",
                      colheader: ["Special or general education classroom?", "Specialty classroom (Specify: e.g., P.E., computer lab)", "Therapy room? (Specify)", "Number of teachers in class?", "Number of aides in class?", "Number of volunteers in class?", "Number of students in the class?", "How many days per week is the program?", "How many hours/day?", "Is the atmosphere busy or quiet?", "Are there large open areas or small divided sections?", "How are the desks arranged?", "Is the furniture sized for children?", "Are materials accessible, appropriate, varied, interesting?", "Is special equipment available (i.e., chairs with arm", "supports)?", "Where is the classroom located in relationship to the", "cafeteria, therapy, outdoor play areas, etc.?", "Are bathrooms located in or outside the classroom?"]
                  },
                  {
                    title: '',
                    dataIndex: 'data',
                    editable: true,
                    width:"50%",
                },
                ]
            },
            paragraph4: {type: "paragraph", span: 24, description: "Sensory Stimulation: Judge the level of sensory stimulation and record it with a check in the corresponding box. Enter comments or notes that clarify your responses if needed. "},            
            "table 2":{"type":"table", span:24, title: " ", 
            "columns": [
                  {
                      title: 'Auditory',
                      dataIndex: 'colheader',
                      editable: false,
                      colheader: ["Hallway", "Street", "Other classrooms", "Other students", "Instructional media", "Teacher aides/volunteers", "Other (specify):" ]
                  },
                  {
                    title: 'Excessive',
                    dataIndex: 'excessive',
                    editable: true,
                    inputType: "boolean"
                  },
                  {
                    title: 'Balanced',
                    dataIndex: 'balanced',
                    editable: true,
                    inputType: "boolean"
                  },
                  {
                    title: 'Reduced',
                    dataIndex: 'reduced',
                    editable: true,
                    inputType: "boolean"
                  },
                  {
                    title: 'N/A',
                    dataIndex: 'na',
                    editable: true,
                    inputType: "boolean"
                  },
                ]
            },
            paragraph5: {type: "paragraph", span: 24, description: "Comments"},
            _1:{type:"string",span:24, long:true},

            "table 3":{"type":"table", span:24, title: " ", 
            "columns": [
                  {
                      title: 'Visual ',
                      dataIndex: 'colheader',
                      editable: false,
                      colheader: ["Color", "Clutter/busy", "Art/decorations", "Visual information", "Lighting", "Other (specify):"]
                  },
                  {
                    title: 'Excessive',
                    dataIndex: 'excessive',
                    editable: true,
                    inputType: "boolean"
                  },
                  {
                    title: 'Balanced',
                    dataIndex: 'balanced',
                    editable: true,
                    inputType: "boolean"
                  },
                  {
                    title: 'Reduced',
                    dataIndex: 'reduced',
                    editable: true,
                    inputType: "boolean"
                  },
                ]
            },
            paragraph6: {type: "paragraph", span: 24, description: "Comments"},
            _2:{type:"string",span:24, long:true},

            paragraph7: {type: "paragraph", span: 24, description: "Persons Present During Observation: For each person on the list, put a check in the appropriate column indicating their level of participation. "},
            "table 4":{"type":"table", span:24, title: " ", 
            "columns": [
                  {
                      title: 'Person',
                      dataIndex: 'colheader',
                      editable: false,
                      colheader: ["Student","Special Educator","General Educator","Peer Tutors (How many? _____)","Instructional Assistant #1","Instructional Assistant #2","Instructional Assistant #3","Personal Attendant","Speech-Language Pathologist","Occupational Therapist","Physical Therapist","School Psychologist","Parent","Volunteer","Administrator","AT Specialist","Other (specify):"]
                  },
                  {
                    title: 'Participating',
                    dataIndex: 'participating',
                    editable: true,
                    inputType: "boolean"
                  },
                  {
                    title: 'Observing',
                    dataIndex: 'observing',
                    editable: true,
                    inputType: "boolean"
                  },
                  {
                    title: 'Not Present',
                    dataIndex: 'not_present',
                    editable: true,
                    inputType: "boolean"
                  },
                ]
            },

            paragraph8: {type: "paragraph", span: 24, description: "Notes:"},
            _3:{type:"string",span:24, long:true},

            paragraph9: {type: "paragraph", span: 24, description: "Access to Assistive Technology: Record the presence or absence of EACH TYPE of assistivetechnology by placing a check in the corresponding box. Record the AT found in the classroom as awhole, not just the AT used by the target student. "},

            "table 5":{"type":"table", span:24, title: " ", 
            "columns": [
                  {
                      title: 'Types',
                      dataIndex: 'colheader',
                      editable: false,
                      colheader: ["Communication cards/boards","Digitally recorded communication","devices","Electronic communication devices","AT for activities of daily living","Adjustable seating (not a wheelchair)","Positioning equipment","Amplification","Visual signaling devices","Brailler/brailled materials","Magnifiers","Notetaking devices/keyboards","Speech output devices/computers","Handwriting aids","Alternate/adapted keyboards","Alternate/adapted mouse","Computer switch interface","Touch window","Talking word processor/word","prediction/abbreviation & expansion","Transfer aids - Hoists/lifts","Mobility aids (not wheelchairs)","Adapted environment (e.g., doors,","fixtures, furniture)","Electronic equipment for instruction","(calculator, e-books)","Adapted instructional materials","Instructional software","Computer stations","Adapted art/craft materials","Adapted sports/recreation equipment","Adapted toys","Other (specify): "]
                  },
                  {
                    title: 'Present-Not Used',
                    dataIndex: 'present_not_used',
                    editable: true,
                    inputType: "boolean"
                  },
                  {
                    title: 'Present-Used',
                    dataIndex: 'present_used',
                    editable: true,
                    inputType: "boolean"
                  },
                  {
                    title: 'Not Present',
                    dataIndex: 'not_present',
                    editable: true,
                    inputType: "boolean"
                  },
                ]
            },

        }
    }
]