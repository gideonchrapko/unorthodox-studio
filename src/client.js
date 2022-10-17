import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: "8rgjpxp9",
    dataset: "production",
    apiVersion: '2022-10-10',
    useCdn: true
})
