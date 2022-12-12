using System.Globalization;
using MedApp.Models.Iacpaas;
using MedApp.Models.Viral;

namespace MedApp.Utils;

public class IacpaasDataConverter
{
    public static List<DataSuccessor> GetAttributes(List<ViralAttribute> viralAttributes)
        => viralAttributes.Select(GetAttribute).ToList();

    private static DataSuccessor GetAttribute(ViralAttribute viralAttribute) =>
        viralAttribute.AttributeType switch
        {
            AttributeType.Numeric => GetNumericAttribute(viralAttribute),
            AttributeType.Quality => GetQualityAttribute(viralAttribute),
            AttributeType.Complex => GetComplexAttribute(viralAttribute),
            _ => throw new ArgumentOutOfRangeException("Не реализованный тип признака")
        };

    private static DataSuccessor GetComplexAttribute(ViralAttribute viralAttribute)
    {
        var viralAttributeComplex = viralAttribute.AttributeData as ViralAttributeComplex;
        var characteristics = GetCharacteristics(viralAttributeComplex);
        return new DataSuccessor()
        {
            Meta = "Признак",
            Type = DataSuccessor.NoneTerminal,
            Name = viralAttribute.AttributeName,
            Successors = new List<DataSuccessor>()
            {
                new DataSuccessor()
                {
                    Name = "Составные значения",
                    Meta = "Составные значения",
                    Type = DataSuccessor.NoneTerminal,
                    Successors = characteristics
                }
            }
        };
    }

    private static List<DataSuccessor> GetCharacteristics(ViralAttributeComplex viralAttributeComplex)
        => viralAttributeComplex.Characteristics.Select(s =>
        {
            DataSuccessor dataSuccessor = null;

            if (s.Type == AttributeType.Numeric)
                dataSuccessor = GetNumeric(s.Data as ViralAttributeNumeric);

            if (s.Type == AttributeType.Quality)
                dataSuccessor = GetQuality(s.Data as ViralAttributeQuality);

            return new DataSuccessor()
            {
                Type = DataSuccessor.NoneTerminal,
                Name = s.Name,
                Meta = "Характеристика",
                Successors = new List<DataSuccessor>()
                {
                    new DataSuccessor()
                    {
                        Meta = "Выбор типа значений",
                        Name = "Выбор типа значений",
                        Type = DataSuccessor.NoneTerminal,
                        Successors = new List<DataSuccessor>()
                        {
                            dataSuccessor
                        }
                    }
                }
            };
        }).ToList();

    public static DataSuccessor GetDate(string meta) => new DataSuccessor()
    {
        Meta = meta,
        Type = DataSuccessor.TerminalValue,
        ValueType = DataSuccessor.Date,
        Value = DateTime.Now.ToString("dd.MM.yyyy-HH:mm:ss", CultureInfo.CurrentCulture)
    };

    public static DataSuccessor GetPassportPath(Pacient pacient)
    {
        return new DataSuccessor()
        {
            Type = DataSuccessor.NoneTerminal,
            Meta = "Паспортная часть",
            Name = "Паспортная часть",
            Successors = new List<DataSuccessor>()
            {
                new()
                {
                    Name = "Возраст",
                    Meta = "Возраст",
                    Type = DataSuccessor.NoneTerminal,
                    Successors = new List<DataSuccessor>()
                    {
                        new()
                        {
                            Meta = pacient.SelectedAgeUnit,
                            Value = pacient.SelectedAgeUnit,
                            Type = DataSuccessor.TerminalValue,
                            ValueType = DataSuccessor.Str
                        },
                        new()
                        {
                            Meta = "значение",
                            Value = pacient.AgeValue,
                            Type = DataSuccessor.TerminalValue,
                            ValueType = DataSuccessor.Integer
                        }
                    }
                },
                new()
                {
                    Name = "Пол",
                    Meta = "Пол",
                    Type = DataSuccessor.NoneTerminal,
                    Successors = new List<DataSuccessor>()
                    {
                        new()
                        {
                            Meta = pacient.SelectedSex,
                            Value = pacient.SelectedSex,
                            Type = DataSuccessor.TerminalValue,
                            ValueType = DataSuccessor.Str
                        }
                    }
                },
                new()
                {
                    Value = pacient.Nationality,
                    ValueType = DataSuccessor.Str,
                    Meta = "национальность",
                    Type = DataSuccessor.TerminalValue,
                }
            }
        };
    }

    private static DataSuccessor GetQualityAttribute(ViralAttribute viralAttribute)
    {
        var viralAttributeQuality = viralAttribute.AttributeData as ViralAttributeQuality;
        return new DataSuccessor()
        {
            Meta = "Признак",
            Type = DataSuccessor.NoneTerminal,
            Name = viralAttribute.AttributeName,
            Successors = new List<DataSuccessor>()
            {
                GetQuality(viralAttributeQuality)
            }
        };
    }

    private static DataSuccessor GetQuality(ViralAttributeQuality data)
    {
        var element = new DataSuccessor()
        {
            Type = DataSuccessor.TerminalValue,
            ValueType = DataSuccessor.Str,
            Meta = "значение",
            Value = data.SelectedItem
        };

        return new DataSuccessor()
        {
            Name = "Качественные значения",
            Meta = "Качественные значения",
            Type = DataSuccessor.NoneTerminal,
            Successors = new List<DataSuccessor>(){element}
        };
    }

    private static DataSuccessor GetNumericAttribute(ViralAttribute viralAttribute)
    {
        var viralAttributeNumeric = viralAttribute.AttributeData as ViralAttributeNumeric;
        return new DataSuccessor()
        {
            Meta = "Признак",
            Type = DataSuccessor.NoneTerminal,
            Name = viralAttribute.AttributeName,
            Successors = new List<DataSuccessor>()
            {
                GetNumeric(viralAttributeNumeric)
            }
        };
    }

    private static DataSuccessor GetNumeric(ViralAttributeNumeric data)
    {
        return new DataSuccessor()
        {
            Name = "Числовые значения",
            Meta = "Числовые значения",
            Type = DataSuccessor.NoneTerminal,
            Successors = new List<DataSuccessor>()
            {
                new DataSuccessor()
                {
                    Meta = "значение",
                    ValueType = DataSuccessor.Real,
                    Type = DataSuccessor.TerminalValue,
                    Value = data.Value
                },
                new DataSuccessor()
                {
                    Meta = "ед.изм.",
                    ValueType = DataSuccessor.Str,
                    Type = DataSuccessor.TerminalValue,
                    Value = data.Unit
                },
            }
        };
    }
}