using System.Globalization;
using MedApp.Models;
using MedApp.Models.Iacpaas;
using MedApp.Models.Viral;
using Newtonsoft.Json;

namespace MedApp.Utils;

public class IacpaasDataConverter
{
    public static List<DataSuccessor> GetAttributes(List<ViralAttribute> viralAttributes) 
        => viralAttributes.Select(GetAttribute).ToList();

    public static DataSuccessor GetAttribute(ViralAttribute viralAttribute)
    {
        switch (viralAttribute.AttributeType)
        {
            case AttributeType.Numeric: return GetNumericAttribute(viralAttribute);
            case AttributeType.Quality: return GetQualityAttribute(viralAttribute);
            case AttributeType.Complex: return GetComplexAttribute(viralAttribute);
        }
        return null;
    }

    private static DataSuccessor GetComplexAttribute(ViralAttribute viralAttribute)
    {
        var viralAttributeComplex = JsonConvert.DeserializeObject<ViralAttributeComplex>(viralAttribute.AttributeData.ToString());
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
            {
                var attributeNumeric = JsonConvert.DeserializeObject<ViralAttributeNumeric>(s.Data.ToString());
                dataSuccessor = GetNumeric(attributeNumeric);
            }
                
            if (s.Type == AttributeType.Quality)
            {
                var attributeQuality = JsonConvert.DeserializeObject<ViralAttributeQuality>(s.Data.ToString());
                dataSuccessor = GetQuality(attributeQuality);
            }
                
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
        
    public static DataSuccessor GetPassportPath(PatientData patientData)
    {
        return new DataSuccessor()
        {
            Meta = "Паспортная часть",
            Type = DataSuccessor.NoneTerminal,
            Name = "Паспортная часть",
            Successors = new List<DataSuccessor>()
            {
                new DataSuccessor()
                {
                    Name = "Возраст",
                    Meta = "Возраст",
                    Type = DataSuccessor.NoneTerminal,
                    Successors = new List<DataSuccessor>()
                    {
                        new DataSuccessor()
                        {
                            // Meta = patientData.YearUnit,
                            // Value = patientData.YearUnit,
                            Type = DataSuccessor.TerminalValue,
                            ValueType = DataSuccessor.Str
                        },
                        new DataSuccessor()
                        {
                            Meta = "значение",
                            // Value = patientData.YearValue,
                            Type = DataSuccessor.TerminalValue,
                            ValueType = DataSuccessor.Integer
                        }
                    }
                },
                new DataSuccessor()
                {
                    Name = "Пол",
                    Meta = "Пол",
                    Type = DataSuccessor.NoneTerminal,
                    Successors = new List<DataSuccessor>()
                    {
                        new DataSuccessor()
                        {
                            // Meta = patientData.Sex,
                            // Value = patientData.Sex,
                            Type = DataSuccessor.TerminalValue,
                            ValueType = DataSuccessor.Str
                        }
                    }
                },
                new DataSuccessor()
                {
                    // Value = patientData.Nationality,
                    ValueType = DataSuccessor.Str,
                    Meta = "национальность",
                    Type = DataSuccessor.TerminalValue,
                }
            }
        };
    }

    private static DataSuccessor GetQualityAttribute(ViralAttribute viralAttribute)
    {
        var viralAttributeQuality = JsonConvert.DeserializeObject<ViralAttributeQuality>(viralAttribute.AttributeData.ToString());
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
        // var elements = data.Values.Select(s => new DataSuccessor()
        // {
        //     Type = DataSuccessor.TerminalValue,
        //     ValueType = DataSuccessor.Str,
        //     Meta = "значение",
        //     Value = s
        // }).ToList();
            
        return new DataSuccessor()
        {
            Name = "Качественные значения",
            Meta = "Качественные значения",
            Type = DataSuccessor.NoneTerminal,
            // Successors = elements
        };
    }

    private static DataSuccessor GetNumericAttribute(ViralAttribute viralAttribute)
    {
        var viralAttributeNumeric = JsonConvert.DeserializeObject<ViralAttributeNumeric>(viralAttribute.AttributeData.ToString());
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
                    // Value = data.Unit
                },
            }
        };
    }
}