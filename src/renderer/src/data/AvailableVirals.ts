import {newGuid} from '@renderer/utils/utils'

export type AvailableViralGroup = {
  name: string
  virals: AvailableViral[]
}

export type AvailableViral = {
  name: string
  id: string
  attributeType: AttributeType
  attributeSection: AttributeSection
  attributeData: ViralAttributeComplex | ViralAttributeNumeric | ViralAttributeQuality
}

export type AttributeSection =
  | 'Паспортная часть'
  | 'Жалобы'
  | 'Объективное состояние больного'
  | 'Биохимический анализ крови'
  | 'Клинический анализ крови'
  | 'Инструментальные исследования'

export enum AttributeType {
  Numeric = 0,
  Quality = 1,
  Complex = 2
}

export type ViralAttributeComplex = {
  characteristics: ComplexCharacteristic[]
}

export type ComplexCharacteristic = {
  name: string
  type: AttributeType
  data: ViralAttributeComplex | ViralAttributeNumeric | ViralAttributeQuality
}

export type ViralAttributeQuality = {
  availableValues: string[]
  selected: string
}

export type ViralAttributeNumeric = {
  value: number
  unit: string
}

export const availableViralGroups: AvailableViralGroup[] = [
  {
    name: 'Жалобы',
    virals: [
      {
        name: 'Боль в животе',
        id: '54d1b31a-5691-45fe-a627-00ffd89cc3ab',
        attributeSection: 'Жалобы',
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Локализация',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: [
                  'собственно эпигастрий',
                  'правое подреберье',
                  'левое подреберье',
                  'эпигастральная область',
                  'правая боковая область живота',
                  'левая боковая область живота',
                  'правая подвздошная область',
                  'нелокализованная',
                  'верхний отдел живота'
                ]
              }
            },
            {
              name: 'Интенсивность',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: ['сильная', 'умеренная', 'слабая', 'резкая', 'резчайшая']
              }
            },
            {
              name: 'Усиление',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Характер',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: ['острая', 'тупая', 'давящая', 'колющая', 'распирающая']
              }
            }
          ]
        }
      },
      {
        name: 'Нарушение аппетита',
        id: '6b4761d0-5551-4d7f-8865-07f306e6098b',
        attributeSection: 'Жалобы',
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Характер',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: ['Повышение аппетита', 'Снижение аппетита', 'Отсутствие аппетита']
              }
            }
          ]
        }
      },
      {
        name: 'Нарушение вкуса',
        id: newGuid(),
        attributeSection: 'Жалобы',
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Характер',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: [
                  'снижение вкуса',
                  'потеря вкуса',
                  'искажение вкуса',
                  'неприятный привкус во рту',
                  'кислый вкус во рту',
                  'металлический вкус во рту'
                ]
              }
            }
          ]
        }
      },
      {
        name: 'Тяжесть в животе',
        id: newGuid(),
        attributeSection: 'Жалобы',
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Локализация',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: [
                  'левая подреберная область',
                  'правая подреберная область',
                  'правая боковая область живота',
                  'левая боковая область живота'
                ]
              }
            }
          ]
        }
      },
      {
        name: 'Рвота',
        id: newGuid(),
        attributeSection: 'Жалобы',
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Облегчение после рвоты',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Частота',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: ['однократно', 'многократно', 'повторно']
              }
            }
          ]
        }
      },
      {
        name: 'Вздутие живота',
        id: newGuid(),
        attributeSection: 'Жалобы',
        attributeType: AttributeType.Quality,
        attributeData: {
          selected: '',
          availableValues: ['имеется', 'отсутствует']
        }
      },
      {
        name: 'Тошнота',
        id: newGuid(),
        attributeSection: 'Жалобы',
        attributeType: AttributeType.Quality,
        attributeData: {
          selected: '',
          availableValues: ['имеется', 'отсутствует']
        }
      },
      {
        name: 'Сухость во рту',
        id: newGuid(),
        attributeSection: 'Жалобы',
        attributeType: AttributeType.Quality,
        attributeData: {
          selected: '',
          availableValues: ['имеется', 'отсутствует']
        }
      },
      {
        name: 'Недомогание',
        id: newGuid(),
        attributeSection: 'Жалобы',
        attributeType: AttributeType.Quality,
        attributeData: {
          selected: '',
          availableValues: ['имеется', 'отсутствует', 'ухудшение состояния']
        }
      },
      {
        name: 'Общее состояние',
        id: newGuid(),
        attributeSection: 'Жалобы',
        attributeType: AttributeType.Quality,
        attributeData: {
          selected: '',
          availableValues: [
            'удовлетворительное',
            'средней тяжести',
            'тяжелое',
            'ухудшение состояния'
          ]
        }
      },
      {
        name: 'Озноб',
        id: newGuid(),
        attributeSection: 'Жалобы',
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: ['имеется', 'отсутствует']
              }
            }
          ]
        }
      },
      {
        name: 'Общая слабость',
        id: newGuid(),
        attributeSection: 'Жалобы',
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Выраженность',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: [
                  'умеренно выраженная',
                  'умеренная',
                  'выраженная',
                  'сильная',
                  'резко выраженная'
                ]
              }
            }
          ]
        }
      }
    ]
  },
  {
    name: 'Инструментальные исследования',
    virals: [
      {
        name: 'Толщина стенки желчного пузыря (УЗИ желчного пузыря)',
        id: newGuid(),
        attributeSection: 'Инструментальные исследования',
        attributeType: AttributeType.Numeric,
        attributeData: {
          unit: 'мм',
          value: 2.2
        }
      },
      {
        name: 'Структура стенки желчного пузыря (УЗИ желчного пузыря)',
        id: newGuid(),
        attributeSection: 'Инструментальные исследования',
        attributeType: AttributeType.Quality,
        attributeData: {
          selected: '',
          availableValues: ['слоистая', 'неоднородная', 'смазанная', 'однородная']
        }
      },
      {
        name: 'Конкременты желчного пузыря (УЗИ желчного пузыря)',
        id: newGuid(),
        attributeSection: 'Инструментальные исследования',
        attributeType: AttributeType.Quality,
        attributeData: {
          selected: '',
          availableValues: ['имеется', 'отсутствует']
        }
      }
    ]
  },
  {
    name: 'Объективное состояние больного',
    virals: [
      {
        name: 'Влажность языка',
        id: newGuid(),
        attributeSection: 'Объективное состояние больного',
        attributeType: AttributeType.Quality,
        attributeData: {
          selected: '',
          availableValues: ['влажный', 'сухой', 'суховат']
        }
      },
      {
        name: 'Обложенность языка',
        id: newGuid(),
        attributeSection: 'Объективное состояние больного',
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,

              data: {
                selected: '',
                availableValues: ['имеется', 'отсутствует']
              }
            }
          ]
        }
      },
      {
        name: 'Цвет налета',
        id: newGuid(),
        attributeSection: 'Объективное состояние больного',
        attributeType: AttributeType.Quality,
        attributeData: {
          selected: '',
          availableValues: ['желтый', 'белый']
        }
      },
      {
        name: 'Болезненность живота при поверхностной пальпации (качественные)',
        id: newGuid(),
        attributeSection: 'Объективное состояние больного',
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Локализация',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: [
                  'правое подреберье',
                  'верхний отдел живота',
                  'эпигастрия',
                  'гопогастрий',
                  'все отделы'
                ]
              }
            },
            {
              name: 'Мягкость живота',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Чуствительность',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: ['болезненный', 'умеренно болезненный', 'резко болезненный']
              }
            }
          ]
        }
      },
      {
        name: 'Температура тела',
        id: newGuid(),
        attributeSection: 'Объективное состояние больного',
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Значение',

              type: AttributeType.Numeric,
              data: {
                unit: 'С',
                value: 35
              }
            }
          ]
        }
      },
      {
        name: 'Симптом Щеткина-Блюмберга',
        id: newGuid(),
        attributeSection: 'Объективное состояние больного',
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                selected: '',
                availableValues: ['имеется', 'отсутствует']
              }
            }
          ]
        }
      }
    ]
  },
  {
    name: 'Лабораторные исследования (Биохимический анализ крови)',
    virals: [
      {
        name: 'Белок общий в сыворотке',
        id: newGuid(),
        attributeSection: 'Биохимический анализ крови',
        attributeType: AttributeType.Numeric,
        attributeData: {
          unit: 'г/л',
          value: 57.2
        }
      },
      {
        name: 'Билирубин общий',
        id: newGuid(),
        attributeSection: 'Биохимический анализ крови',
        attributeType: AttributeType.Numeric,
        attributeData: {
          unit: 'мкмоль/л',
          value: 7.7
        }
      },
      {
        name: 'Фосфатаза щелочная',
        id: newGuid(),
        attributeSection: 'Биохимический анализ крови',
        attributeType: AttributeType.Numeric,
        attributeData: {
          unit: 'Ед/л',
          value: 600.0
        }
      }
    ]
  },
  {
    name: 'Лабораторные исследования (Клинический анализ крови)',
    virals: [
      {
        name: 'Гематокрит',
        id: newGuid(),
        attributeSection: 'Клинический анализ крови',
        attributeType: AttributeType.Numeric,
        attributeData: {
          unit: '%',
          value: 43.2
        }
      },
      {
        name: 'Гемоглобин',
        id: newGuid(),
        attributeSection: 'Клинический анализ крови',
        attributeType: AttributeType.Numeric,
        attributeData: {
          unit: 'г/л',
          value: 43.2
        }
      },
      {
        name: 'Лейкоциты в крови',
        id: newGuid(),
        attributeSection: 'Клинический анализ крови',
        attributeType: AttributeType.Numeric,
        attributeData: {
          unit: '10⁹/л',
          value: 9.9
        }
      },
      {
        name: 'СОЭ',
        id: '47933817-6b0f-4b91-b6d9-79ca0496b9af',
        attributeSection: 'Клинический анализ крови',
        attributeType: AttributeType.Numeric,
        attributeData: {
          unit: 'мм/ч',
          value: 22.0
        }
      }
    ]
  }
]
