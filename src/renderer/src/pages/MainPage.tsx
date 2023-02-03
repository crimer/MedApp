import React, { useContext } from 'react'
import { ViralsDataContext } from '@renderer/context/ViralsDataContext'
import { ViralCard } from '@renderer/components/shared/ViralCard'
import { ViralElementBuilder } from '@renderer/components/ViralElementBuilder'
import { newGuid } from '@renderer/utils/utils'
import { PacientInfoForm } from '@renderer/components/shared/PacientDataForm'

export const MainPage: React.FC = () => {
  const { patientData, changePatientInfo, changeNumericViral, changeQualityViral, changeComplexViral } = useContext(ViralsDataContext)
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      <PacientInfoForm patient={patientData.pacient} changePatientInfo={changePatientInfo} />
      {patientData.virals.map((el) => (
        <ViralCard title={el.name} key={newGuid()}>
          <ViralElementBuilder
            viral={el}
            changeNumericViral={changeNumericViral}
            changeQualityViral={changeQualityViral}
            changeComplexViral={changeComplexViral}
          />
        </ViralCard>
      ))}
    </div>
  )
}
