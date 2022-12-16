// import {
//     orderRankField,
//     orderRankOrdering,
//   } from '@sanity/orderable-document-list';

export default {
    name: 'uxProject',
    title: 'UX Project Upload',
    type: 'document',
    // orderings: [orderRankOrdering],
    fields: [
        // orderRankField({ type: 'uxProject' }),
        {
            name: "projectTitle",
            title: "Project Title",
            type: "string",
            validation: Rule => Rule.required()
        },
        {
            name: "slugRoute",
            title: "Slug Route",
            type: "slug",
            validation: Rule => Rule.required(),
            options: {
                source: 'projectTitle',
                maxLength: 200,
                slugify: input => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .slice(0, 200)
              }
        },
        {
            name: "projectDate",
            title: "Project Date",
            type: "string",
            validation: Rule => Rule.required()
        },
        {
            name: "clients",
            type: "array",
            title: "Client",
            of: [
              {
                type: "reference",
                to: { 
                    type: "uxClients" 
                },
              },
            ],
        },
        {
            name: 'projectDescription',
            title: 'Project Descripion',
            type: 'blockContent',
            validation: Rule => Rule.required(),
        },
        {
            name: "projectTeam",
            title: "Project Team",
            type: "array",
            validation: Rule => Rule.required(),
            of: [{type: "string"}]
        },
        {
            title: "Video Post",
            name: "videoPost",
            type: "document",
            
            fields: [
            { title: "Title", name: "title", type: "string" },
              {
                title: "Video file",
                name: "video",
                type: "mux.video"
              }
            ]
        },
        {
            name: 'projectImages',
            title: 'Project Images',
            type: 'array',
            validation: Rule => Rule.required(),
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
  