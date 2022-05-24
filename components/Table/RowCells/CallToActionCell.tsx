import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import * as React from 'react';

export interface CallToActionProps {
  type: string;
  label: string;
  checked?: boolean;
  onClick: (event: any) => void;
}

const CallToAction: React.FC = (props: CallToActionProps) => {
  switch (props.type) {
    case 'switch':
      return (
        <FormControlLabel
          control={
            <Switch
              checked={props.checked}
              onClick={props.onClick}
              label={'label'}
            />
          }
          label={props.label}
        />
      );
    case 'checkbox':
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={props.checked}
              onClick={props.onClick}
              label={'label'}
            />
          }
          label={props.label}
        />
      );
    default:
      return (
        <Button variant="outlined" onClick={props.onClick} disabled={props.disabled}>
          {props.label}
        </Button>
      );
  }
};

export default CallToAction;
