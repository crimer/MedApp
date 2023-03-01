import React, { useCallback } from 'react'
import { TextField } from '@mui/material'

interface INumericTextField {
  title: string
  value: number
  onChange: (value: number) => void
}

const regex = /^[0-9\b]+$/
function isNumeric(s) {
  return !isNaN(s - parseFloat(s)) && regex.test(s)
}

export const NumericTextField: React.FC<INumericTextField> = ({ title, value, onChange }) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (isNumeric(e.target.value)) {
      onChange(+e.target.value)
    }
  },[onChange])

  return (
    <TextField
      type="number"
      value={value}
      label={title}
      variant="outlined"
      fullWidth
      onChange={handleChange}
    />
  )
}
