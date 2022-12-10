using Newtonsoft.Json;

namespace MedApp.Models.Iacpaas;

public class DataSuccessorRoot : DataSuccessor
{
    [JsonProperty("json_type")] public string JsonType { get; set; }
    [JsonProperty("title")] public string Title { get; set; }
    [JsonProperty("owner_id")] public int OwnerId { get; set; }
    [JsonProperty("path")] public string Path { get; set; }
    [JsonProperty("date")] public string Date { get; set; }
    [JsonProperty("creation")] public string Creation { get; set; }
    [JsonProperty("ontology")] public string Ontology { get; set; }
}

public class DataSuccessor
{
    public const string NoneTerminal = "НЕТЕРМИНАЛ";
    public const string TerminalValue = "ТЕРМИНАЛ-ЗНАЧЕНИЕ";
    public const string TerminalSort = "ТЕРМИНАЛ-СОРТ";
    public const string Start = "НАЧАЛО";
    public const string Str = "STRING";
    public const string Integer = "INTEGER";
    public const string Blob = "BLOB";
    public const string Date = "DATE";
    public const string Real = "REAL";
    public const string Boolean = "BOOLEAN";
        
    [JsonIgnore] public string StringValue => Value?.ToString() ?? string.Empty;
    [JsonProperty("name")] public string Name { get; set; }
    [JsonProperty("type")] public string Type { get; set; }
    [JsonProperty("valtype")] public string ValueType { get; set; }
    [JsonProperty("value")] public object Value { get; set; }
    [JsonProperty("original")] public string Original { get; set; }
    [JsonProperty("link")] public string Link { get; set; }
    [JsonProperty("successors")] public List<DataSuccessor> Successors { set; get; }
    [JsonProperty("meta")] public string Meta { get; set; }
}