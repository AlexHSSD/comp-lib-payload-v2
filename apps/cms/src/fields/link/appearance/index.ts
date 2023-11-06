import { Field } from 'payload/types';
import InputField from './InputField';
import Cell from './Cell';

const appearanceField: Field = {
  name: 'appearance',
  type: 'text',
  required: true,
  admin: {
    components: {
      Field: InputField,
      Cell,
    },
  },
};

export default appearanceField;