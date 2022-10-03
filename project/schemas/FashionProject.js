export default {
    name: 'fashionProject',
    title: 'Fashion Project Upload',
    type: 'document',
    fields: [
        {
            name: "slugRoute",
            title: "Slug Route",
            type: "slug"
        },
        {
            name: "projectTitle",
            title: "Project Title",
            type: "string"
        },
        {
            name: "projectDate",
            title: "Project Date",
            type: "string"
        },
        {
            name: "clients",
            type: "array",
            title: "Client",
            of: [
              {
                type: "reference",
                to: {
                  type: "clients",
                },
              },
            ],
        },
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
            name: 'projectImages',
            title: 'Project Images',
            type: 'array',
            of: [
                {
                    name: 'image',
                    type: 'image',
                    title: 'Image',
                    options: {
                    hotspot: true,
                    },
                },
            ]
        },
    ],
  }
  