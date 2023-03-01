import React, { useCallback, useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Button, Divider } from '@mui/material'
import { DiagnosticContext } from '@renderer/context/DiagnosticContext'
import { ViralsDataContext } from '@renderer/context/ViralsDataContext'
import { UserViralContext } from '@renderer/context/UserViralContext'
import { ViralDataStore } from '@renderer/data/ViralStore'

export const ApplicationBar: React.FC = () => {
	const { startDiagnosticAsync } = useContext(DiagnosticContext)
	const { handleSaveDataAsync } = useContext(UserViralContext)
	const { onClear } = useContext(ViralsDataContext)

	const startAsync = useCallback(async () => {
		await handleSaveDataAsync()
		// await startDiagnosticAsync()
	}, [handleSaveDataAsync])

	const clear = useCallback(async () => {
		ViralDataStore.Instance.clearAll()
		onClear()
	}, [onClear])

	return (
		<AppBar
			position='fixed'
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			<Toolbar>
				<Typography
					variant='h6'
					noWrap
					component='div'
					style={{ flexGrow: 1, display: 'block' }}>
					IACPaaS Med App
				</Typography>
				<Button variant='contained' color='info' onClick={clear}>
					Отчистить
				</Button>
				<Divider
					orientation='vertical'
					style={{ margin: '0 10px 0 10px' }}
				/>
				<Button variant='contained' color='info'>
					Сохранить
				</Button>
				<Divider
					orientation='vertical'
					style={{ margin: '0 10px 0 10px' }}
				/>
				<Button variant='contained' color='info' onClick={startAsync}>
					Запуск диагностики
				</Button>
			</Toolbar>
		</AppBar>
	)
}
