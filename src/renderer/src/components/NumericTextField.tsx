import React from 'react'
import { TextField } from '@mui/material'

interface INumericTextField {
  title: string
}

export const NumericTextField: React.FC<INumericTextField> = ({ title }) => {
  return <TextField label={title} variant="outlined" fullWidth />
}
