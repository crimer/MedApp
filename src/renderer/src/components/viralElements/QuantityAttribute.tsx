import { ViralAttributeQuality } from '@renderer/data/AvailableVirals'
import { SelectInputField } from '../shared/SelectInputField'
import { IAttribute } from './ViralTypes'

interface IQuantityAttribute extends IAttribute {
  viral: ViralAttributeQuality
  changeQualityViral: (viralName: string, value: string) => void
}

export const QuantityAttribute: React.FC<IQuantityAttribute> = ({
  viral,
  name,
  changeQualityViral
}) => {
  return (
    <SelectInputField
      title={name}
      items={viral.availableValues}
      defaultValue={viral.selected}
      onChange={(newValue) => changeQualityViral(name, newValue)}
    />
  )
}
