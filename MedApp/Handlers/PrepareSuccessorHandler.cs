using MedApp.Models.Iacpaas;
using MedApp.Models.Viral;
using MedApp.Utils;

namespace MedApp.Handlers;

public class PrepareSuccessorHandler
{
    public DataSuccessor CreateViralHistory(PatientData patientData)
    {
        return new DataSuccessor()
        {
            Name = $"ИБ-{GetUnixTimeNumber()}",
            Meta = "История болезни",
            Type = DataSuccessor.NoneTerminal,
            Successors = new List<DataSuccessor>()
            {
                // Паспортная часть
                IacpaasDataConverter.GetPassportPath(patientData.Pacient),
                // Дата обращения
                IacpaasDataConverter.GetDate("дата обращения"),
                // Жалобы
                GetComplaints(patientData.Complaints),
                // Объективное состояние больного
                GetPatientObjectiveCondition(patientData.PatientObjectiveCondition),
                // Исследования лабораторные
                GetLaboratoryStudies(patientData.ClinicalBloodLaboratoryStudies, patientData.BioBloodLaboratoryStudies),
                // Инструментальные исследования
                GetInstrumentalResearch(patientData.InstrumentalResearch),
                // История настоящего заболевания
                // GetPresentDiseaseHistory(patientData.PresentDiseaseHistory),
            },
        };
    }

    /// <summary>
    /// Жалобы
    /// </summary>
    private DataSuccessor GetComplaints(List<ViralAttribute> patientDataComplaints)
    {
        return new DataSuccessor()
        {
            Meta = "Жалобы при обращении",
            Name = "Жалобы при обращении",
            Type = DataSuccessor.NoneTerminal,
            Successors = IacpaasDataConverter.GetAttributes(patientDataComplaints),
        };
    }

    /// <summary>
    /// Объективное состояние больного
    /// </summary>
    private DataSuccessor GetPatientObjectiveCondition(List<ViralAttribute> patientObjectiveCondition)
    {
        var items = IacpaasDataConverter.GetAttributes(patientObjectiveCondition);
        var tempLookup = items.ToLookup(s => s.Name == "Температура тела");
        var temp = tempLookup[true].ToList();
        var other = tempLookup[false].ToList();

        return new DataSuccessor()
        {
            Meta = "Объективное состояние больного",
            Name = "Объективное состояние больного",
            Type = DataSuccessor.NoneTerminal,
            Successors = new List<DataSuccessor>()
            {
                new DataSuccessor()
                {
                    Meta = "Общий осмотр",
                    Name = "Общий осмотр",
                    Type = DataSuccessor.NoneTerminal,
                    Successors = temp
                },
                new DataSuccessor()
                {
                    Meta = "Осмотр по системам",
                    Name = "Осмотр по системам",
                    Type = DataSuccessor.NoneTerminal,
                    Successors = new List<DataSuccessor>()
                    {
                        new DataSuccessor()
                        {
                            Meta = "Система пищеварения",
                            Name = "Система пищеварения",
                            Type = DataSuccessor.NoneTerminal,
                            Successors = other,
                        }
                    }
                }
            },
        };
    }

