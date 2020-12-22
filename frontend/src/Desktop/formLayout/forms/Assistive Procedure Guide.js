export const schema = [
    { 
        title:"",
        "properties": 
        {
          "School District/Agency":{type:"string", span:12}, "School":{type:"string", span:12},
          "Student":{type:"string", span:12}, "Grade":{type:"string", span:12},
          "Team Members":{type:"string", span:12},
          "table 1":
          {"type":"table", span:24, title: " ", needCheckBox:false,
          "columns": [
                {
                    title: '',
                    dataIndex: 'colheader',
                    width:"50%",
                    editable: false,
                    isHTML:true,
                    colheader: ['\
                    <h5>Gathering Information:</h5>\
                    <h6>Step 1: Team Members Gather Information</h6>\
                    <p>\
                        Review existing information regarding child’s abilities,\
                        difficulties, environment, and tasks. If there is missing\
                        information, you will need to gather the information by\
                        completing formal tests, completing informal tests, and/or\
                        observing the child in various settings. The WATI Student\
                        Information Guide and Environmental Observation Guide are\
                        used to assist with gathering information. Remember, the team\
                        gathering this information should include parents, and if\
                        appropriate, the student.\
                    </p>\
                    ', '\
                    <h6>Step 2: Schedule Meeting</h6>\
                    <p>\
                        Schedule a meeting with the team. Team includes: parents,\
                        student (if appropriate), service providers (e.g. spec. ed. teacher,\
                        general ed. teacher, SLP, OT, PT, administrator), and any others\
                        directly involved or with required knowledge and expertise.\
                    </p>\
                    ', '\
                    <h5>Decision Making:</h5>\
                    <h6>\
                        Step 3: Team Completes Problem Identification Portion of\
                        AT Planning Guide at the Meeting.\
                    </h6>\
                    <h6 style="margin-left:15px;">\
                        (Choose someone to write all topics where everyone\
                        participating can see them.)\
                    </h6>\
                    <p style="margin-left:15px;">\
                        The team should move quickly through:\
                        <ul>\
                        <li>Listing the student’s abilities/difficulties related to tasks (5-10\
                        minutes).</li>\
                        <li>Listing key aspects of the environment in which the student\
                        functions and the student’s location and positioning within the\
                        environment (5-10 minutes).</li>\
                        <li>Identifying the tasks the student needs to be able to do is\
                        important because the team cannot generate AT solutions until\
                        the tasks are identified (5-10 minutes).</li>\
                        </ul>\
                    </p>\
                    <p>\
                        (Note: The emphasis in problem identification is identifying tasks\
                        the student needs to be able to do and the relationship of the\
                        student’s abilities/difficulties and characteristics of the environment\
                        of the child’s performance of the tasks.)\
                    </p>\
                    ', '\
                    <h6>Step 4: Prioritize the List of Tasks for Solution Generation</h6>\
                    <p>\
                        Identify critical task for which the team will generate potential\
                        solutions. This may require a redefining or reframing of the\
                        original referral question, but is necessary so that you hone in on\
                        the most critical task\
                    </p>\
                    ', '\
                    <h6>Step 5: Solution Generation</h6>\
                    <p>Brainstorm all possible solutions.</p>\
                    <p>\
                        <strong>Note:</strong> The specificity of the solutions will vary depending on the\
                        knowledge and experience of the team members; some teams may\
                        generate names of specific devices with features that will meet the\
                        child’s needs, other teams may simply talk about features that are\
                        important, e.g. “needs voice output,” “needs to be portable,”\
                        “needs few (or many) messages,” “needs input method other than\
                        hands,” etc. Teams may want to use specific resources to assist\
                        with solution generation. These resources include, but are not\
                        limited to: the AT Checklist, the ASNAT Manual, the Tool Box in\
                        <i>Computer and Web Resources for People with Disabilities, Closing\
                        the Gap Resource Directory,</i> and/or AT Consultant. \
                    </p>\
                    ','\
                    <h6>Step 6: Solution Selection</h6>\
                    <p>\
                        Discuss the solutions listed, thinking about which are most\
                        effective for the student. It may help to group solutions that can be\
                        implemented 1) immediately, 2) in the next few months, and 3) in\
                        the future. At this point list names of specific devices, hardware,\
                        software, etc. If the team does not know the names of devices, etc.,\
                        use resources noted in Step 5 or schedule a consultation with a\
                        knowledgeable resource person (that is the part of the decision-making that should require the most time. Plan on 20-30 minutes\
                        here).\
                    </p>\
                    ','\
                    <h6>Step 7: Implementation Plan</h6>\
                    <p>\
                        Develop implementation plan (including trials with equipment) –\
                        being sure to assign specific names and dates, and determine\
                        meeting date to review progress (follow-up Plan).\
                    </p>\
                    <p>\
                        <strong>Reminder:</strong> Steps 3-7 occur in a meeting with all topics written\
                        where all participants can see them. Use a flip chart, board or\
                        overhead during the meeting, because visual memory is an\
                        important supplement to auditory memory. Following the meeting,\
                        ensure that someone transfers the information to paper for the\
                        child’s file for future reference. \
                    </p>\
                    ', '\
                    <h6>Trial Use: </h6>\
                    <h6>Step 8: Implement Planned Trials</h6>\
                    <h6>Step 9: Follow Up on Planned Date </h6>\
                    <p>\
                        Review trial use. Make any needed decisions about permanent\
                        use. Plan for permanent use.\
                    </p>\
                    ']
                },
                {
                    title: 'Date Completed',
                    dataIndex: 'dateCompleted',
                    editable: true,
                    minRows:10,
                    inputType: 'date'
                },
              {
                  title: 'Comments',
                  dataIndex: 'comments',
                  editable: true,
                  minRows:10,
              }
          ]
},

        }
    }
]
