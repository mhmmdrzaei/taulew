// app/lib/sanity.js
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'kbbxil17', // Replace with your Sanity project ID
  dataset: 'production',
  apiVersion: '2025-05-03',
  useCdn: process.env.NODE_ENV === 'production',
})

// Helper function for Sanity images
const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)