import { Box, TextField } from '@mui/material'
import { ChangePatientDataProps } from '@renderer/context/ViralsDataContext'
import { PatientInfo } from '@renderer/hook/useViralStore'
import { NumericTextField } from './NumericTextField'
import { SelectInputField } from './SelectInputField'
import { ViralCard } from './ViralCard'

interface IPatientInfoForm {
  patient: PatientInfo
  changePatientInfo: (data: ChangePatientDataProps) => void
}

export const PacientInfoForm: React.FC<IPatientInfoForm> = ({ patient, changePatientInfo }) => {
  return (
    <ViralCard title="Данные пациента">
      <Box style={{ display: 'flex', gap: '10px' }}>
        <TextField
          fullWidth
          label="Национальность"
          variant="outlined"
          defaultValue={patient.nationality}
          onChange={(e) => changePatientInfo({ nationality: e.target.value as string })}
        />
        <SelectInputField
          title="Пол"
          items={patient.sexValues}
          defaultValue={patient.sex}
          onChange={(el) => changePatientInfo({ sex: el })}
        />
        <NumericTextField
          title="Возраст"
          value={patient.year}
          onChange={(number) => changePatientInfo({ year: number })}
        />
        <SelectInputField
          title="Возраст (ед. изм.)"
          items={patient.yearUnitValues}
          defaultValue={patient.yearUnit}
          onChange={(el) => changePatientInfo({ yearUnit: el })}
        />
      </Box>
    </ViralCard>
  )
}
