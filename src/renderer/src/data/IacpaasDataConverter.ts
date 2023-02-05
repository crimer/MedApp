import {
  AttributeType,
  AvailableViral,
  ViralAttributeComplex,
  ViralAttributeNumeric,
  ViralAttributeQuality
} from './AvailableVirals'
import { DataSuccessor, ValueTypes, ValueTypes as ViralTypes } from './DataSuccessor'

export class IacpaasDataConverter {
  public static GetAttributes(virals: AvailableViral[]): DataSuccessor[] {
    if(virals.length === 0) return []
    return virals.map((el) => this.GetAttribute(el))
  }

  static GetAttribute(el: AvailableViral): DataSuccessor {
    if (el.attributeType === AttributeType.Quality) return this.GetQualityAttribute(el)
    if (el.attributeType === AttributeType.Numeric) return this.GetNumericAttribute(el)
    if (el.attributeType === AttributeType.Complex) return this.GetComplexAttribute(el)
    throw new Error(`Не обрабатываемый тип признака при создании ИБ (${el})`)
  }

  private static GetComplexAttribute(attribute: AvailableViral): DataSuccessor {
    const complex = attribute.attributeData as ViralAttributeComplex
    const characteristics = this.getCharacteristics(complex)
    return {
      meta: 'Признак',
      type: ViralTypes.NoneTerminal,
      name: attribute.name,
      successors: [
        {
          meta: 'Составные значения',
          name: 'Составные значения',
          type: ViralTypes.NoneTerminal,
          successors: characteristics
        }
      ]
    }
  }
  private static getCharacteristics(complex: ViralAttributeComplex): DataSuccessor[] {
    return complex.characteristics.map((c) => {
      let element: DataSuccessor = {}

      if (c.type === AttributeType.Numeric)
        element = this.getNumeric(c.data as ViralAttributeNumeric)
      if (c.type === AttributeType.Quality)
        element = this.getQuality(c.data as ViralAttributeQuality)

      return {
        name: c.name,
        meta: 'Характеристика',
        type: ViralTypes.NoneTerminal,
        successors: [
          {
            meta: 'Выбор типа значений',
            name: 'Выбор типа значений',
            type: ViralTypes.NoneTerminal,
            successors: [element]
          }
        ]
      }
    })
  }

  private static GetNumericAttribute(attribute: AvailableViral): DataSuccessor {
    const numeric = attribute.attributeData as ViralAttributeNumeric
    return {
      meta: 'Признак',
      type: ViralTypes.NoneTerminal,
      name: attribute.name,
      successors: [this.getNumeric(numeric)]
    }
  }

  private static GetQualityAttribute(attribute: AvailableViral): DataSuccessor {
    const quality = attribute.attributeData as ViralAttributeQuality
    return {
      meta: 'Признак',
      type: ViralTypes.NoneTerminal,
      name: attribute.name,
      successors: [this.getQuality(quality)]
    }
  }

  private static getQuality(quality: ViralAttributeQuality): DataSuccessor {
    return {
      meta: 'Качественные значения',
      name: 'Качественные значения',
      type: ViralTypes.NoneTerminal,
      successors: [
        {
          meta: 'значение',
          value: quality.selected,
          valtype: ViralTypes.Str,
          type: ViralTypes.TerminalValue
        }
      ]
    }
  }

  private static getNumeric(numeric: ViralAttributeNumeric): DataSuccessor {
    return {
      meta: 'Числовые значения',
      name: 'Числовые значения',
      type: ViralTypes.NoneTerminal,
      successors: [
        {
          meta: 'значение',
          value: numeric.value,
          type: ViralTypes.TerminalValue,
          valtype: ValueTypes.Real
        },
        {
          meta: 'ед.изм.',
          value: numeric.unit,
          type: ViralTypes.TerminalValue,
          valtype: ValueTypes.Str
        }
      ]
    }
  }
}
