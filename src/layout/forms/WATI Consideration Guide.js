

export const schema = [
    { 
        title:"",
        "properties": 
        {
            "Student's Name":{"type":"string", span:12}, 
            "School":{"type":"string", span:12},
            "long paragraph 1":{"type":"paragraph", span:24, 
            description: "1. What task is it that we want this student to do, that s/he is unable to do at a level that reflects his/her skills/abilities (writing, reading, communicating, seeing, hearing)? Document by checking each relevant task below. Please leave blank any tasks that are not relevant to the student’s IEP. \n2. Is the student currently able to complete tasks with special strategies or accommodations? If yes, describe in Column A for each checked task. \n3. Is there available assistive technology (either devices, tools, hardware, of software) that could be used to address this task? (If none are known, review WATI’s AT Checklist.) If any assistive technology tools are currently being used (or were tried in the past), describe in Column B. \n4. Would the use of assistive technology help the student perform this skill more easily or efficiently, in the least restrictive environment, or perform successfully with less personal assistance? If yes, complete Column C."},
            "table 1":{"type":"table", span:24, title: " ", needCheckBox:true, 
                      "columns": [
                            {
                                title: 'task',
                                dataIndex: 'colheader',
                                editable: false,
                                colheader: ['Motor Aspects of Writing', 'Computer Access', 'Composing Written Material','Communication','Reading','Learning/ Studying', 'Math', 'Recreation and Leisure','Activities of Daily Living (ADLs)','Mobility','Environmental Control','Positioning and Seating','Vision','Hearing']
                            },
                            {
                                title: 'A. If currently completes task with special strategies/ accomodation, describe.',
                                dataIndex: 'dataA',
                                editable: true,
                            },
                            {
                                title: 'B. If currently completes task with assistive technology tools, describe.',
                                dataIndex: 'dataB',
                                editable: true,
                            },
                            {
                                title: 'C. Describe new assistive technology to be tried.',
                                dataIndex: 'dataC',
                                editable: true,
                            }
                      ]
            },
            question: {type: "paragraph", span: 24, description: "5. Are there assistive technology services (more specific evaluation of need for assistive technology, adapting or modifying the assistive technology, technical assistance on its operation or use, or training of student, staff, or family) that this student needs? If yes, describe what will be provided, the initiation and duration. "},
            _:{type:"string",span:24, long:true},
            "Persons Present": {"type":"string", span:18}, "Date": {type:"date", span:6}

        }
    }
]

const tasks = ['Motor Aspects of Writing', 'Computer Access', 'Composing Written Material','Communication','Reading','Learning/ Studying', 'Math', 'Recreation and Leisure','Activities of Daily Living (ADLs)','Mobility','Environmental Control','Positioning and Seating','Vision','Hearing']
const tableData = []

for(let i in tasks){
    tableData.push(
        {
            key: i,
            colheader: tasks[i],
            dataA: '',
            dataB: '',
            dataC: '',
            enabled: false
        }
    )
}

export const formData = [
    {
        key: 0,
        data: 
        [
            "", "", null, tableData,
            "", ""

        ]
    }
]

//////////////////////////////////////////////////////////////////////////