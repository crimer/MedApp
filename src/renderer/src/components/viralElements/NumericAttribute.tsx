import { ViralAttributeNumeric } from '@renderer/data/AvailableVirals'
import { NumericTextField } from '../shared/NumericTextField'
import { IAttribute } from './ViralTypes'
import { useState } from 'react'

interface INumericAttribute extends IAttribute {
	viral: ViralAttributeNumeric
	onChange: (newValue: number) => void
}

export const NumericAttribute: React.FC<INumericAttribute> = ({
	viral,
	name,
	onChange,
}) => {
	const [value, setValue] = useState<number>(0)
	return (
		<NumericTextField
			value={value}
			title={`${name} (${viral.unit})`}
			onChange={(newValue) => {
				setValue(newValue)
				onChange(newValue)
			}}
		/>
	)
}
