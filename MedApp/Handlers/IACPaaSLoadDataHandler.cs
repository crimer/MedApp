using MedApp.Api;
using MedApp.Extensions;
using MedApp.Models;
using MedApp.Utils;
using FluentResults;
using MedApp.Context;
using MedApp.Models.Iacpaas;

namespace MedApp.Handlers;

public class IACPaaSLoadDataHandler
{
    private readonly int _maxTryCounter = 10;
    private readonly TimeSpan _period = TimeSpan.FromSeconds(2);
    private TaskCompletionSource<Result<DataSuccessor>> _completionSource;

    private SynchronizedTimer _chatsKickTimer;
    private int _tryCounter = 0;

    public Task<Result<DataSuccessor>> GetDataAsync(CancellationToken token)
    {
        // Logger.Info("Начат процесс получения результатов с платформы IACPaaS");

        _completionSource = new TaskCompletionSource<Result<DataSuccessor>>();

        _chatsKickTimer = new SynchronizedTimer(async (_) => await GetResultAsync(token), null, TimeSpan.Zero, _period);

        return _completionSource.Task;
    }

    private async Task GetResultAsync(CancellationToken token)
    {
        try
        {
            // Инкремент попыток
            var count = Interlocked.Increment(ref _tryCounter);
            if (count >= _maxTryCounter)
            {
                var text = $"Не удалось получить результат за {_maxTryCounter} попыток, отмена операции";
                // Logger.Error(text);
                _completionSource.SetResult(Result.Fail(text));
                return;
            }

            // Logger.Markup($"Попытка получения ({count}/{_maxTryCounter})...");
                
            var isRunningDto = await IACPaaSApiClient.Instance.IsServiceRunningAsync();
            if(isRunningDto.IsFailed)
            {
                _completionSource.SetResult(Result.Fail(isRunningDto.Summary()));
                // Logger.Error($"Ошибка получения результата диагностики: {isRunningDto.Summary()}");
                await StopAsync();
                return;
            }
                
            if(!isRunningDto.Value.Success)
            {
                _completionSource.SetResult(Result.Fail(isRunningDto.Value.SummaryErrorText()));
                // Logger.Error($"Ошибка получения результата диагностики: {isRunningDto.Value.SummaryErrorText()}");
                await StopAsync();
                return;
            }

            if (isRunningDto.Value.Running)
            {
                // Logger.Info("Идет диагностики");
                return;
            }

            var diagnosticData = await IACPaaSApiClient.Instance.GetDiagnosticResultDataAsync();
            if(diagnosticData.IsFailed)
            {
                _completionSource.SetResult(Result.Fail(diagnosticData.Summary()));
                // Logger.Error($"Ошибка получения результата диагностики: {diagnosticData.Summary()}");
                await StopAsync();
                return;
            }
                
            // Logger.Success("Данные успешно получены");

            _completionSource.SetResult(diagnosticData.Value.Data);

            await StopAsync();
        }
        catch (OperationCanceledException)
        {
            // Logger.Error("Обработка отменена");
            _completionSource.SetResult(Result.Fail("Обработка отменена"));

            await StopAsync();
        }
        catch (Exception ex)
        {
            // Logger.Error($"Ошибка {ex}");
            _completionSource.SetResult(Result.Fail($"Ошибка {ex}"));

            await StopAsync();
        }
    }

    private Task StopAsync()
    {
        _chatsKickTimer.Dispose();
        return Task.CompletedTask;
    }
}