    /// <summary>
    /// История настоящего заболевания
    /// </summary>
    private DataSuccessor GetPresentDiseaseHistory(PresentDiseaseHistory patientDiseaseHistory)
    {
        return new DataSuccessor()
        {
            Meta = "История настоящего заболевания",
            Name = "История настоящего заболевания",
            Type = DataSuccessor.NoneTerminal,
            Successors = new List<DataSuccessor>()
            {
                IacpaasDataConverter.GetDate("С какого времени считает себя больным"),
                new DataSuccessor()
                {
                    Meta = "Факт самостоятельного лечения",
                    Name = "1",
                    Type = DataSuccessor.NoneTerminal,
                    Successors = new List<DataSuccessor>()
                    {
                        new DataSuccessor()
                        {
                            Name = "Эффект",
                            Meta = "Эффект",
                            Type = DataSuccessor.NoneTerminal,
                            Successors = new List<DataSuccessor>()
                            {
                                new DataSuccessor()
                                {
                                    // Meta = patientDiseaseHistory.SelfTreatmentFact,
                                    Value = patientDiseaseHistory.SelfTreatmentFact,
                                    ValueType = DataSuccessor.Str,
                                    Type = DataSuccessor.TerminalValue,
                                }
                            }
                        }
                    }
                },
                new DataSuccessor()
                {
                    Meta = "Возможные причины заболевания",
                    Name = "Возможные причины заболевания",
                    Type = DataSuccessor.NoneTerminal,
                    Successors = new List<DataSuccessor>()
                    {
                        // new DataSuccessor()
                        // {
                        //     Name = "Погрешность в диете",
                        //     Meta = "Событие",
                        //     Type = DataSuccessor.NoneTerminal,
                        //     Successors = new List<DataSuccessor>()
                        //     {
                        //         new DataSuccessor()
                        //         {
                        //             Meta = "уточнение",
                        //             ValueType = DataSuccessor.Str,
                        //             Type = DataSuccessor.TerminalValue,
                        //             Value = patientDiseaseHistory.DietError,
                        //         },
                        //     }
                        // },
                        new DataSuccessor()
                        {
                            Name = "Употребление алкоголя",
                            Meta = "Событие",
                            Type = DataSuccessor.NoneTerminal,
                            Successors = new List<DataSuccessor>()
                            {
                                new DataSuccessor()
                                {
                                    Meta = "Характеристика",
                                    Name = "Присутствие",
                                    Type = DataSuccessor.NoneTerminal,
                                    Successors = new List<DataSuccessor>()
                                    {
                                        new DataSuccessor()
                                        {
                                            Meta = "Качественные значения",
                                            Name = "Качественные значения",
                                            Type = DataSuccessor.NoneTerminal,
                                            Successors = new List<DataSuccessor>()
                                            {
                                                new DataSuccessor()
                                                {
                                                    Meta = "значение",
                                                    ValueType = DataSuccessor.Str,
                                                    Type = DataSuccessor.TerminalValue,
                                                    Value = patientDiseaseHistory.Alcohol ? "да" : "нет"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        new DataSuccessor()
                        {
                            Name = "Прием лекарственных препаратов в начале заболевания",
                            Meta = "Событие",
                            Type = DataSuccessor.NoneTerminal,
                            Successors = new List<DataSuccessor>()
                            {
                                new DataSuccessor()
                                {
                                    Meta = "уточнение",
                                    ValueType = DataSuccessor.Str,
                                    Type = DataSuccessor.TerminalValue,
                                    Value = patientDiseaseHistory.TakingMedication,
                                },
                            }
                        }
                    }
                }
            }
        };
    }

    /// <summary>
    /// Исследования лабораторные
    /// </summary>
    /// <param name="clinicalBloodLaboratoryStudies">Клинический анализ крови</param>
    /// <param name="bioBloodLaboratoryStudies">Биохимический анализ крови</param>
    /// <returns></returns>
    private DataSuccessor GetLaboratoryStudies(List<ViralAttribute> clinicalBloodLaboratoryStudies, List<ViralAttribute> bioBloodLaboratoryStudies)
    {
        var clinicalLaboratoryAttributes = IacpaasDataConverter.GetAttributes(clinicalBloodLaboratoryStudies);
        var bioLaboratoryAttributes = IacpaasDataConverter.GetAttributes(bioBloodLaboratoryStudies);

        var clinical = new List<DataSuccessor> { IacpaasDataConverter.GetDate("дата") };
        clinical.AddRange(clinicalLaboratoryAttributes);

        var bio = new List<DataSuccessor> { IacpaasDataConverter.GetDate("дата") };
        bio.AddRange(bioLaboratoryAttributes);

        return new DataSuccessor()
        {
            Meta = "Исследования лабораторные",
            Name = "Исследования лабораторные",
            Type = DataSuccessor.NoneTerminal,
            Successors = new List<DataSuccessor>()
            {
                new DataSuccessor()
                {
                    Meta = "Группа признаков (вид исследования)",
                    Name = "Клинический анализ крови",
                    Type = DataSuccessor.NoneTerminal,
                    Successors = new List<DataSuccessor>()
                    {
                        new DataSuccessor()
                        {
                            Name = "1",
                            Meta = "Номер записи",
                            Type = DataSuccessor.NoneTerminal,
                            Successors = clinical
                        }
                    }
                },
                new DataSuccessor()
                {
                    Meta = "Группа признаков (вид исследования)",
                    Name = "Биохимическое исследование крови",
                    Type = DataSuccessor.NoneTerminal,
                    Successors = new List<DataSuccessor>()
                    {
                        new DataSuccessor()
                        {
                            Name = "1",
                            Meta = "Номер записи",
                            Type = DataSuccessor.NoneTerminal,
                            Successors = bio
                        }
                    }
                }
            }
        };
    }

    /// <summary>
    /// Инструментальные исследования
    /// </summary>
    private DataSuccessor GetInstrumentalResearch(List<ViralAttribute> instrumentalResearch)
    {
        var instrumentAttributes = IacpaasDataConverter.GetAttributes(instrumentalResearch);
        var instrument = new List<DataSuccessor>() { IacpaasDataConverter.GetDate("дата") };
        instrument.AddRange(instrumentAttributes);

        return new DataSuccessor()
        {
            Meta = "Исследования инструментальные",
            Name = "Исследования инструментальные",
            Type = DataSuccessor.NoneTerminal,
            Successors = new List<DataSuccessor>()
            {
                new DataSuccessor()
                {
                    Meta = "Группа признаков (вид исследования)",
                    Name = "УЗИ желчного пузыря",
                    Type = DataSuccessor.NoneTerminal,
                    Successors = new List<DataSuccessor>()
                    {
                        new DataSuccessor()
                        {
                            Meta = "Номер записи",
                            Name = "1",
                            Type = DataSuccessor.NoneTerminal,
                            Successors = instrument
                        }
                    }
                }
            }
        };
    }

    private long GetUnixTimeNumber() =>
        (DateTime.UtcNow.Ticks - new DateTime(1970, 1, 1).Ticks) / TimeSpan.TicksPerSecond;
}