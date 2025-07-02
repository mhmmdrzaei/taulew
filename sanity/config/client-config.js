import imageUrlBuilder from '@sanity/image-url'

const config = {
  projectId: 'kbbxil17',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
}
export default config

// Helper function for Sanity images
const builder = imageUrlBuilder(config)
export const urlFor = (source) => builder.image(source)