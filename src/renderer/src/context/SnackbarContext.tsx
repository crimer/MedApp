import React, { createContext, PropsWithChildren, useCallback, useState } from 'react'
import { Alert, AlertColor, Snackbar } from '@mui/material'

interface ISnackbarContext {
  openSnackbar: (text: string, severity?: AlertColor | undefined) => void
}

export const SnackbarContext = createContext<ISnackbarContext>({
  openSnackbar: () => {
    throw new Error('Не удалось инициализировать контекст снекбаров')
  }
})

type SnackbarConfig = {
  isOpen: boolean
  text: string
  severity?: AlertColor | undefined
}

export const SnackbarContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [config, setConfig] = useState<SnackbarConfig>({
    isOpen: false,
    text: '',
    severity: 'success'
  })

  const openSnackbar = useCallback(
    (text: string, severity?: AlertColor | undefined) =>
      setConfig({ isOpen: true, text: text, severity }),
    [setConfig]
  )
  const closeSnackbar = useCallback(
    () => setConfig((prev) => ({ ...prev, isOpen: false })),
    [setConfig]
  )

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      <Snackbar open={config.isOpen} onClose={closeSnackbar} autoHideDuration={6000}>
        <Alert
          variant="filled"
          onClose={closeSnackbar}
          severity={config.severity}
          sx={{ width: '100%' }}
        >
          {config.text}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  )
}
