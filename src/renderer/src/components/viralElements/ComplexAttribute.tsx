import {
	AttributeType,
	ComplexCharacteristic,
	ViralAttributeComplex,
	ViralAttributeNumeric,
	ViralAttributeQuality,
} from '@renderer/data/AvailableVirals'
import { ViralDataStore } from '@renderer/data/ViralStore'
import { newGuid } from '@renderer/utils/utils'
import React from 'react'
import { NumericAttribute } from './NumericAttribute'
import { QuantityAttribute } from './QuantityAttribute'
import { IAttribute } from './ViralTypes'

interface IComplexAttribute extends IAttribute {
	viral: ViralAttributeComplex
}

const ComplexAttributeImpl: React.FC<IComplexAttribute> = ({ viral, name }) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
			{viral.characteristics.map((ch) => (
				<Characteristic viralName={name} item={ch} key={newGuid()} />
			))}
		</div>
	)
}

export const ComplexAttribute = React.memo(ComplexAttributeImpl)

interface ICharacteristic {
	item: ComplexCharacteristic
	viralName: string
}

const Characteristic: React.FC<ICharacteristic> = ({ item, viralName }) => {
	return (
		<>
			{item.type === AttributeType.Numeric && (
				<NumericAttribute
					key={newGuid()}
					name={item.name}
					viral={item.data as ViralAttributeNumeric}
					onChange={(newValue) =>
						ViralDataStore.Instance.changeComplexViral(
							viralName,
							item.name,
							newValue
						)
					}
				/>
			)}
			{item.type === AttributeType.Quality && (
				<QuantityAttribute
					key={newGuid()}
					name={item.name}
					viral={item.data as ViralAttributeQuality}
					onChange={(newValue) =>
						ViralDataStore.Instance.changeComplexViral(
							viralName,
							item.name,
							newValue
						)
					}
				/>
			)}
		</>
	)
}
