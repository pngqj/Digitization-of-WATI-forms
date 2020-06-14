

export const schema = [
    {
        title:"",
        "properties":{
            "Student’s Name":{"type":"string", span:14}, 
            "Age":{"type":"string", "integer":true, span:4}, 
            "Date Completed":{"type":"string", type:"date", span:6},

            "Person(s) Completing Summary":{"type":"string", span:24}, 
            "Task Being Addressed During Trial":{"type":"string", span:24}, 
            "Criteria for Success":{"type":"string", span:24}, 

            "table 1":{"type":"table", span:24, title: "", needAddButton:true,
                      "columns": [
                            {
                                title: 'AT Tried ',
                                dataIndex: 'source',
                                editable: true,
                                colheader: ['']
                            },
                            {
                                title: 'Dates Used',
                                dataIndex: 'date_used',
                                inputType: "date",
                                editable: true,
                            },
                            {
                                title: 'Criteria Met? ',
                                dataIndex: 'criteria_met',
                                inputType: "boolean",
                                editable: true,
                            },
                            {
                                title: 'Comments (e.g. advantages, disadvantages, preferences, performance) ',
                                dataIndex: 'comments',
                                editable: true,
                            },
                      ]
            },

            paragraph1: {type: "paragraph", span: 24, description: "Recommendations for IEP:"},
            "_1":{"type":"string", long:true, span:24}, 


        }
    }
]