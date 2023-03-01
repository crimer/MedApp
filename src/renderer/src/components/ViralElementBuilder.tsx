import {
	AttributeType,
	AvailableViral,
	ViralAttributeComplex,
	ViralAttributeNumeric,
	ViralAttributeQuality,
} from '@renderer/data/AvailableVirals'
import { ViralDataStore } from '@renderer/data/ViralStore'
import React from 'react'
import { ComplexAttribute } from './viralElements/ComplexAttribute'
import { NumericAttribute } from './viralElements/NumericAttribute'
import { QuantityAttribute } from './viralElements/QuantityAttribute'

export interface IViralElementBuilder {
	viral: AvailableViral
}

const ViralElementBuilderImpl: React.FC<IViralElementBuilder> = ({ viral }) => {
	return (
		<>
			{viral.attributeType === AttributeType.Numeric && (
				<NumericAttribute
					name={viral.name}
					viral={viral.attributeData as ViralAttributeNumeric}
					onChange={(newValue) =>
						ViralDataStore.Instance.changeNumericViral(
							viral.name,
							newValue
						)
					}
				/>
			)}
			{viral.attributeType === AttributeType.Quality && (
				<QuantityAttribute
					name={viral.name}
					viral={viral.attributeData as ViralAttributeQuality}
					onChange={(newValue) =>
						ViralDataStore.Instance.changeQuantityViral(
							viral.name,
							newValue
						)
					}
				/>
			)}
			{viral.attributeType === AttributeType.Complex && (
				<ComplexAttribute
					name={viral.name}
					viral={viral.attributeData as ViralAttributeComplex}
				/>
			)}
		</>
	)
}
export const ViralElementBuilder = React.memo(ViralElementBuilderImpl)
