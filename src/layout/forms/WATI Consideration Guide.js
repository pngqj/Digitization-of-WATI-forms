

export const schema = [
    { 
        title:"sample",
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
                                width:"10%",
                                editable: false,
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
            _:{"type":"long string", span:24},
            "Persons Present": {"type":"string", span:18}, "Date": {type:"date", span:6}

        }
    }
]

const tasks = ['Motor Aspects of Writing', 'Computer Access', 'Composing Written Material','Communication','Reading','Learning/ Studying', 'Math', 'Recreation and Leisure','Activities of Daily Living (ADLs)','Mobility','Environmental Control','Positioning and Seating','Vision','Hearing']
const tableData = []

for(let i in tasks){
    if(i == 0){
        tableData.push(
            {
                key: i,
                colheader: tasks[i],
                dataA: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet laoreet odio, sed tristique augue.\nInteger sagittis egestas enim vitae volutpat. Etiam a sollicitudin est. ',
                dataB: 'Phasellus auctor justo sem. Aliquam ac dolor et augue ullamcorper venenatis at nec orci. Duis molestie odio sed leo semper pulvinar.\nVivamus scelerisque sollicitudin nisl, vel viverra ipsum interdum ut.',
                dataC: 'Mauris a sagittis odio. Sed dictum enim sit amet massa lacinia ultrices. Duis tincidunt, orci maximus maximus blandit, ligula ante viverra tellus, et efficitur leo leo quis tortor. Proin faucibus eros hendrerit, pulvinar nibh sit amet, consectetur neque. Vestibulum egestas massa sit amet mauris viverra tempor. ',
                enabled: true
            }
        )
    }
    else{
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
}

export const formData = [
    {
        key: 0,
        data: 
        [
            "test_name", "xxx primary school", null, tableData,
            "", "Mauris sodales eget elit eu viverra. Sed nec porta lectus. Morbi tristique odio at odio venenatis dignissim. Pellentesque ut neque vitae ex varius auctor. Maecenas efficitur nec diam a maximus. Phasellus id libero pellentesque, tincidunt erat ac, facilisis enim. Cras convallis maximus ante, quis tincidunt tortor imperdiet ut. Curabitur aliquet justo felis, non pellentesque purus laoreet non. Praesent dapibus, urna vitae sodales egestas, dolor nibh consectetur felis, a gravida ex elit a purus. Quisque dui diam, convallis ac nulla sagittis, varius ultrices purus. "

        ]
    }
]

//////////////////////////////////////////////////////////////////////////