import {
  AttributeType,
  ComplexCharacteristic,
  ViralAttributeComplex,
  ViralAttributeNumeric,
  ViralAttributeQuality
} from '@renderer/data/AvailableVirals'
import { newGuid } from '@renderer/utils/utils'
import React from 'react'
import { NumericAttribute } from './NumericAttribute'
import { QuantityAttribute } from './QuantityAttribute'
import { IAttribute } from './ViralTypes'

interface IComplexAttribute extends IAttribute {
  viral: ViralAttributeComplex
  changeComplexViral: (
    viralName: string,
    characteristicName: string,
    newValue: string | number
  ) => void
}

const ComplexAttributeImpl: React.FC<IComplexAttribute> = ({
  viral,
  name,
  changeComplexViral
}) => {
  const changeQualityViral = (characteristicName: string, value: string) => {
    changeComplexViral(name, characteristicName, value)
  }

  const changeNumericViral = (characteristicName: string, value: number) => {
    changeComplexViral(name, characteristicName, value)
  }

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

export const ComplexAttribute = React.memo(ComplexAttributeImpl)

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
