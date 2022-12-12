using MedApp.Api.Dto;
using MedApp.Extensions;
using MedApp.Models;
using FluentResults;
using MedApp.Models.Iacpaas;
using Newtonsoft.Json;

namespace MedApp.Api;

/// <summary>
/// Клиент запросов на IACPaaS
/// </summary>
public class IACPaaSApiClient
{
    /// <summary>
    /// Синглтон
    /// </summary>
    public static IACPaaSApiClient Instance { get; } = new();

    private const string DiagnosisWithoutUiServiceId = "4640284589039782382";

    private IACPaaSApiClient() { }

    /// <summary>
    /// Запуск сервиса
    /// </summary>
    public async Task<Result<IacpaasResponseDto>> RunDiagnosticServiceAsync()
    {
        try
        {
            using var client = GetClient();
            var task = await client.SendGetRequestAsync<IacpaasResponseDto>($"/api/service/run/{DiagnosisWithoutUiServiceId}");
            return task;
        }
        catch (OperationCanceledException)
        {
            return Result.Fail("Запрос на запуск сервиса отменен по тайм-ауту");
        }
        catch (Exception)
        {
            return Result.Fail("Произошла ошибка при отправке запроса на запуск сервиса");
        }
    }
        
    /// <summary>
    /// Выяснение статуса работы сервиса
    /// </summary>
    public async Task<Result<CheckServiceRunningDto>> IsDiagnosticServiceRunningAsync()
    {
        try
        {
            var client = GetClient();
            return await client.SendGetRequestAsync<CheckServiceRunningDto>($"/api/service/{DiagnosisWithoutUiServiceId}/running");
        }
        catch (OperationCanceledException)
        {
            return Result.Fail("Запрос на проверку работы сервиса отменен по тайм-ауту");
        }
        catch (Exception)
        {
            return Result.Fail("Произошла ошибка при отправке запроса на проверку работы сервиса");
        }
    }

    /// <summary>
    /// Авторизация
    /// </summary>
    public async Task<Result> AuthorizeAsync(string login, string password, CancellationToken token)
    {
        try
        {
            using (var client = GetClient())
            {
                var jsonData = JsonConvert.SerializeObject(new { username = login, password = password });
                var authResult = await client.SendPostRequestAsync(jsonData, $"/api/signin", cancellationToken: token);
                return authResult;
            }
        }
        catch (OperationCanceledException)
        {
            return Result.Fail("Запрос на авторизацию отменен по тайм-ауту");
        }
        catch (Exception)
        {
            return Result.Fail("Произошла ошибка при отправке запроса на авторизацию");
        }
    }

    /// <summary>
    /// Импорт JSON инфо-ресурса в платформу
    /// </summary>
    public async Task<Result<IacpaasResponseDto>> ImportDataAsync(ImportToInforesourceDto importDto)
    {
        try
        {
            var client = GetClient();
            var jsonData = JsonConvert.SerializeObject(importDto);
            var apiResult = await client.SendPostRequestAsync<IacpaasResponseDto>(jsonData, $"/api/data/import");
            return apiResult;
        }
        catch (OperationCanceledException)
        {
            return Result.Fail("Запрос на сохранение новых данных отменен по тайм-ауту");
        }
        catch (Exception)
        {
            return Result.Fail("Произошла ошибка при отправке запроса на сохранение новых данных");
        }
    }
        
    public async Task<Result<InfoResourceDto<DataSuccessorRoot>>> GetDiagnosticResultDataAsync()
    {
        var path = "Сервис диагностики (без интерфейса, с заменяемой БЗ)/Результат Диагн без интерфейса";
        try
        {
            var apiResult = await LoadInfoResourceAsync<InfoResourceDto<DataSuccessorRoot>>(path, "/", null, CancellationToken.None);
            if(apiResult.Value == null || apiResult.Value.Data == null)
                return Result.Fail($"Не удалось получить данные по пути - {path}");
                
            return apiResult;
        }
        catch (OperationCanceledException)
        {
            return Result.Fail($"Запрос на получение результата диагностики отменен по тайм-ауту");
        }
        catch (Exception)
        {
            return Result.Fail($"Произошла ошибка при отправке запроса на получение результата диагностики");
        }
    }
        
    public async Task<Result<InfoResourceDto<DataSuccessorRoot>>> GetMedArchiveAsync(int? exportDepth = null)
    {
        var path = "Сервис диагностики (без интерфейса, с заменяемой БЗ)/Архив Историй MedIACP";
        try
        {
            var apiResult = await LoadInfoResourceAsync<InfoResourceDto<DataSuccessorRoot>>(path, "/", exportDepth, CancellationToken.None);
            if(apiResult.Value == null || apiResult.Value.Data == null)
                return Result.Fail($"Не удалось получить данные по пути - {path}");
                
            return apiResult;
        }
        catch (OperationCanceledException)
        {
            return Result.Fail($"Запрос на получение Med архива отменен по тайм-ауту");
        }
        catch (Exception)
        {
            return Result.Fail($"Произошла ошибка при отправке запроса на получение Med архива");
        }
    }
        
    private async Task<Result<TResult>> LoadInfoResourceAsync<TResult>(
        string path, 
        string startTargetConceptPath = "/", 
        int? exportDepth = null, 
        CancellationToken cts = default)
    {
        var queryArgs = new Dictionary<string, string>()
        {
            { "path", path },
            { "json-type", "universal" },
            { "start-target-concept-path", startTargetConceptPath },
            { "export-depth", exportDepth.ToString() },
        };

        using (var client = GetClient())
        {
            var apiResult = await client.SendGetRequestAsync<TResult>($"/api/data/export/user-item", queryArgs, cancellationToken: cts);
            return apiResult;
        }
    }
        
    private HttpClient GetClient()
    {
        const string medAccountApiKey = "6cf60d216c5b1b32ebfbbb5492c5a1b7";
        var client = new HttpClient()
        {
            BaseAddress = new Uri("https://iacpaas.dvo.ru"),
        };
        client.DefaultRequestHeaders.Add("X-API-KEY", medAccountApiKey);
        return client;
    }

}