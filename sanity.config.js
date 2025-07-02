
// sanity.config.js
import { defineConfig } from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { myStructure } from './sanity/struture'
import { iconPicker } from 'sanity-plugin-icon-picker';
import StudioLogo from './app/components/CompanyLogo'

export default defineConfig({
  name: 'default',
  title: 'Tau Lewis',
  
  projectId: 'kbbxil17', // Replace with your Sanity project ID
  dataset: 'production',
    icon: StudioLogo,
  
  plugins: [ structureTool({structure:myStructure}) , visionTool(),iconPicker()],
  
  schema: {
    types: schemaTypes,
  },
  
  basePath: '/studio',
})