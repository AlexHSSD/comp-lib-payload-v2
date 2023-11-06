import { Block } from 'payload/types';
import { blockFields } from '../../fields/blockFields';

export const GalleryBlock: Block = {
  slug: 'galleryBlock',
  labels: {
    singular: 'Gallery Block',
    plural: 'Gallery Blocks',
  },
  graphQL: {
    singularName: 'GalleryBlock',
  },
  fields: [
    blockFields({
      name: 'galleryBlockFields',
      fields: [
        {
          name: 'images',
          type: 'array',
          minRows: 3,
          required: true,
          fields: [
            {
              name: 'media',
              type: 'upload',
              required: true,
              relationTo: 'media',
              filterOptions: {
                mimeType: { contains: "image" },
              },
            },
          ]
        }
      ]
    }),
  ],
};
