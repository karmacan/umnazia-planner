import React from 'react';
import './SelectField.scss';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const SelectField = ({value, onChange, label, options, disabled = false, error}) => {
  return (
    <div className='Select-field'>
      <FormControl disabled={disabled}>
        <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          label={label}
          value={value}
          onChange={ev => onChange(ev.target.value)}
          error={error}
        >
          {options.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
