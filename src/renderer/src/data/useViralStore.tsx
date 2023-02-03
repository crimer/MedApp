import { useReducer } from 'react'
import { AvailableViral, ViralAttributeNumeric, ViralAttributeQuality } from './AvailableVirals'

type Action =
  | {
      type: 'changePatientInfo'
      payload: {
        nationality?: string
        sex?: string
        yearUnit?: string
        year?: number
      }
    }
  | { type: 'addViral'; payload: AvailableViral }
  | { type: 'removeViral'; payload: AvailableViral }
  | { type: 'clearAll' }
  | { type: 'changeNumericViral'; payload: { viralName: string; value: number } }
  | { type: 'changeQualityViral'; payload: { viralName: string; value: string } }
  | { type: 'changeComplexViral' }

export type PatientInfo = {
  nationality: string
  sex: string
  sexValues: string[]
  year: number
  yearUnit: string
  yearUnitValues: string[]
}

export type PatientData = {
  pacient: PatientInfo
  virals: AvailableViral[]
}

const sexValues = ['мужской', 'женский']
const yearUnitValues = ['год', 'месяц', 'неделя', 'день']

const pacientInfo: PatientInfo = {
  nationality: 'Русский',
  sex: sexValues[0],
  sexValues,
  year: 30,
  yearUnit: yearUnitValues[0],
  yearUnitValues
}

export const initData: PatientData = {
  pacient: pacientInfo,
  virals: []
}

function reduce(state: PatientData, action: Action): PatientData {
  switch (action.type) {
    case 'addViral':
      return { ...state, virals: [...state.virals, action.payload] }

    case 'clearAll':
      return { pacient: pacientInfo, virals: [] }

    case 'changeNumericViral': {
      const numericElement = state.virals.find((el) => el.name === action.payload.viralName)
      if (!numericElement) return state

      const el = numericElement.attributeData as ViralAttributeNumeric
      el.value = action.payload.value

      return { ...state, virals: [...state.virals] }
    }

    case 'changeQualityViral': {
      const qualityElement = state.virals.find((el) => el.name === action.payload.viralName)
      if (!qualityElement) return state

      const el = qualityElement.attributeData as ViralAttributeQuality
      el.selected = action.payload.value

      return { ...state, virals: [...state.virals] }
    }

    case 'removeViral': {
      const isExist = state.virals.find((el) => el.name === action.payload.name)
      if (isExist)
        return {
          ...state,
          virals: [...state.virals.filter((item) => item.name !== action.payload.name)]
        }
      return state
    }

    case 'changePatientInfo':
      return {
        ...state,
        pacient: {
          ...state.pacient,
          nationality: action.payload.nationality ?? state.pacient.nationality,
          sex: action.payload.sex ?? state.pacient.sex,
          yearUnit: action.payload.yearUnit ?? state.pacient.yearUnit,
          year: action.payload.year ?? state.pacient.year
        }
      }

    default:
      return state
  }
}

export const useViralStore = () => {
  const [state, dispatch] = useReducer(reduce, initData)
  return { state, dispatch }
}
