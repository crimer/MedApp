using Newtonsoft.Json;

namespace MedApp.Api.Dto;

public class IacpaasResponseDto
{
    [JsonProperty("error")]
    public string Error { get; set; }

    [JsonProperty("explanation")]
    public string Explanation { get; set; }

    [JsonProperty("success")]
    public bool Success { get; set; }

    [JsonProperty("platformUnavailable")]
    public bool PlatformUnavailable { get; set; }
        
    [JsonProperty("explanationSafe")]
    public string ExplanationSafe { get; set; }

    public string SummaryErrorText() => $"{this.Error}\n{this.Explanation}";
}