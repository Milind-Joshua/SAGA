'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import type { StructureResolver } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schemaTypes } from './sanity/schemas'

const structure: StructureResolver = (S) =>
  S.list()
    .title('SAGA')
    .items([
      S.documentTypeListItem('artwork').title('Artworks'),
      S.documentTypeListItem('series').title('Series'),
      S.documentTypeListItem('exhibition').title('Exhibitions'),
      S.divider(),
      S.documentTypeListItem('siteSettings').title('Site Settings'),
      S.documentTypeListItem('about').title('About Page'),
    ])

export default defineConfig({
  name: 'saga',
  title: 'SAGA',
  basePath: '/SagaStudio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
