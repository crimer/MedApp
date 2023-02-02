import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Button, Divider } from '@mui/material'
import { DiagnosticContext } from '@renderer/context/DiagnosticContext'

export const ApplicationBar: React.FC = () => {
  const { startDiagnosticAsync } = useContext(DiagnosticContext)

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" style={{ flexGrow: 1, display: 'block' }}>
          IACPaaS Med App
        </Typography>
        <Button variant="contained" color="info">
          Отчистить
        </Button>
        <Divider orientation="vertical" style={{ margin: '0 10px 0 10px' }} />
        <Button variant="contained" color="info">
          Сохранить
        </Button>
        <Divider orientation="vertical" style={{ margin: '0 10px 0 10px' }} />
        <Button variant="contained" color="info" onClick={startDiagnosticAsync}>
          Запуск диагностики
        </Button>
      </Toolbar>
    </AppBar>
  )
}
