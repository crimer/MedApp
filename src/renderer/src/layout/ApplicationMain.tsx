import React from 'react'
import { Box, Toolbar } from '@mui/material'

export const ApplicationMain: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column'
        }}
      >
        <Toolbar />
        <Box sx={{ padding: 3 }}>{children}</Box>
      </Box>
    </>
  )
}
