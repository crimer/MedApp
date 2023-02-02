import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { newGuid } from '@renderer/utils/utils'
import React from 'react'

interface ISelectInput {
  title: string
  items: string[]
  onChange?: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined
}

export const SelectInputField: React.FC<ISelectInput> = ({ title, items, onChange }) => {
  const id = `selectInput_${newGuid()}`
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{title}</InputLabel>
      <Select labelId={id} value={''} label={title} onChange={onChange}>
        {items.map((el) => (
          <MenuItem key={newGuid()} value={el}>
            {el}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
