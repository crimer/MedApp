import { Box, TextField } from '@mui/material'
import {
	PatientInfo,
	sexValues,
	yearUnitValues,
} from '@renderer/context/ViralsDataContext'
import { ViralDataStore } from '@renderer/data/ViralStore'
import { NumericTextField } from './NumericTextField'
import { SelectInputField } from './SelectInputField'
import { ViralCard } from './ViralCard'

interface IPatientInfoForm {
	patientInfo: PatientInfo
	setPatientData: (data: Partial<PatientInfo>) => void
}

export const PacientInfoForm: React.FC<IPatientInfoForm> = ({
	setPatientData,
	patientInfo,
}) => {
	return (
		<ViralCard title='Данные пациента'>
			<Box style={{ display: 'flex', gap: '10px' }}>
				<TextField
					fullWidth
					label='Национальность'
					variant='outlined'
					defaultValue={patientInfo.nationality}
					onChange={(e) => {
						const value = e.target.value as string
						ViralDataStore.Instance.setPatientData({
							nationality: value,
						})
						setPatientData({
							nationality: value,
						})
					}}
				/>
				<SelectInputField
					title='Пол'
					items={sexValues}
					defaultValue={patientInfo.sex}
					onChange={(el) => {
						ViralDataStore.Instance.setPatientData({
							sex: el,
						})
						setPatientData({ sex: el })
					}}
				/>
				<NumericTextField
					title='Возраст'
					value={patientInfo.year}
					onChange={(number) => {
						ViralDataStore.Instance.setPatientData({
							year: number,
						})
						setPatientData({ year: number })
					}}
				/>
				<SelectInputField
					title='Возраст (ед. изм.)'
					items={yearUnitValues}
					defaultValue={patientInfo.yearUnit}
					onChange={(el) => {
						ViralDataStore.Instance.setPatientData({
							yearUnit: el,
						})
						setPatientData({ yearUnit: el })
					}}
				/>
			</Box>
		</ViralCard>
	)
}
