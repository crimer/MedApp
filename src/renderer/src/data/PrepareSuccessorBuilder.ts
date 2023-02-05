import { PatientData } from '@renderer/hook/useViralStore'
import { AvailableViral } from './AvailableVirals'
import { DataSuccessor, ValueTypes } from './DataSuccessor'
import { IacpaasDataConverter } from './IacpaasDataConverter'

export class PrepareSuccessorBuilder {
  static Build(patientData: PatientData): DataSuccessor {
    const { pacient, virals } = patientData

    const complaints = virals.filter((s) => s.attributeSection === 'Жалобы')
    const bio = virals.filter((s) => s.attributeSection === 'Биохимический анализ крови')
    const clinical = virals.filter((s) => s.attributeSection === 'Клинический анализ крови')
    const instumental = virals.filter((s) => s.attributeSection === 'Инструментальные исследования')
    const patientObjectiveCondition = virals.filter((s) => s.attributeSection === 'Объективное состояние больного')

    return {
      name: `ИБ-${this.getTimestampInSeconds()}`,
      meta: 'История болезни',
      type: ValueTypes.NoneTerminal,
      successors: [
        this.GetPassportPath(pacient.nationality, pacient.sex, pacient.yearUnit, pacient.year),
        this.GetDate('дата обращения'),
        this.GetComplaints(complaints),
        this.GetInstrumentalResearch(instumental),
        this.GetLaboratoryStudies(clinical, bio),
        this.GetPatientObjectiveCondition(patientObjectiveCondition)
      ]
    }
  }

  static GetPatientObjectiveCondition(patientObjectiveCondition: AvailableViral[]): DataSuccessor {
    const attrs = IacpaasDataConverter.GetAttributes(patientObjectiveCondition)

    const temp = attrs.find((d) => d.name === 'Температура тела')
    const other = attrs.filter((d) => d.name !== 'Температура тела')

    return {
      meta: 'Объективное состояние больного',
      name: 'Объективное состояние больного',
      type: ValueTypes.NoneTerminal,
      successors: [
        {
          meta: 'Общий осмотр',
          name: 'Общий осмотр',
          type: ValueTypes.NoneTerminal,
          successors: temp ? [temp] : []
        },
        {
          meta: 'Осмотр по системам',
          name: 'Осмотр по системам',
          type: ValueTypes.NoneTerminal,
          successors: [
            {
              meta: 'Система пищеварения',
              name: 'Система пищеварения',
              type: ValueTypes.NoneTerminal,
              successors: other.length !== 0 ? other : []
            }
          ]
        }
      ]
    }
  }

  private static GetPassportPath(
    nationality: string,
    sex: string,
    ageUnit: string,
    ageValue: number
  ): DataSuccessor {
    return {
      type: ValueTypes.NoneTerminal,
      meta: 'Паспортная часть',
      name: 'Паспортная часть',
      successors: [
        {
          type: ValueTypes.NoneTerminal,
          meta: 'Возраст',
          name: 'Возраст',
          successors: [
            {
              meta: ageUnit,
              value: ageUnit,
              type: ValueTypes.TerminalValue,
              valtype: ValueTypes.Str
            },
            {
              meta: 'значение',
              value: ageValue,
              type: ValueTypes.TerminalValue,
              valtype: ValueTypes.Integer
            }
          ]
        },
        {
          type: ValueTypes.NoneTerminal,
          meta: 'Пол',
          name: 'Пол',
          successors: [
            {
              meta: sex,
              value: sex,
              type: ValueTypes.TerminalValue,
              valtype: ValueTypes.Str
            }
          ]
        },
        {
          type: ValueTypes.TerminalValue,
          meta: 'национальность',
          name: nationality,
          valtype: ValueTypes.Str
        }
      ]
    }
  }

  private static GetInstrumentalResearch(instrumentalResearch: AvailableViral[]): DataSuccessor {
    return {
      meta: 'Исследования инструментальные',
      name: 'Исследования инструментальные',
      type: ValueTypes.NoneTerminal,
      successors: [
        {
          meta: 'Группа признаков (вид исследования)',
          name: 'УЗИ желчного пузыря',
          type: ValueTypes.NoneTerminal,
          successors: [
            {
              meta: 'Номер записи',
              name: '1',
              type: ValueTypes.NoneTerminal,
              successors: [
                this.GetDate('дата'),
                ...IacpaasDataConverter.GetAttributes(instrumentalResearch)
              ]
            }
          ]
        }
      ]
    }
  }

  private static GetLaboratoryStudies(
    clinicalBloodLaboratoryStudies: AvailableViral[],
    bioBloodLaboratoryStudies: AvailableViral[]
  ): DataSuccessor {
    return {
      meta: 'Исследования лабораторные',
      name: 'Исследования лабораторные',
      type: ValueTypes.NoneTerminal,
      successors: [
        {
          meta: 'Группа признаков (вид исследования)',
          name: 'Клинический анализ крови',
          type: ValueTypes.NoneTerminal,
          successors: [
            {
              meta: 'Номер записи',
              name: '1',
              type: ValueTypes.NoneTerminal,
              successors: [
                this.GetDate('дата'),
                ...IacpaasDataConverter.GetAttributes(clinicalBloodLaboratoryStudies)
              ]
            }
          ]
        },
        {
          meta: 'Группа признаков (вид исследования)',
          name: 'Биохимическое исследование крови',
          type: ValueTypes.NoneTerminal,
          successors: [
            {
              meta: 'Номер записи',
              name: '1',
              type: ValueTypes.NoneTerminal,
              successors: [
                this.GetDate('дата'),
                ...IacpaasDataConverter.GetAttributes(bioBloodLaboratoryStudies)
              ]
            }
          ]
        }
      ]
    }
  }

  private static GetComplaints(virals: AvailableViral[]): DataSuccessor {
    return {
      meta: 'Жалобы при обращении',
      name: 'Жалобы при обращении',
      type: ValueTypes.NoneTerminal,
      successors: IacpaasDataConverter.GetAttributes(virals)
    }
  }

  private static GetDate(meta: string): DataSuccessor {
    const now = Date.now()
    const date = new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }).format(now)

    const time = new Intl.DateTimeFormat('ru-RU', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }).format(now)

    return {
      meta,
      type: ValueTypes.TerminalValue,
      valtype: ValueTypes.Date,
      value: `${date}-${time}`
    }
  }

  private static getTimestampInSeconds = () => Math.floor(Date.now() / 1000)
}
