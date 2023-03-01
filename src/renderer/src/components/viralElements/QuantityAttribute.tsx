import { ViralAttributeQuality } from '@renderer/data/AvailableVirals'
import { useState } from 'react'
import { SelectInputField } from '../shared/SelectInputField'
import { IAttribute } from './ViralTypes'

interface IQuantityAttribute extends IAttribute {
	viral: ViralAttributeQuality
	onChange: (newValue: string) => void
}

export const QuantityAttribute: React.FC<IQuantityAttribute> = ({
	viral,
	name,
	onChange,
}) => {
	const [value, setValue] = useState<string>('')
	return (
		<SelectInputField
			title={name}
			items={viral.availableValues}
			defaultValue={value}
			onChange={(newValue) => {
				setValue(newValue)
				onChange(newValue)
			}}
		/>
	)
}
