namespace MedApp.Models.Viral;

public class PatientDataBuilder
{
    public PatientData GetData()
    {
        return new PatientData()
        {
            Pacient = GetPacient(),
            // Построение списка жалоб
            Complaints = GetComplaints(),
            // Построение объективное состояние больного
            PatientObjectiveCondition = GetPatientObjectiveCondition(),
            // Клинический анализ крови
            ClinicalBloodLaboratoryStudies = GetClinicalBloodLaboratoryStudies(),
            // Биохим анализ крови
            BioBloodLaboratoryStudies = GetBioBloodLaboratoryStudies(),
            // Исследования инструментальные
            InstrumentalResearch = GetInstrumentalResearch(),
            // История настоящего заболевания
            PresentDiseaseHistory = GetPresentDiseaseHistory()
        };
    }

    private Pacient GetPacient()
    {
        var sex = new List<string>()
        {
            "мужской", "женский"
        };
        var age = new List<string>()
        {
            "год", "месяц", "неделя", "день"
        };
        return new Pacient()
        {
            AgeValue = 20,
            SexValues = sex,
            AgeValues = age,
            SelectedSex = sex[0],
            SelectedAgeUnit = age[0]
        };
    }

    /// <summary>
    /// История настоящего заболевания
    /// </summary>
    private PresentDiseaseHistory GetPresentDiseaseHistory()
    {
        return new PresentDiseaseHistory()
        {
            Alcohol = false,
            SelfTreatmentFact = new List<string>()
            {
                "улучшение",
                "без эффекта",
            },
            DietError = new List<string>()
            {
                "имеется",
                "прием жирной пищи",
                "прием жареной пищи",
                "прием острой пищи",
                "чрезмерное потребление пищи"
            },
            TakingMedication = new List<string>()
            {
                "Анальгетики",
                "Спазмолитики",
                "но-шпа",
                "дротаверин",
                "баралгин",
                "Антибиотики",
                "Ферменты",
                "фестал",
                "мезим"
            },
        };
    }

    /// <summary>
    /// Исследования инструментальные
    /// </summary>
    private List<ViralAttribute> GetInstrumentalResearch()
    {
        return new List<ViralAttribute>()
        {
            new()
            {
                AttributeType = AttributeType.Numeric,
                AttributeName = "Толщина стенки желчного пузыря (УЗИ желчного пузыря)",
                AttributeData = new ViralAttributeNumeric("мм", 2.2)
            },
            new()
            {
                AttributeType = AttributeType.Quality,
                AttributeName = "Структура стенки желчного пузыря (УЗИ желчного пузыря)",
                AttributeData = new ViralAttributeQuality(new List<string>()
                {
                    "слоистая", "неоднородная", "смазанная", "однородная"
                })
            },
            new()
            {
                AttributeType = AttributeType.Quality,
                AttributeName = "Конкременты желчного пузыря (УЗИ желчного пузыря)",
                AttributeData = new ViralAttributeQuality(new List<string>()
                {
                    "имеется", "отсутствует"
                })
            }
        };
    }

    /// <summary>
    /// Биохим анализ крови
    /// </summary>
    private List<ViralAttribute> GetBioBloodLaboratoryStudies()
    {
        return new List<ViralAttribute>()
        {
            new()
            {
                AttributeType = AttributeType.Numeric,
                AttributeName = "Белок общий в сыворотке",
                AttributeData = new ViralAttributeNumeric("г/л", 57.2)
            },
            new()
            {
                AttributeType = AttributeType.Numeric,
                AttributeName = "Билирубин общий",
                AttributeData = new ViralAttributeNumeric("мкмоль/л", 7.7)
            },
            new()
            {
                AttributeType = AttributeType.Numeric,
                AttributeName = "Фосфатаза щелочная",
                AttributeData = new ViralAttributeNumeric("Ед/л", 600.0)
            },
            new()
            {
                AttributeType = AttributeType.Numeric,
                AttributeName = "СОЭ",
                AttributeData = new ViralAttributeNumeric("мм/ч", 22.0)
            },
        };
    }

    /// <summary>
    /// Клинический анализ крови
    /// </summary>
    private List<ViralAttribute> GetClinicalBloodLaboratoryStudies()
    {
        return new List<ViralAttribute>()
        {
            new()
            {
                AttributeType = AttributeType.Numeric,
                AttributeName = "Гематокрит",
                AttributeData = new ViralAttributeNumeric("%", 43.2)
            },
            new()
            {
                AttributeType = AttributeType.Numeric,
                AttributeName = "Гемоглобин",
                AttributeData = new ViralAttributeNumeric("г/л", 43.2)
            },
            new()
            {
                AttributeType = AttributeType.Numeric,
                AttributeName = "Лейкоциты в крови",
                AttributeData = new ViralAttributeNumeric("10⁹/л", 9.9)
            },
            new()
            {
                AttributeType = AttributeType.Numeric,
                AttributeName = "СОЭ",
                AttributeData = new ViralAttributeNumeric("мм/ч", 22.0)
            },
        };
    }

