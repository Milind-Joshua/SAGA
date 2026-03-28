import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'artistName',
      title: 'Artist Name',
      type: 'string',
      description: 'e.g. "Sangeeth"',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short one-line description',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full biography — rich text, supports links and formatting',
    }),
    defineField({
      name: 'statement',
      title: 'Artist Statement',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'A personal statement about your art practice',
    }),
    defineField({
      name: 'pullQuote',
      title: 'Pull Quote',
      type: 'string',
      description: 'A short featured quote displayed prominently',
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'studioImages',
      title: 'Studio Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      validation: (rule) => rule.max(3),
      description: 'Up to 3 studio/atelier images',
    }),
    defineField({
      name: 'atelierImage',
      title: 'Atelier Section Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      description:
        'Full-width background image for the Atelier section on the About page',
    }),
    defineField({
      name: 'techniques',
      title: 'Techniques',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. "Oil on linen", "Watercolour"',
    }),
  ],
  preview: {
    select: {
      title: 'artistName',
      media: 'portrait',
    },
    prepare({ title, media }) {
      return {
        title: title || 'About',
        media,
      }
    },
  },
})
