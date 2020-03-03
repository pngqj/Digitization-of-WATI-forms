

export const schema= [
    {
        title:"", 
        "properties": 
        {
            question1: {type: "paragraph", span: 24, description: "Are there any behaviors (both positive and negative) that significantly impact the student’s performance?"},
            _1:{type:"string",span:24, long:true},
            question2: {type: "paragraph", span: 24, description: "Are there significant factors about the student’s strengths, learning style, coping strategies or interests that the team should consider?"},
            _2:{type:"string",span:24, long:true},
            question3: {type: "paragraph", span: 24, description: "Are there any other significant factors about the student that the team should consider?"},
            _3:{type:"string",span:24, long:true},
            question4: {type: "paragraph", span: 24, description: "Does student fatigue easily or experience a change in performance at different times of the day?"},
            _4:{type:"string",span:24, long:true},
        }
    }
]

export const formData =[
    {
        key:0,
        data:
        [
            ""
        ]
    }
]