import React from 'react'
import { Box, CssBaseline } from '@mui/material'
import { ApplicationBar } from './layout/ApplicationBar'
import { ApplicationSideBar } from './layout/ApplicationSidebar'
import { ApplicationMain } from './layout/ApplicationMain'
import { MainPage } from './pages/MainPage'
import { QueryClient, QueryClientProvider } from 'react-query'
import { DiagnosticContextProvider } from './context/DiagnosticContext'
import { UserViralContextProvider } from './context/UserViralContext'
import { ViralsDataContextProvider } from './context/ViralsDataContext'
import { SnackbarContextProvider } from './context/SnackbarContext'

const queryClient = new QueryClient()

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarContextProvider>
        <ViralsDataContextProvider>
          <UserViralContextProvider>
            <DiagnosticContextProvider>
              <Application />
            </DiagnosticContextProvider>
          </UserViralContextProvider>
        </ViralsDataContextProvider>
      </SnackbarContextProvider>
    </QueryClientProvider>
  )
}
const Application: React.FC = () => (
  <>
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline />
      <ApplicationBar />
      <ApplicationSideBar />
      <ApplicationMain>
        <MainPage />
      </ApplicationMain>
    </Box>
  </>
)
