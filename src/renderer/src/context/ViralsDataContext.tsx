import React, {
	createContext,
	PropsWithChildren,
	useCallback,
	useState,
} from 'react'
import {
	AvailableViral,
	AvailableViralGroup,
	availableViralGroups,
} from '@renderer/data/AvailableVirals'

export type ChangePatientDataProps = {
	nationality?: string
	sex?: string
	yearUnit?: string
	year?: number
}

interface IViralsDataContext {
	availableViralGroups: AvailableViralGroup[]
	selectedVirals: AvailableViral[]
	patientInfo: PatientInfo,
	onClear: () => void
	onSelectViralItem: (viralItem: AvailableViral) => void
	onRemoveViralItem: (viralItem: AvailableViral) => void
	setPatientData: (data: Partial<PatientInfo>) => void
}

export type PatientInfo = {
	nationality: string
	sex: string
	year: number
	yearUnit: string
}

export const sexValues = ['мужской', 'женский']
export const yearUnitValues = ['год', 'месяц', 'неделя', 'день']

export const pacientInfoInit: PatientInfo = {
	nationality: 'Русский',
	sex: sexValues[0],
	year: 30,
	yearUnit: yearUnitValues[0],
}

export const ViralsDataContext = createContext<IViralsDataContext>({
	availableViralGroups: [],
	selectedVirals: [],
	patientInfo: pacientInfoInit,
	onSelectViralItem: () => {
		throw new Error(
			'Не удалось инициализировать контекст данных о заболеваниях'
		)
	},
	onRemoveViralItem: () => {
		throw new Error(
			'Не удалось инициализировать контекст данных о заболеваниях'
		)
	},
	onClear: () => {
		throw new Error(
			'Не удалось инициализировать контекст данных о заболеваниях'
		)
	},
	setPatientData: () => {
		throw new Error(
			'Не удалось инициализировать контекст данных о заболеваниях'
		)
	},
})

export const ViralsDataContextProvider: React.FC<PropsWithChildren> = ({
	children,
}) => {
	const [selectedVirals, setSelectedVirals] = useState<AvailableViral[]>([])
	const [patientInfo, setPatientInfo] = useState<PatientInfo>(pacientInfoInit)

	const onSelectViralItem = useCallback(
		(viralItem: AvailableViral) => {
			setSelectedVirals((prev) => [...prev, viralItem])
		},
		[setSelectedVirals]
	)
	const onRemoveViralItem = useCallback(
		(viralItem: AvailableViral) =>
			setSelectedVirals((prev) => [
				...prev.filter((item) => item.name !== viralItem.name),
			]),
		[setSelectedVirals]
	)

	const onClear = useCallback(
		() => {
			setSelectedVirals([])
			setPatientInfo(pacientInfoInit)
		},
		[setSelectedVirals,setPatientInfo]
	)

	const setPatientData = useCallback(
		({ nationality, sex, year, yearUnit }: Partial<PatientInfo>) => {
			setPatientInfo((prev) => ({
				...prev,
				nationality: nationality ?? prev.nationality,
				sex: sex ?? prev.sex,
				yearUnit: yearUnit ?? prev.yearUnit,
				year: year ?? prev.year,
			}))
		},
		[setSelectedVirals]
	)

	return (
		<ViralsDataContext.Provider
			value={{
				availableViralGroups,
				patientInfo,
				onClear,
				onSelectViralItem,
				onRemoveViralItem,
				selectedVirals,
				setPatientData,
			}}>
			{children}
		</ViralsDataContext.Provider>
	)
}
