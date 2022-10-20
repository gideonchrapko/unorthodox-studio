export default {
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
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
