import {
  AttributeType,
  ComplexCharacteristic,
  ViralAttributeComplex,
  ViralAttributeNumeric,
  ViralAttributeQuality
} from '@renderer/data/AvailableVirals'
import { newGuid } from '@renderer/utils/utils'
import { NumericAttribute } from './NumericAttribute'
import { QuantityAttribute } from './QuantityAttribute'
import { IAttribute } from './ViralTypes'

interface IComplexAttribute extends IAttribute {
  viral: ViralAttributeComplex
  changeNumericViral: (viralName: string, value: number) => void
  changeQualityViral: (viralName: string, value: string) => void
}
export const ComplexAttribute: React.FC<IComplexAttribute> = ({
  viral,
  name,
  changeNumericViral,
  changeQualityViral
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {viral.characteristics.map((ch) => (
        <Characteristic
          item={ch}
          key={newGuid()}
          changeNumericViral={changeNumericViral}
          changeQualityViral={changeQualityViral}
        />
      ))}
    </div>
  )
}

interface ICharacteristic {
  item: ComplexCharacteristic
  changeNumericViral: (viralName: string, value: number) => void
  changeQualityViral: (viralName: string, value: string) => void
}

const Characteristic: React.FC<ICharacteristic> = ({
  item,
  changeNumericViral,
  changeQualityViral
}) => {
  return (
    <>
      {item.type === AttributeType.Numeric && (
        <NumericAttribute
          key={newGuid()}
          name={item.name}
          viral={item.data as ViralAttributeNumeric}
          changeNumericViral={changeNumericViral}
        />
      )}
      {item.type === AttributeType.Quality && (
        <QuantityAttribute
          key={newGuid()}
          name={item.name}
          viral={item.data as ViralAttributeQuality}
          changeQualityViral={changeQualityViral}
        />
      )}
    </>
  )
}
