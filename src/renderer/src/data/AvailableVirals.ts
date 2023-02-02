export type AvailableViralGroup = {
  name: string
  virals: AvailableViral[]
}

export type AvailableViral = {
  name: string
  attributeType: AttributeType
  attributeData: ViralAttributeComplex | ViralAttributeNumeric | ViralAttributeQuality
}

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
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Локализация',
              type: AttributeType.Quality,
              data: {
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
                availableValues: ['сильная', 'умеренная', 'слабая', 'резкая', 'резчайшая']
              }
            },
            {
              name: 'Усиление',
              type: AttributeType.Quality,
              data: {
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Характер',
              type: AttributeType.Quality,
              data: {
                availableValues: ['острая', 'тупая', 'давящая', 'колющая', 'распирающая']
              }
            }
          ]
        }
      },
      {
        name: 'Нарушение аппетита',
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Характер',
              type: AttributeType.Quality,
              data: {
                availableValues: ['Повышение аппетита', 'Снижение аппетита', 'Отсутствие аппетита']
              }
            }
          ]
        }
      },
      {
        name: 'Нарушение вкуса',
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Характер',
              type: AttributeType.Quality,
              data: {
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
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Локализация',
              type: AttributeType.Quality,
              data: {
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
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Облегчение после рвоты',
              type: AttributeType.Quality,
              data: {
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Частота',
              type: AttributeType.Quality,
              data: {
                availableValues: ['однократно', 'многократно', 'повторно']
              }
            }
          ]
        }
      },
      {
        name: 'Вздутие живота',
        attributeType: AttributeType.Quality,
        attributeData: {
          availableValues: ['имеется', 'отсутствует']
        }
      },
      {
        name: 'Тошнота',
        attributeType: AttributeType.Quality,
        attributeData: {
          availableValues: ['имеется', 'отсутствует']
        }
      },
      {
        name: 'Сухость во рту',
        attributeType: AttributeType.Quality,
        attributeData: {
          availableValues: ['имеется', 'отсутствует']
        }
      },
      {
        name: 'Недомогание',
        attributeType: AttributeType.Quality,
        attributeData: {
          availableValues: ['имеется', 'отсутствует', 'ухудшение состояния']
        }
      },
      {
        name: 'Общее состояние',
        attributeType: AttributeType.Quality,
        attributeData: {
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
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                availableValues: ['имеется', 'отсутствует']
              }
            }
          ]
        }
      },
      {
        name: 'Общая слабость',
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Выраженность',
              type: AttributeType.Quality,
              data: {
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
        attributeType: AttributeType.Numeric,
        attributeData: {
          unit: 'мм',
          value: 2.2
        }
      },
      {
        name: 'Структура стенки желчного пузыря (УЗИ желчного пузыря)',
        attributeType: AttributeType.Quality,
        attributeData: {
          availableValues: ['слоистая', 'неоднородная', 'смазанная', 'однородная']
        }
      },
      {
        name: 'Конкременты желчного пузыря (УЗИ желчного пузыря)',
        attributeType: AttributeType.Quality,
        attributeData: {
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
        attributeType: AttributeType.Quality,
        attributeData: {
          availableValues: ['влажный', 'сухой', 'суховат']
        }
      },
      {
        name: 'Обложенность языка',
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                availableValues: ['имеется', 'отсутствует']
              }
            }
          ]
        }
      },
      {
        name: 'Цвет налета',
        attributeType: AttributeType.Quality,
        attributeData: {
          availableValues: ['желтый', 'белый']
        }
      },
      {
        name: 'Болезненность живота при поверхностной пальпации (качественные)',
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Локализация',
              type: AttributeType.Quality,
              data: {
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
                availableValues: ['имеется', 'отсутствует']
              }
            },
            {
              name: 'Чуствительность',
              type: AttributeType.Quality,
              data: {
                availableValues: ['болезненный', 'умеренно болезненный', 'резко болезненный']
              }
            }
          ]
        }
      },
      {
        name: 'Температура тела',
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
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
        attributeType: AttributeType.Complex,
        attributeData: {
          characteristics: [
            {
              name: 'Присутствие',
              type: AttributeType.Quality,
              data: {
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
        attributeType: AttributeType.Numeric,
        attributeData: {
          unit: 'г/л',
          value: 57.2
        }
      },
      {
        name: 'Билирубин общий',
        attributeType: AttributeType.Numeric,
        attributeData: {
          unit: 'мкмоль/л',
          value: 7.7
        }
      },
      {
        name: 'Фосфатаза щелочная',
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
         attributeType: AttributeType.Numeric,
        attributeData: {
          unit: '%',
          value: 43.2
        }
      },
      {
        name: 'Гемоглобин',
         attributeType: AttributeType.Numeric,
        attributeData: {
          unit: 'г/л',
          value: 43.2
        }
      },
      {
        name: 'Лейкоциты в крови',
         attributeType: AttributeType.Numeric,
        attributeData: {
          unit: '10⁹/л',
          value: 9.9
        }
      },
      {
        name: 'СОЭ',
         attributeType: AttributeType.Numeric,
        attributeData: {
          unit: 'мм/ч',
          value: 22.0
        }
      }
    ]
  }
]
