using System.Text.RegularExpressions;
using Newtonsoft.Json;

namespace MedApp.Api.Dto;

public class ImportToInforesourceDto
{
    [JsonProperty("path")] public string Path { get; private set; }

    [JsonProperty("clearIfExists")] public bool ClearIfExists { get; private set; }

    [JsonProperty("json")] public string Json { get; private set; }

    public ImportToInforesourceDto(string path, string json, bool clearIfExists = false)
    {
        Path = BuildPath(path);
        Json = json;
        ClearIfExists = clearIfExists;
    }

    private string BuildPath(string path)
    {
        var regex = new Regex(@"[$;]+", RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
        var sb = new List<string>();

        var pathes = path.Split('/');

        foreach (var pathItem in pathes)
        {
            if(pathItem.Contains("@") || pathItem.Contains("Мой Фонд"))
                continue;

            var pathElement = regex.Replace(pathItem, "");
            sb.Add(pathElement);
        }
        return string.Join("/", sb.Take(sb.Count - 1));
    }
}