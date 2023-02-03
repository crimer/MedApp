import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { newGuid } from '@renderer/utils/utils'
import React, { useCallback } from 'react'

interface ISelectInput {
  title: string
  defaultValue: string
  items: string[]
  onChange: (value: string) => void
}

const SelectInputFieldImpl: React.FC<ISelectInput> = ({ title, items, onChange, defaultValue }) => {
  const id = `selectInput_${newGuid()}`

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      onChange(event.target.value as string)
    },
    [onChange]
  )

  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{title}</InputLabel>
      <Select labelId={id} value={defaultValue} label={title} onChange={handleChange}>
        {items.map((el) => (
          <MenuItem key={newGuid()} value={el}>
            {el}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export const SelectInputField = React.memo(SelectInputFieldImpl)
