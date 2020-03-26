

export const schema = [
    {
        title:"", 
        "properties": 
        {
            question1: {type: "paragraph", span: 24, description: "Activity/Task(s) observed: "},
            _1:{type:"string",span:24, long:true},
            question2: {type: "paragraph", span: 24, description: "Ways that typical students participated: "},
            _2:{type:"string",span:24, long:true},
            question3: {type: "paragraph", span: 24, description: "Ways the target student participated: "},
            _3:{type:"string",span:24, long:true},
            question4: {type: "paragraph", span: 24, description: "Barriers to target student’s participation: "},
            _4:{type:"string",span:24, long:true},

            paragraph1: {type: "paragraph", span: 24, isHTML:true,
                description: "\
                <p>Adapted from: </p>\
                <p>Wirkus-Pallaske, M., Reed, P., & Stokes, S. (2000). Wisconsin Assistive Technology Initiative. Oshkosh, WI: Wisconsin\
                Assistive Technology Initiative. </p>\
                <p>Center for Instructional Development and Research. (1998). Classroom observation. CIDR Teaching and Learning\
                Bulletin, 1(4), Available online: <a href='http://depts.washington.edu/ObsTools.htm'>http://depts.washington.edu/ObsTools.htm</a></p>\
                <p>Pearson, L. (no date). Apraxia guide: Classroom observation checklist. Available online:\
                <a href='http://hometown.aol.com/lynetteprs/myhomepage/profile.html'>http://hometown.aol.com/lynetteprs/myhomepage/profile.html</a></p>\
                "
            },

            


        }
    }
]