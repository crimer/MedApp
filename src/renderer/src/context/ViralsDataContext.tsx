import React, { createContext, PropsWithChildren, useCallback, useEffect } from 'react'
import {
  AvailableViral,
  AvailableViralGroup,
  availableViralGroups
} from '@renderer/data/AvailableVirals'
import { initData, PatientData, useViralStore } from '@renderer/hook/useViralStore'

export type ChangePatientDataProps = {
  nationality?: string
  sex?: string
  yearUnit?: string
  year?: number
}

interface IViralsDataContext {
  availableViralGroups: AvailableViralGroup[]
  patientData: PatientData
  changeNumericViral: (viralName: string, value: number) => void
  changeQualityViral: (viralName: string, value: string) => void
  changeComplexViral: (
    viralName: string,
    characteristicName: string,
    newValue: string | number
  ) => void
  onClear: () => void
  onSelectViralItem: (viralItem: AvailableViral) => void
  onRemoveViralItem: (viralItem: AvailableViral) => void
  changePatientInfo: (data: ChangePatientDataProps) => void
}

export const ViralsDataContext = createContext<IViralsDataContext>({
  availableViralGroups: [],
  patientData: initData,
  onSelectViralItem: () => {
    throw new Error('Не удалось инициализировать контекст данных о заболеваниях')
  },
  onRemoveViralItem: () => {
    throw new Error('Не удалось инициализировать контекст данных о заболеваниях')
  },
  onClear: () => {
    throw new Error('Не удалось инициализировать контекст данных о заболеваниях')
  },
  changePatientInfo: () => {
    throw new Error('Не удалось инициализировать контекст данных о заболеваниях')
  },
  changeNumericViral: () => {
    throw new Error('Не удалось инициализировать контекст данных о заболеваниях')
  },
  changeQualityViral: () => {
    throw new Error('Не удалось инициализировать контекст данных о заболеваниях')
  },
  changeComplexViral: () => {
    throw new Error('Не удалось инициализировать контекст данных о заболеваниях')
  }
})

export const ViralsDataContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { dispatch, state } = useViralStore()

  const onSelectViralItem = useCallback(
    (viralItem: AvailableViral) => dispatch({ type: 'addViral', payload: viralItem }),
    [dispatch]
  )
  const onRemoveViralItem = useCallback(
    (viralItem: AvailableViral) => dispatch({ type: 'removeViral', payload: viralItem }),
    [dispatch]
  )

  const onClear = useCallback(() => dispatch({ type: 'clearAll' }), [dispatch])

  const changePatientInfo = useCallback(
    ({ nationality, sex, year, yearUnit }: ChangePatientDataProps) =>
      dispatch({ type: 'changePatientInfo', payload: { nationality, sex, year, yearUnit } }),
    [dispatch]
  )

  const changeNumericViral = useCallback(
    (viralName: string, value: number) => {
      dispatch({ type: 'changeNumericViral', payload: { viralName, value } })
    },
    [dispatch]
  )

  const changeQualityViral = useCallback(
    (viralName: string, value: string) =>
      dispatch({ type: 'changeQualityViral', payload: { viralName, value } }),
    [dispatch]
  )

  const changeComplexViral = useCallback(
    (viralName: string, characteristicName: string, newValue: string | number) => {
      dispatch({
        type: 'changeComplexViral',
        payload: { viralName, characteristicName, newValue }
      })
    },
    [dispatch]
  )

  useEffect(() => console.log(state), [state])

  return (
    <ViralsDataContext.Provider
      value={{
        changeComplexViral,
        changeQualityViral,
        changeNumericViral,
        changePatientInfo,
        availableViralGroups,
        onClear,
        onSelectViralItem,
        patientData: state,
        onRemoveViralItem
      }}
    >
      {children}
    </ViralsDataContext.Provider>
  )
}
