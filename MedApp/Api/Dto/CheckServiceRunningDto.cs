using Newtonsoft.Json;

namespace MedApp.Api.Dto;

public class CheckServiceRunningDto: IacpaasResponseDto
{
    [JsonProperty("running")]
    public bool Running { get; set; }
}