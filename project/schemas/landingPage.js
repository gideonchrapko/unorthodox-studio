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
      name: 'aboutCopy',
      title: 'Body',
      type: 'blockContent',
    },
  ],
}
