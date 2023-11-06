import { Block } from 'payload/types';
import { blockFields } from '../../fields/blockFields';

export const DuskTestimonialsBlock: Block = {
  slug: 'duskTestimonialsBlock',
  labels: {
    singular: 'Dusk Testimonials Block',
    plural: 'Dusk Testimonials Blocks',
  },
  graphQL: {
    singularName: 'DuskTestimonialsBlock',
  },
  fields: [
    blockFields({
      name: 'duskTestimonialsBlockFields',
      fields: [
        {
          name: 'testimonials',
          type: 'array',
          minRows: 2,
          fields: [
            {
              type: 'textarea',
              name: 'testimonial',
              required: true,
            },
            {
              type: 'text',
              name: 'name',
              required: true,
            }
          ]
        },
      ]
    }),
  ],
};
