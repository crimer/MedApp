
namespace MedApp.Models.Viral;

/// <summary>
/// Любой признак
/// </summary>
public class ViralAttribute
{
    /// <summary>
    /// Тип признака
    /// </summary>
    public AttributeType AttributeType { get; set; }
        
    /// <summary>
    /// Данные признака
    /// </summary>
    public object AttributeData { get; set; }
        
    /// <summary>
    /// Имя признака
    /// </summary>
    public string AttributeName { get; set; }

    public ViralAttribute(string attributeName, AttributeType attributeType)
    {
        AttributeType = attributeType;
        AttributeName = attributeName;
    }

    public ViralAttribute()
    {
        
    }
}

/// <summary>
/// Составная характеристика
/// </summary>
public class ComplexCharacteristic
{
    /// <summary>
    /// Название характеристики
    /// </summary>
    public string Name { get; set; }
        
    /// <summary>
    /// Данные характеристики
    /// </summary>
    public object Data { get; set; }
        
    /// <summary>
    /// Тип данных характеристики
    /// </summary>
    public AttributeType Type { get; set; }
}
    
/// <summary>
/// Составное значение
/// </summary>
public class ViralAttributeComplex
{
    /// <summary>
    /// Характеристики
    /// </summary>
    public List<ComplexCharacteristic> Characteristics { get; set; }
}
    
/// <summary>
/// Числовое значение
/// </summary>
public class ViralAttributeQuality
{
    public string? SelectedItem { get; set; }
    public List<string> Items { get; }

    public ViralAttributeQuality(List<string> items)
    {
        SelectedItem = string.Empty;
        Items = items;
    }
}

/// <summary>
/// Числовое значение
/// </summary>
public class ViralAttributeNumeric
{
    public string Unit { get; set; }
    public double Value { get; set; } = 0;

    public ViralAttributeNumeric(string unit,  double value)
    {
        Unit = unit;
        Value = value;
    }
}

/// <summary>
/// История настоящего заболевания
/// </summary>
public class PresentDiseaseHistory
{
    /// <summary>
    /// Погрешность в диете 
    /// </summary>
    public List<string> DietError { get; set; } 
        
    /// <summary>
    /// Прием лекарственных препаратов в начале заболевания
    /// </summary>
    public List<string> TakingMedication { get; set; } 
        
    /// <summary>
    /// Употребление алкоголя  
    /// </summary>
    public bool Alcohol { get; set; }
        
    /// <summary>
    /// Факт самостоятельного лечения (без эффекта, улучшение)
    /// </summary>
    public List<string> SelfTreatmentFact { get; set; }
}

public class Pacient
{
    /// <summary>
    /// Пол
    /// </summary>
    public string SelectedSex { get; set; }
        
    /// <summary>
    /// Единица измерения возраста (год, месяц, неделя, день)
    /// </summary>
    public string SelectedAgeUnit { get; set; }
        
    /// <summary>
    /// Возраст
    /// </summary>
    public int AgeValue { get; set; }
        
    /// <summary>
    /// Национальность
    /// </summary>
    public string Nationality { get; set; }
    
    
    public List<string> SexValues = new();

    public List<string> AgeValues = new();
}

public class PatientData
{
    public Pacient Pacient { get; set; }
    
    /// <summary>
    /// Жалобы
    /// </summary>
    public List<ViralAttribute> Complaints { get; set; }
        
    /// <summary>
    /// Объективное состояние больного
    /// </summary>
    public List<ViralAttribute> PatientObjectiveCondition { get; set; }
        
    /// <summary>
    /// Лабораторные исследования (Клинический анализ крови)
    /// </summary>
    public List<ViralAttribute> ClinicalBloodLaboratoryStudies { get; set; }
        
    /// <summary>
    /// Лабораторные исследования (Биохимический анализ крови)
    /// </summary>
    public List<ViralAttribute> BioBloodLaboratoryStudies { get; set; }
        
    /// <summary>
    /// Инструментальные исследования
    /// </summary>
    public List<ViralAttribute> InstrumentalResearch { get; set; }
        
    /// <summary>
    /// История настоящего заболевания
    /// </summary>
    public PresentDiseaseHistory PresentDiseaseHistory { get; set; }

}