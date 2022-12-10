namespace MedApp.Utils;

public sealed class SynchronizedTimer : IDisposable
{
    private readonly Timer _timer;
    private int _isCallbackRunning;

    /// <summary>
    /// .ctor
    /// </summary>
    /// <param name="callback">Делегат для выполнения</param>
    /// <param name="state">Объект, который прокидвается в качестве аргумента в делегат</param>
    /// <param name="dueTime">Время до запуска задачи</param>
    /// <param name="period">Переодичность запускаемой задачи</param>
    public SynchronizedTimer(Func<object, Task> callback, object state, TimeSpan dueTime, TimeSpan period)
    {
        var wrappedCallback = GetWrappedCallback(callback, state);
        _timer = new Timer(wrappedCallback, null, dueTime, period);
    }

    private TimerCallback GetWrappedCallback(Func<object, Task> callback, object state)
    {
        return async _ =>
        {
            if (Interlocked.Exchange(ref _isCallbackRunning, 1) == 1)
                return;

            await callback(state);

            _isCallbackRunning = 0;
        };
    }

    public void Dispose() => _timer.Dispose();
}