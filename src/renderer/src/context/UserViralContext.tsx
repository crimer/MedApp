import { InfoModal } from '@renderer/components/InfoModal'
import { useDialogHook } from '@renderer/hook/useDualogHook'
import { IacpaasResponse } from '@renderer/repository/dto/IacpaasResponse'
import { ImportDataAsync } from '@renderer/repository/IacpaasRepository'
import React, { createContext, PropsWithChildren, useCallback } from 'react'
import { useMutation, useQuery } from 'react-query'

interface IUserViralContext {
  isImporting: boolean
  startDiagnosticAsync: () => Promise<void>
}

export const UserViralContext = createContext<IUserViralContext>({
  isImporting: false,
  startDiagnosticAsync: () => {
    throw new Error('Не удалось инициализировать контекст истории болезни пациента')
  }
})

export const UserViralContextProvider: React.FC<PropsWithChildren> = ({ children }) => {

  const importDataMutation = useMutation(async () => await ImportDataAsync({clearIfExists: false, json: "", path: ""}), {
    onError: (error, variables, context) => {
        
    },
  })

  const startDiagnosticAsync = useCallback(async () => {
    // await startAsync({})
  }, [])
  

  return (
    <UserViralContext.Provider value={{ startDiagnosticAsync, isImporting: importDataMutation.isLoading }}>
      <>
        <InfoModal
          isOpen={importDataMutation.isError}
          text={(importDataMutation.error as string) ?? ''}
          title="Ошибка при импорте истории болезни"
        />
        {children}
      </>
    </UserViralContext.Provider>
  )
}
