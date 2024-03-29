import React from 'react'
import { Box, CssBaseline } from '@mui/material'
import { ApplicationBar } from './layout/ApplicationBar'
import { ApplicationSideBar } from './layout/ApplicationSidebar'
import { ApplicationMain } from './layout/ApplicationMain'
import { MainPage } from './pages/MainPage'
import { QueryClient, QueryClientProvider } from 'react-query'
import { DiagnosticContextProvider } from './context/DiagnosticContext'
import { UserViralContextProvider } from './context/UserViralContext'

const queryClient = new QueryClient()

export const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <UserViralContextProvider>
      <DiagnosticContextProvider>
        <Application />
      </DiagnosticContextProvider>
    </UserViralContextProvider>
  </QueryClientProvider>
)

const Application: React.FC = () => (
  <>
    <CssBaseline />
    <Box style={{ flexGrow: 1 }}>
      <ApplicationBar />
      <ApplicationSideBar />
      <ApplicationMain>
        <MainPage />
      </ApplicationMain>
    </Box>
  </>
)
