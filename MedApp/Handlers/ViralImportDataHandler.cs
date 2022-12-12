using MedApp.Api;
using MedApp.Api.Dto;
using FluentResults;
using MedApp.Models.Iacpaas;
using Newtonsoft.Json;

namespace MedApp.Handlers;

public class ViralImportDataHandler
{
    public async Task<Result<string>> ImportAsync(DataSuccessor newViral)
    {
        // Запрос на получение Med архива Root элемента
        var medArchive = await IACPaaSApiClient.Instance.GetMedArchiveAsync(1);
        if (medArchive.IsFailed)
            return medArchive.ToResult();

        var medDataRoot = medArchive.Value.Data;
            
        medDataRoot.Successors.Clear();
        medDataRoot.Successors.Add(newViral);
            
        var jsonData = JsonConvert.SerializeObject(medDataRoot, JsonConverterSettings.Settings);

        // Запрос на импорт
        var importResult = await IACPaaSApiClient.Instance.ImportDataAsync(new ImportToInforesourceDto(medDataRoot.Path, jsonData));
        if (importResult.IsFailed)
            return importResult.ToResult();

        if (!importResult.Value.Success)
            return Result.Fail($"Не удалось импортировать данные на платформу: {importResult.Value.Error}");
            
        return Result.Ok(newViral.Name);
    }
        
    
}