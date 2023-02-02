import { FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material'
import { MenuItem } from 'electron'
import React from 'react'



interface ISelectInput {
  title: string
  items: string[]
  onChange?: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined
}

export const SelectInputField: React.FC<ISelectInput> = ({ title, items, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="selectInput">{title}</InputLabel>
      {/* <Select labelId="selectInput" value={age} label={title} onChange={onChange}>
        <MenuItem value="">None</MenuItem> */}
        {/* {items.map((el) => (
          <MenuItem value={el.value}>{el.name}</MenuItem>
        ))} */}
      {/* </Select> */}
    </FormControl>
  )
}
