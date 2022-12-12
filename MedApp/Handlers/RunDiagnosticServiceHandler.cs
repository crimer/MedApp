using MedApp.Api;
using MedApp.Api.Dto;
using MedApp.Extensions;
using MedApp.Models;
using MedApp.Utils;
using FluentResults;
using MedApp.Models.Iacpaas;
using Newtonsoft.Json;

namespace MedApp.Handlers;

public class RunDiagnosticServiceHandler
{
    public async Task<Result> RunAsync(string importedIbName)
    {
        var importResult = await ImportIbToDiagnosticResourceAsync(importedIbName);
        if (importResult.IsFailed)
            return Result.Fail(importResult.Summary());
            

        var runResult = await RunDiagnosticAsync();
        if (runResult.IsFailed)
            return Result.Fail(runResult.Summary());
            
        return Result.Ok();
    }

    private async Task<Result> RunDiagnosticAsync()
    {
        var res = await IACPaaSApiClient.Instance.RunDiagnosticServiceAsync();
        if (res.IsFailed)
            return Result.Fail($"Ошибка при запуске сервиса: {res.Summary()}");

        if (!res.Value.Success)
            return Result.Fail($"На удалось запустить сервис на платформе: {res.Summary()}");
            
        return Result.Ok();
    }

    private async Task<Result> ImportIbToDiagnosticResourceAsync(string importedIbName)
    {
        // Запрос результата диагностики
        var data = await IACPaaSApiClient.Instance.GetDiagnosticResultDataAsync();
        if (data.IsFailed)
            return  Result.Fail(data.Summary());

        var resultData = data.Value.Data;
        resultData.Successors.Clear();
        resultData.Successors.Add(CreateNewIb(importedIbName));

        var json = JsonConvert.SerializeObject(resultData, JsonConverterSettings.Settings);

        // Запрос на импорт названия ИБ в ресурс диагностики
        var importResult = await IACPaaSApiClient.Instance.ImportDataAsync(new ImportToInforesourceDto(resultData.Path, json, true));
        if (importResult.IsFailed)
            return Result.Fail(importResult.Summary());

        if (!importResult.Value.Success)
            return Result.Fail($"Не удалось импортировать данные в ресурс диагностики: {importResult.Value.Error}");

        // Logger.Success($"В ресурс диагностики успешно импотрирована новая ИБ {importedIbName}");

        return Result.Ok();
    }

    private DataSuccessor CreateNewIb(string ibName)
    {
        return new DataSuccessor()
        {
            Meta = "Имя ИБ",
            Name = "Имя ИБ",
            Type = DataSuccessor.NoneTerminal,
            Successors = new List<DataSuccessor>()
            {
                new DataSuccessor()
                {
                    Meta = "Имя ИБ",
                    Value = ibName,
                    ValueType = DataSuccessor.Str,
                    Type = DataSuccessor.TerminalValue
                }
            }
        };
    }
}