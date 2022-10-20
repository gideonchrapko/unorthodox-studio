export default {
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    {
      title: "Video Reel Desktop",
      name: "videoReel",
      type: "document",
      
      fields: [
      { title: "Title", name: "title", type: "string" },
        {
          title: "Reel file Desktop",
          name: "Reel",
          type: "mux.video"
        }
      ]
    },
    {
      title: "Video Reel Mobile",
      name: "videoReelMobile",
      type: "document",
      
      fields: [
      { title: "Title", name: "title", type: "string" },
        {
          title: "Reel file Mobile",
          name: "reelMobile",
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
