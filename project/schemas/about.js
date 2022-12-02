export default {
    name: 'about',
    title: 'About',
    type: 'document',
    fields: [
        {
            name: 'projectDescription',
            title: 'Project Descripion',
            type: 'blockContent',
        },
        {
            name: "projectTeam",
            title: "Project Team",
            type: "array",
            of: [{type: "string"}]
        },
        {
            name: "press",
            type: "array",
            title: "Press",
            of: [
                {
                    title: "Enter Press",
                    name: "EnterPress",
                    type: "document",
                    fields: [
                        { 
                            title: "Press Title", 
                            name: "pressTitle", 
                            type: "string" 
                        },
                        {
                            title: "Press URL",
                            name: "pressURL",
                            type: "string"
                        }
                    ]
                },
            ],
        },
    ],
  }
  