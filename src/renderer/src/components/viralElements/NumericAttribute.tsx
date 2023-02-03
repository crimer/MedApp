import { ViralAttributeNumeric } from '@renderer/data/AvailableVirals'
import { NumericTextField } from '../shared/NumericTextField'
import { IAttribute } from './ViralTypes'

interface INumericAttribute extends IAttribute {
  viral: ViralAttributeNumeric
  changeNumericViral: (viralName: string, value: number) => void
}

export const NumericAttribute: React.FC<INumericAttribute> = ({
  viral,
  name,
  changeNumericViral
}) => {
  return (
    <NumericTextField
      value={viral.value}
      title={`${name} (${viral.unit})`}
      onChange={(value) => changeNumericViral(name, value)}
    />
  )
}
