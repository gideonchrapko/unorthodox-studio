export default {
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    {
      name: 'LandingPageReel',
      title: 'Landing Page Reel Upload',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: "Video Reel",
      name: "videoReel",
      type: "document",
      
      fields: [
      { title: "Title", name: "title", type: "string" },
        {
          title: "Reel file",
          name: "Reel",
          type: "mux.video"
        }
      ]
    },
    {
      name: 'aboutCopy',
      title: 'Body',
      type: 'blockContent',
    },
  ],
}
