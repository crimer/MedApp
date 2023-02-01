import { InfoModal } from '@renderer/components/InfoModal'
import { useDialogHook } from '@renderer/hook/useDualogHook'
import { IacpaasResponse } from '@renderer/repository/dto/IacpaasResponse'
import { RunServiceAsync } from '@renderer/repository/IacpaasRepository'
import React, { createContext, PropsWithChildren, useCallback } from 'react'
import { useMutation, useQuery } from 'react-query'

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
  const { close, isOpen } = useDialogHook()

  const runServiceMutation = useMutation(async () => await RunServiceAsync(), {
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {}
  })

  const startDiagnosticAsync = useCallback(async () => {
    const t = await runServiceMutation.mutateAsync('123123')
	
  }, [])

  return (
    <DiagnosticContext.Provider value={{ startDiagnosticAsync, isDiagnostic: isLoading }}>
      <>
		<InfoModal
		isOpen={isOpen}
		onClose={close}
		text={(error as string) ?? ''}
		title="Ошибка при запуске диагностики"
		/>
        {children}
      </>
    </DiagnosticContext.Provider>
  )
}
