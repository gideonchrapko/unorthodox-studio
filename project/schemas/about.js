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
    ],
  }
  