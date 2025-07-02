// sanity/schemas/settings.js
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'subTitle',
      title: 'Sub Heading',
      type: 'text',
    }),
    defineField({
      name: 'mainHeadingMenu',
      title: 'Main Heading Menu',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'page' }, { type: 'category' }],
        },
      ],
    }),

    defineField({
      name: 'siteDescription',
      title: 'Site Description (for SEO)',
      type: 'text'
    }),
    defineField({
      name: 'seoImg',
      title: 'SEO Image',
      type: 'image'
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
    },
    prepare({ title }) {
      return {
        title: title || 'Site Settings',
      }
    },
  },
})