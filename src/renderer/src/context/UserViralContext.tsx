import { PrepareSuccessorBuilder } from '@renderer/data/PrepareSuccessorBuilder'
import { ViralDataStore } from '@renderer/data/ViralStore'
import {
	ExportDataAsync,
	ImportDataAsync,
} from '@renderer/repository/IacpaasRepository'
import React, {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
} from 'react'
import { SnackbarContext } from './SnackbarContext'

interface IUserViralContext {
	handleSaveDataAsync: () => Promise<void>
}

export const UserViralContext = createContext<IUserViralContext>({
	handleSaveDataAsync: () => {
		throw new Error(
			'Не удалось инициализировать контекст истории болезни пациента'
		)
	},
})

export const UserViralContextProvider: React.FC<PropsWithChildren> = ({
	children,
}) => {
	const { openSnackbar } = useContext(SnackbarContext)

	const handleSaveDataAsync = useCallback(async () => {
		try {
			const newViral = PrepareSuccessorBuilder.Build({
				virals: ViralDataStore.Instance.allVirals,
				pacient: ViralDataStore.Instance.pacientInfo,
			})

			const medArchive = await ExportDataAsync({
				path: 'Сервис диагностики (без интерфейса, с заменяемой БЗ)/Архив Историй MedIACP',
				'export-depth': '1',
				'json-type': 'universal',
				'start-target-concept-path': '/',
			})

			if (!medArchive) {
				openSnackbar(
					`Не удалось получить 'Архив Историй MedIACP'`,
					'warning'
				)
				return
			}

			medArchive.successors = [newViral]
			const jsonData = JSON.stringify(medArchive)

			const importResult = await ImportDataAsync(
				'Сервис диагностики (без интерфейса, с заменяемой БЗ)',
				jsonData,
				false
			)

			if (!importResult || !importResult.success) {
				const error =
					importResult?.error ??
					importResult?.explanation ??
					'Получены пустые данные с платформы'
				openSnackbar(
					`Не удалось импортировать созданную историю болезни: ${error}`,
					'warning'
				)
				return
			}
			openSnackbar(
				`Получены пустые данные 'Архив Историй MedIACP'`,
				'warning'
			)
		} catch (error) {
			openSnackbar(`Ошибка сохранения данных: ${error}`, 'error')
		}
	}, [openSnackbar])

	return (
		<UserViralContext.Provider value={{ handleSaveDataAsync }}>
			{children}
		</UserViralContext.Provider>
	)
}
