import React from 'react'

// this is how we'll interface with Payload itself
import { useFieldType } from 'payload/components/forms';

// we'll re-use the built in Label component directly from Payload
import { Label } from 'payload/components/forms';

// we can use existing Payload types easily
import { Props } from 'payload/components/fields/Text';

// Import the SCSS stylesheet
import './styles.scss';

// keep a list of variants to choose from
const defaultVariants = [
  'white',
  'black',
  'none',
  'green',
  'red',
  'green-alt'
];

const baseClass = 'button-variant-picker';

const validateVariant = (value: string = ''): true | string => {
  return defaultVariants.includes(value) || 'Please select a button variant';
}

const InputField: React.FC<Props> = (props) => {
  const {
    path,
    label,
    required
  } = props;

  const {
    value = 'white',
    setValue,
  } = useFieldType({
    path,
    validate: validateVariant,
  });

  return (
    <div className={baseClass}>
      <Label
        htmlFor={path}
        label={label}
        required={required}
      />
      <ul className={`${baseClass}__variants`}>
        {defaultVariants.map((variant, i) => (
          <li key={i}>
            <button
              type="button"
              key={variant}
              className={`fe-button fe-button--${variant} ${variant === value ? 'fe-button--selected' : ''} fe-button--clickable`}
              aria-label={variant}
              onClick={() => setValue(variant)}
            >{variant}</button>
          </li>
          )
        )}
      </ul>
    </div>
  )
};

export default InputField;
