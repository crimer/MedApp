import {
  AttributeType,
  AvailableViral,
  ViralAttributeComplex,
  ViralAttributeNumeric,
  ViralAttributeQuality
} from '@renderer/data/AvailableVirals'
import { newGuid } from '@renderer/utils/utils'
import React from 'react'
import { ComplexAttribute } from './viralElements/ComplexAttribute'
import { NumericAttribute } from './viralElements/NumericAttribute'
import { QuantityAttribute } from './viralElements/QuantityAttribute'

export interface IViralElementBuilder {
  viral: AvailableViral
  changeNumericViral: (viralName: string, value: number) => void
  changeQualityViral: (viralName: string, value: string) => void
  changeComplexViral: (
    viralName: string,
    characteristicName: string,
    newValue: string | number
  ) => void
}

export const ViralElementBuilder: React.FC<IViralElementBuilder> = ({
  viral,
  changeNumericViral,
  changeQualityViral,
  changeComplexViral
}) => {
  return (
    <>
      {viral.attributeType === AttributeType.Numeric && (
        <NumericAttribute
          key={newGuid()}
          name={viral.name}
          viral={viral.attributeData as ViralAttributeNumeric}
          changeNumericViral={changeNumericViral}
        />
      )}
      {viral.attributeType === AttributeType.Quality && (
        <QuantityAttribute
          key={newGuid()}
          name={viral.name}
          viral={viral.attributeData as ViralAttributeQuality}
          changeQualityViral={changeQualityViral}
        />
      )}
      {viral.attributeType === AttributeType.Complex && (
        <ComplexAttribute
          key={newGuid()}
          name={viral.name}
          viral={viral.attributeData as ViralAttributeComplex}
          changeComplexViral={changeComplexViral}
        />
      )}
    </>
  )
}
