import React from 'react'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { SelectInputField } from '../components/SelectInputField'
import { NumericTextField } from '@renderer/components/NumericTextField'

export const MainPage: React.FC = () => {
  return (
    <>
      <PacientDataForm />
      <Button variant="contained">Hello World</Button>
    </>
  )
}

export const PacientDataForm: React.FC = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Данные пациента
        </Typography>

        <TextField label="Национальность" variant="outlined" />
        {/* <SelectInputField title="Пол" items={} onChange={} /> */}
        <NumericTextField title="Возраст" />
        {/* <SelectInputField title="Возраст" items={} onChange={} /> */}
      </CardContent>
    </Card>
  )
}
