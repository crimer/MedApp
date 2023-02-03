import React from 'react'
import { TextField } from '@mui/material'

interface INumericTextField {
  title: string
  value: number
  onChange: (value: number) => void
}

export const NumericTextField: React.FC<INumericTextField> = ({ title, value, onChange }) => {
  return (
    <TextField
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      defaultValue={value}
      label={title}
      variant="outlined"
      fullWidth
      onChange={(e) => onChange(+e.target.value)}
    />
  )
}
