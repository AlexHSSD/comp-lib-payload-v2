import type { RichTextElement } from 'payload/dist/fields/config/types'

import label from './label'
import largeBody from './largeBody'

const elements: RichTextElement[] = [
  'blockquote',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'link',
  'upload',
  largeBody,
  label,
  'ul',
  'ol',
]

export default elements
