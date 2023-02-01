import React from 'react'
import { Box, Toolbar } from '@mui/material'

export const ApplicationMain: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Box
        component="main"
        style={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          padding: '30px'
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </>
  )
}
