using Newtonsoft.Json;

namespace MedApp.Api.Dto;

public class InfoResourceDto<TDto>
{
    [JsonProperty("filename")] 
    public string FileName { get; set; }

    private string _dataJson;

    [JsonProperty("data")]
    public string DataJson
    {
        get => _dataJson;
        set
        {
            _dataJson = value;
            Data = JsonConvert.DeserializeObject<TDto>(value);
        }
    }

    [JsonIgnore] 
    public TDto Data { get; set; }
}