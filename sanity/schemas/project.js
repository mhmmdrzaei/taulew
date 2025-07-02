// sanity/schemas/project.js
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: "year",
      title:"Year",
      type: "number",
      group: 'settings'
    }),
    defineField({
  name: 'order',
  title: 'Order Override',
  type: 'number',
  description: 'if you want a work to be first in a year instead of alphabetical. Lower numbers go up first.',
   group: 'settings',
  
}),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      group: 'content',
      of: [
        {
          name: "gallery",
          title: "Gallery",
          type: "gallery"
        },
        {
          name: "video",
          title: "Video",
          type: "video"
        },
      ],
    }),
      defineField({
        name: "textinfo",
        title: "Text Info",
        type: 'array', 
        of: [{type: 'block'}]
      }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'settings',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'meta_title',
      title: 'Meta Title',
      type: 'string',
      group: 'settings',
    }),
    defineField({
      name: 'meta_description',
      title: 'Meta Description',
      type: 'text',
      group: 'settings',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image - [1280x630 min]',
      type: 'image',
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'ogImage',
    },
  },
})