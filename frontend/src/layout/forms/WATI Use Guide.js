

export const schema = [
    {
        title: "", 
        "properties": 
        {
            "AT to be tried":{"type":"string", highlight:true, span:24}, 
        }
    },
    {
        title: "", 
        "properties": 
        {
            "Student’s Name":{"type":"string", span:14}, 
            "DOB":{"type":"string", type:"date", span:6}, 
            "Age":{"type":"string", "integer":true, span:4}, 

            "School/Agency":{"type":"string", span:24}, 
            "Grade/Placement":{"type":"string", span:24}, 

            "Contact Person(s)":{"type":"string", span:24}, 

            "School/Agency Phone":{"type":"string", span:24}, 
            "Address":{"type":"string", span:24}, 

            "Persons Completing Guide":{"type":"string", span:24}, 

            "Parent(s) Name":{"type":"string", span:15}, 
            "Phone":{"type":"string", span:9}, 

            "Parent(s) Address":{"type":"string", span:24}, 
            "Goal for AT use":{"type":"string", span:24}, 

            paragraph1: {type: "paragraph", span: 24, description: "ACQUISITION"},
            "table 1":{"type":"table", span:24, title: "", 
                      "columns": [
                            {
                                title: 'Source(s)',
                                dataIndex: 'source',
                                editable: true,
                                colheader: ['']
                            },
                            {
                                title: 'Person Responsible',
                                dataIndex: 'person_responsible',
                                editable: true,
                            },
                            {
                                title: 'Date(s) Available',
                                dataIndex: 'date_available',
                                inputType: "date",
                                editable: true,
                            },
                            {
                                title: 'Date Received',
                                dataIndex: 'date_received',
                                inputType: "date",
                                editable: true,
                            },
                            {
                                title: 'Date Returned',
                                dataIndex: 'date_returned',
                                inputType: "date",
                                editable: true,
                            },
                      ]
            },
            "Person primarily responsible to learn to operate this AT":{"type":"string", span:24},

            paragraph2: {type: "paragraph", span: 24, description: "Training"},
            "table 2":{"type":"table", span:24, title: "", 
                      "columns": [
                            {
                                title: 'Person(s) to be trained',
                                dataIndex: 'person_to_be_trained',
                                editable: true,
                                colheader: ['']
                            },
                            {
                                title: 'Training Required',
                                dataIndex: 'training_required',
                                editable: true,
                            },
                            {
                                title: 'Date Begun',
                                dataIndex: 'date_begun',
                                inputType: "date",
                                editable: true,
                            },
                            {
                                title: 'Date Completed',
                                dataIndex: 'date_completed',
                                inputType: "date",
                                editable: true,
                            },
                      ]
            },

            paragraph3: {type: "paragraph", span: 24, description: "MANAGEMENT/SUPPORT"},
            "table 3":{"type":"table", span:24, title: "", 
                      "columns": [
                            {
                                title: 'Location(s) ',
                                dataIndex: 'location',
                                editable: true,
                                colheader: ['']
                            },
                            {
                                title: 'Support to be provided (e.g. set up, trouble shoot, recharge, program, etc.) ',
                                dataIndex: 'support_to_be_provided',
                                editable: true,
                            },
                            {
                                title: 'Person Responsible',
                                dataIndex: 'person _responsible',
                                editable: true,
                            },
                      ]
            },

            paragraph4: {type: "paragraph", span: 24, description: "Student Use"},
            "table 4":{"type":"table", span:24, title: "", 
                      "columns": [
                            {
                                title: 'Date',
                                dataIndex: 'date',
                                inputType:"date",
                                editable: true,
                                colheader: ['']
                            },
                            {
                                title: 'Time Used',
                                dataIndex: 'support_to_be_provided',
                                editable: true,
                            },
                            {
                                title: 'Location',
                                dataIndex: 'location',
                                editable: true,
                            },
                            {
                                title: 'Task(s)',
                                dataIndex: 'task',
                                editable: true,
                            },
                            {
                                title: 'Outcome(s)',
                                dataIndex: 'outcome',
                                editable: true,
                            },
                      ]
            },

        }
    },
]