import { InfoModal } from '@renderer/components/dialogs/InfoModal'
import { ExportDataAsync, ImportDataAsync } from '@renderer/repository/IacpaasRepository'
import React, { createContext, PropsWithChildren, useCallback, useContext } from 'react'
import { useMutation } from 'react-query'
import { SnackbarContext } from './SnackbarContext'

interface IUserViralContext {
  importDataAsync: () => Promise<void>
}

export const UserViralContext = createContext<IUserViralContext>({
  importDataAsync: () => {
    throw new Error('Не удалось инициализировать контекст истории болезни пациента')
  }
})

export const UserViralContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { openSnackbar } = useContext(SnackbarContext)

  const importDataMutation = useMutation(
    async () => await ImportDataAsync({ clearIfExists: false, json: '', path: '' }),
    {
      onError: (error, variables, context) => {}
    }
  )

  const getDataMutation = useMutation(
    async () =>
      await ExportDataAsync({
        path: 'Сервис диагностики (без интерфейса, с заменяемой БЗ)/Архив Историй MedIACP',
        'export-depth': '1',
        'json-type': 'universal',
        'start-target-concept-path': '/'
      }),
    {
      onError: (error, variables, context) => {
        openSnackbar(`Ошибка получения данных 'Архив Историй MedIACP': ${error}`, 'error')
      }
    }
  )

  const importDataAsync = useCallback(async () => {
    const result = await getDataMutation.mutateAsync()
    const t = result.date
  }, [])

  return (
    <UserViralContext.Provider value={{ importDataAsync }}>{children}</UserViralContext.Provider>
  )
}
