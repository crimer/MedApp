import { pacientInfoInit, PatientInfo } from '@renderer/context/ViralsDataContext'
import {
	AttributeType,
	AvailableViral,
	ViralAttributeComplex,
	ViralAttributeNumeric,
	ViralAttributeQuality,
} from './AvailableVirals'

export class ViralDataStore {
	private static _instance: ViralDataStore

	public static get Instance(): ViralDataStore {
		if (!this._instance) this._instance = new ViralDataStore()
		return this._instance
	}

	private _selectedVirals: AvailableViral[] = []
	private _patientData: Partial<PatientInfo> = pacientInfoInit

	public get allVirals() {
		return this._selectedVirals
	}
	public get pacientInfo() {
		return this._patientData
	}

	public addViral(viral: AvailableViral) {
		this._selectedVirals.push(viral)
		this.log()
	}

	public clearAll() {
		this._selectedVirals = []
		this._patientData = pacientInfoInit
	}

	public removeViral(name: string) {
		this._selectedVirals = this._selectedVirals.filter(
			(s) => s.name !== name
		)
		this.log()
	}

	public changeNumericViral(name: string, value: number) {
		const numericElement = this._selectedVirals.find(
			(el) => el.name === name
		)
		if (!numericElement) return

		const el = numericElement.attributeData as ViralAttributeNumeric
		el.value = value
		this.log()
	}

	public changeQuantityViral(name: string, newValue: string) {
		const numericElement = this._selectedVirals.find(
			(el) => el.name === name
		)
		if (!numericElement) return

		const el = numericElement.attributeData as ViralAttributeQuality
		el.selected = newValue
		this.log()
	}

	public changeComplexViral(
		viralName: string,
		characteristicName: string,
		newValue: string | number
	) {
		const viralElement = this._selectedVirals.find(
			(el) => el.name === viralName
		)
		if (!viralElement) return

		const complex = viralElement.attributeData as ViralAttributeComplex
		const characteristic = complex.characteristics.find(
			(el) => el.name === characteristicName
		)

		if (characteristic?.type === AttributeType.Numeric) {
			const numeric = characteristic.data as ViralAttributeNumeric
			numeric.value = +newValue
			this.log()
			return
		}

		if (characteristic?.type === AttributeType.Quality) {
			const quality = characteristic.data as ViralAttributeQuality
			quality.selected = newValue.toString()
			this.log()
			return
		}
	}

	public setPatientData(data: Partial<PatientInfo>) {
		this._patientData = {
			...this._patientData,
			nationality: data.nationality ?? this._patientData.nationality,
			sex: data.sex ?? this._patientData.sex,
			year: data.year ?? this._patientData.year,
			yearUnit: data.yearUnit ?? this._patientData.yearUnit,
		}
	}

	private log() {
		console.log(this._selectedVirals)
	}
}
