import React, { PropsWithChildren } from 'react'
import { Card, CardContent, Typography } from '@mui/material'

interface IViralCard {
  title: string
}

export const ViralCard: React.FC<PropsWithChildren<IViralCard>> = ({ title, children }) => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 18 }} gutterBottom>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  )
}
