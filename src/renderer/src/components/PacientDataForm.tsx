import { TextField } from "@mui/material"
import { NumericTextField } from "./NumericTextField"
import { ViralCard } from "./ViralCard"

export const PacientDataForm: React.FC = () => {
  return (
    <ViralCard title="Данные пациента">
      <>
        <TextField label="Национальность" variant="outlined" />
        {/* <SelectInputField title="Пол" items={} onChange={} /> */}
        <NumericTextField title="Возраст" />
        {/* <SelectInputField title="Возраст" items={} onChange={} /> */}
      </>
    </ViralCard>
  )
}
