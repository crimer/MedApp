import React, { useContext } from 'react'
import { ViralsDataContext } from '@renderer/context/ViralsDataContext'
import { ViralCard } from '@renderer/components/shared/ViralCard'
import { ViralElementBuilder } from '@renderer/components/ViralElementBuilder'
import { PacientInfoForm } from '@renderer/components/shared/PacientDataForm'

export const MainPage: React.FC = () => {
	const { selectedVirals, setPatientData, patientInfo } = useContext(ViralsDataContext)

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
			<PacientInfoForm
				patientInfo={patientInfo}
				setPatientData={setPatientData}
			/>
			{selectedVirals.map((el) => (
				<ViralCard title={el.name} key={el.id}>
					<ViralElementBuilder viral={el} />
				</ViralCard>
			))}
		</div>
	)
}
