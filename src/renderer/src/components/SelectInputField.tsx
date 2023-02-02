import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { newGuid } from '@renderer/utils/utils'
import React, { useState } from 'react'
import { useCallback } from 'react'

interface ISelectInput {
  title: string
  items: string[]
  onChange?: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined
}

const SelectInputFieldImpl: React.FC<ISelectInput> = ({ title, items, onChange }) => {
  const id = `selectInput_${newGuid()}`

  const [value, setValue] = useState('')
  const handleChange = useCallback(
    (event: SelectChangeEvent) => setValue(event.target.value as string),
    [setValue]
  )

  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{title}</InputLabel>
      <Select labelId={id} value={value} label={title} onChange={handleChange}>
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
