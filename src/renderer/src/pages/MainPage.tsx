import React, { useContext } from 'react'
import { ViralsDataContext } from '@renderer/context/ViralsDataContext'
import { newGuid } from '@renderer/utils/utils'
import { ViralCard } from '@renderer/components/ViralCard'
import { PacientDataForm } from '@renderer/components/PacientDataForm'
import {
  AttributeType,
  AvailableViral,
  ComplexCharacteristic,
  ViralAttributeComplex,
  ViralAttributeNumeric,
  ViralAttributeQuality
} from '@renderer/data/AvailableVirals'
import { NumericTextField } from '@renderer/components/NumericTextField'
import { SelectInputField } from '@renderer/components/SelectInputField'

export const MainPage: React.FC = () => {
  const { selectedVirals } = useContext(ViralsDataContext)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      <PacientDataForm />
      {selectedVirals.map((el) => (
        <ViralCard title={el.name} key={newGuid()}>
          <ViralElementBuilder viral={el} />
        </ViralCard>
      ))}
    </div>
  )
}

interface IViralElementBuilder {
  viral: AvailableViral
}

const ViralElementBuilder: React.FC<IViralElementBuilder> = ({ viral }) => {
  return (
    <>
      {viral.attributeType === AttributeType.Numeric && (
        <NumericAttribute
          key={newGuid()}
          name={viral.name}
          viral={viral.attributeData as ViralAttributeNumeric}
        />
      )}
      {viral.attributeType === AttributeType.Quality && (
        <QuantityAttribute
          key={newGuid()}
          name={viral.name}
          viral={viral.attributeData as ViralAttributeQuality}
        />
      )}
      {viral.attributeType === AttributeType.Complex && (
        <ComplexAttribute
          key={newGuid()}
          name={viral.name}
          viral={viral.attributeData as ViralAttributeComplex}
        />
      )}
    </>
  )
}

interface IAttribute {
  name: string
}

interface IQuantityAttribute extends IAttribute {
  viral: ViralAttributeQuality
}
const QuantityAttribute: React.FC<IQuantityAttribute> = ({ viral, name }) => {
  return <SelectInputField title={name} items={viral.availableValues} />
}

interface INumericAttribute extends IAttribute {
  viral: ViralAttributeNumeric
}
const NumericAttribute: React.FC<INumericAttribute> = ({ viral, name }) => {
  return <NumericTextField title={`${name} (${viral.unit})`} />
}

interface IComplexAttribute extends IAttribute {
  viral: ViralAttributeComplex
}
const ComplexAttribute: React.FC<IComplexAttribute> = ({ viral, name }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {viral.characteristics.map((ch) => (
        <Characteristic item={ch} key={newGuid()} />
      ))}
    </div>
  )
}

interface ICharacteristic {
  item: ComplexCharacteristic
}
const Characteristic: React.FC<ICharacteristic> = ({ item }) => {
  return (
    <>
      {item.type === AttributeType.Numeric && (
        <NumericAttribute
          key={newGuid()}
          name={item.name}
          viral={item.data as ViralAttributeNumeric}
        />
      )}
      {item.type === AttributeType.Quality && (
        <QuantityAttribute
          key={newGuid()}
          name={item.name}
          viral={item.data as ViralAttributeQuality}
        />
      )}
    </>
  )
}