    /// <summary>
    /// Объективное состояние больного
    /// </summary>
    private List<ViralAttribute> GetPatientObjectiveCondition()
    {
        return new List<ViralAttribute>()
        {
            // Влажность языка
            new()
            {
                AttributeName = "Влажность языка",
                AttributeType = AttributeType.Quality,
                AttributeData = new ViralAttributeQuality(new List<string>()
                {
                    "влажный", "сухой", "суховат"
                })
            },
            // Обложенность языка
            new()
            {
                AttributeType = AttributeType.Complex,
                AttributeName = "Обложенность языка",
                AttributeData = new ViralAttributeComplex()
                {
                    Characteristics = new List<ComplexCharacteristic>()
                    {
                        new ComplexCharacteristic()
                        {
                            Name = "Присутствие",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "имеется", "отсутствует"
                            })
                        },
                    }
                }
            },
            // Болезненность живота при поверхностной пальпации (качественные)
            new()
            {
                AttributeName = "Болезненность живота при поверхностной пальпации (качественные)",
                AttributeType = AttributeType.Complex,
                AttributeData = new ViralAttributeComplex()
                {
                    Characteristics = new List<ComplexCharacteristic>()
                    {
                        new()
                        {
                            Name = "Присутствие",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "имеется", "отсутствует"
                            })
                        },
                        new()
                        {
                            Name = "Локализация",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "правое подреберье", "верхний отдел живота"
                            })
                        },
                    }
                }
            },
            // Температура тела
            new()
            {
                AttributeName = "Температура тела",
                AttributeType = AttributeType.Complex,
                AttributeData = new ViralAttributeComplex()
                {
                    Characteristics = new List<ComplexCharacteristic>()
                    {
                        new()
                        {
                            Name = "Присутствие",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "имеется", "отсутствует"
                            })
                        },
                        new()
                        {
                            Name = "Значение",
                            Type = AttributeType.Numeric,
                            Data = new ViralAttributeNumeric( "С", 35)
                        },
                    }
                }
            },
            // Симптом Щеткина-Блюмберга
            new()
            {
                AttributeName = "Симптом Щеткина-Блюмберга",
                AttributeType = AttributeType.Complex,
                AttributeData = new ViralAttributeComplex()
                {
                    Characteristics = new List<ComplexCharacteristic>()
                    {
                        new()
                        {
                            Name = "Присутствие",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "имеется", "отсутствует"
                            })
                        },
                    }
                }
            },
        };
    }

    /// <summary>
    /// Построение списка жалоб
    /// </summary>
    private List<ViralAttribute> GetComplaints()
    {
        return new List<ViralAttribute>()
        {
            // Боль в животе
            new ViralAttribute()
            {
                AttributeType = AttributeType.Complex,
                AttributeName = "Боль в животе",
                AttributeData = new ViralAttributeComplex()
                {
                    Characteristics = new List<ComplexCharacteristic>()
                    {
                        new()
                        {
                            Name = "Присутствие",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "имеется", "отсутствует"
                            })
                        },
                        new()
                        {
                            Name = "Локализация",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "собственно эпигастрий",
                                "правое подреберье",
                                "левое подреберье",
                                "эпигастральная область",
                                "правая боковая область живота",
                                "левая боковая область живота",
                                "правая подвздошная область",
                                "нелокализованная",
                                "верхний отдел живота"
                            })
                        },
                        new()
                        {
                            Name = "Интенсивность",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "сильная",
                                "умеренная",
                                "слабая",
                                "резкая",
                                "резчайшая"
                            })
                        },
                        new()
                        {
                            Name = "Усиление",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "имеется", "отсутствует"
                            })
                        },
                        new()
                        {
                            Name = "Характер",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "острая", "тупая", "давящая", "колющая", "распирающая"
                            })
                        },
                    }
                }
            },

            // Нарушение аппетита
            new ViralAttribute()
            {
                AttributeType = AttributeType.Complex,
                AttributeName = "Нарушение аппетита",
                AttributeData = new ViralAttributeComplex()
                {
                    Characteristics = new List<ComplexCharacteristic>()
                    {
                        new()
                        {
                            Name = "Присутствие",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "имеется", "отсутствует"
                            })
                        },
                        new()
                        {
                            Name = "Характер",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "Повышение аппетита", "Снижение аппетита", "Отсутствие аппетита"
                            })
                        }
                    }
                }
            },

            // Нарушение вкуса
            new ViralAttribute()
            {
                AttributeType = AttributeType.Complex,
                AttributeName = "Нарушение вкуса",
                AttributeData = new ViralAttributeComplex()
                {
                    Characteristics = new List<ComplexCharacteristic>()
                    {
                        new()
                        {
                            Name = "Присутствие",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "имеется", "отсутствует"
                            })
                        },
                        new()
                        {
                            Name = "Характер",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "снижение вкуса",
                                "потеря вкуса",
                                "искажение вкуса",
                                "неприятный привкус во рту",
                                "кислый вкус во рту",
                                "металлический вкус во рту"
                            })
                        }
                    }
                }
            },

            // Тяжесть в животе
            new ViralAttribute()
            {
                AttributeType = AttributeType.Complex,
                AttributeName = "Тяжесть в животе",
                AttributeData = new ViralAttributeComplex()
                {
                    Characteristics = new List<ComplexCharacteristic>()
                    {
                        new()
                        {
                            Name = "Присутствие",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "имеется", "отсутствует"
                            })
                        },
                        new()
                        {
                            Name = "Характер",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "левая подреберная область",
                                "правая подреберная область",
                                "правая боковая область живота",
                                "левая боковая область живота"
                            })
                        }
                    }
                }
            },

            // Рвота
            new ViralAttribute()
            {
                AttributeType = AttributeType.Complex,
                AttributeName = "Рвота",
                AttributeData = new ViralAttributeComplex()
                {
                    Characteristics = new List<ComplexCharacteristic>()
                    {
                        new()
                        {
                            Name = "Присутствие",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "имеется", "отсутствует"
                            })
                        },
                        new()
                        {
                            Name = "Облегчение после рвоты",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "имеется", "отсутствует"
                            })
                        },
                        new()
                        {
                            Name = "Частота",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "однократно", "многократно", "повторно"
                            })
                        }
                    }
                }
            },

            // Вздутие живота
            new ViralAttribute()
            {
                AttributeName = "Вздутие живота",
                AttributeType = AttributeType.Quality,
                AttributeData = new ViralAttributeQuality(new List<string>()
                {
                    "имеется", "отсутствует"
                })
            },

            // Тошнота
            new ViralAttribute()
            {
                AttributeName = "Тошнота",
                AttributeType = AttributeType.Quality,
                AttributeData = new ViralAttributeQuality(new List<string>()
                {
                    "имеется", "отсутствует"
                })
            },

            // Сухость во рту
            new ViralAttribute()
            {
                AttributeName = "Сухость во рту",
                AttributeType = AttributeType.Quality,
                AttributeData = new ViralAttributeQuality(new List<string>()
                {
                    "имеется", "отсутствует"
                })
            },

            // Недомогание
            new ViralAttribute()
            {
                AttributeName = "Недомогание",
                AttributeType = AttributeType.Quality,
                AttributeData = new ViralAttributeQuality(new List<string>()
                {
                    "имеется", "отсутствует", "ухудшение состояния"
                })
            },

            // Общее состояние
            new ViralAttribute()
            {
                AttributeName = "Общее состояние",
                AttributeType = AttributeType.Quality,
                AttributeData = new ViralAttributeQuality(new List<string>()
                {
                    "удовлетворительное", "средней тяжести", "тяжелое", "ухудшение состояния"
                })
            },

            // Озноб
            new ViralAttribute()
            {
                AttributeName = "Озноб",
                AttributeType = AttributeType.Complex,
                AttributeData = new ViralAttributeComplex()
                {
                    Characteristics = new List<ComplexCharacteristic>()
                    {
                        new()
                        {
                            Name = "Присутствие",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "имеется", "отсутствует"
                            })
                        }
                    }
                }
            },

            // Общая слабость
            new ViralAttribute()
            {
                AttributeName = "Общая слабость",
                AttributeType = AttributeType.Complex,
                AttributeData = new ViralAttributeComplex()
                {
                    Characteristics = new List<ComplexCharacteristic>()
                    {
                        new()
                        {
                            Name = "Присутствие",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "имеется", "отсутствует"
                            })
                        },
                        new()
                        {
                            Name = "Выраженность",
                            Type = AttributeType.Quality,
                            Data = new ViralAttributeQuality(new List<string>()
                            {
                                "умеренно выраженная",
                                "умеренная",
                                "выраженная",
                                "сильная",
                                "резко выраженная"
                            })
                        }
                    }
                }
            },
        };
    }
}