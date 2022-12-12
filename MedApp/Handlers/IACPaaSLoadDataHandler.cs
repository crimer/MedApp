using MedApp.Api;
using MedApp.Extensions;
using MedApp.Utils;
using FluentResults;
using MedApp.Models.Iacpaas;

namespace MedApp.Handlers;

public class IACPaaSLoadDataHandler
{
    private readonly int _maxTryCounter = 10;
    private readonly TimeSpan _period = TimeSpan.FromSeconds(2);
    private TaskCompletionSource<Result<DataSuccessor>> _completionSource;

    private SynchronizedTimer _chatsKickTimer;
    private int _tryCounter = 0;

    public Task<Result<DataSuccessor>> GetDataAsync()
    {
        _completionSource = new TaskCompletionSource<Result<DataSuccessor>>();

        _chatsKickTimer = new SynchronizedTimer(async (_) => await GetResultAsync(), null, TimeSpan.Zero, _period);

        return _completionSource.Task;
    }

    private async Task GetResultAsync()
    {
        try
        {
            // Инкремент попыток
            var count = Interlocked.Increment(ref _tryCounter);
            if (count >= _maxTryCounter)
            {
                var text = $"Не удалось получить результат за {_maxTryCounter} попыток, отмена операции";
                _completionSource.SetResult(Result.Fail(text));
                await StopAsync();
                return;
            }

            var isRunningDto = await IACPaaSApiClient.Instance.IsDiagnosticServiceRunningAsync();
            if(isRunningDto.IsFailed)
            {
                _completionSource.SetResult(Result.Fail(isRunningDto.Summary()));
                await StopAsync();
                return;
            }
                
            if(!isRunningDto.Value.Success)
            {
                _completionSource.SetResult(Result.Fail(isRunningDto.Value.SummaryErrorText()));
                await StopAsync();
                return;
            }

            if (isRunningDto.Value.Running)
                return;

            var diagnosticData = await IACPaaSApiClient.Instance.GetDiagnosticResultDataAsync();
            if(diagnosticData.IsFailed)
            {
                _completionSource.SetResult(Result.Fail(diagnosticData.Summary()));
                await StopAsync();
                return;
            }
                
            _completionSource.SetResult(diagnosticData.Value.Data);
            await StopAsync();
        }
        catch (OperationCanceledException)
        {
            _completionSource.SetResult(Result.Fail("Обработка отменена"));
            await StopAsync();
        }
        catch (Exception ex)
        {
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