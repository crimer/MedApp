import { InfoModal } from '@renderer/components/dialogs/InfoModal'
import { RunServiceAsync } from '@renderer/repository/IacpaasRepository'
import React, { createContext, PropsWithChildren, useCallback } from 'react'
import { useMutation } from 'react-query'

const DiagnosisWithoutUiServiceId = '4640284589039782382'

interface IDiagnosticContext {
  isDiagnostic: boolean
  startDiagnosticAsync: () => Promise<void>
}

export const DiagnosticContext = createContext<IDiagnosticContext>({
  isDiagnostic: false,
  startDiagnosticAsync: () => {
    throw new Error('Не удалось инициализировать контекст диагностики')
  }
})

export const DiagnosticContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const runServiceMutation = useMutation(
    async () => await RunServiceAsync(DiagnosisWithoutUiServiceId),
    {
      onError: (error, variables, context) => {
        console.error('Ошибка запуска сервиса диагностики')
        console.error(error)
      }
    }
  )

  const startDiagnosticAsync = useCallback(async () => {
    const t = await runServiceMutation.mutateAsync()
  }, [])

  return (
    <DiagnosticContext.Provider
      value={{ startDiagnosticAsync, isDiagnostic: runServiceMutation.isLoading }}
    >
      <>
        <InfoModal
          isOpen={runServiceMutation.isError}
          text={(runServiceMutation.error as string) ?? ''}
          title="Ошибка при запуске диагностики"
        />
        {children}
      </>
    </DiagnosticContext.Provider>
  )
}
