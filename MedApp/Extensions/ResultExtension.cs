using FluentResults;

namespace MedApp.Extensions;

/// <summary>
/// Методы расширения для Result класса
/// </summary>
public static class ResultExtension
{
    /// <summary>
    /// Получение текста всех ошибок
    /// </summary>
    /// <param name="result">Result</param>
    /// <returns>Строка ошибок</returns>
    public static string Summary(this Result result)
        => string.Join("/", result.Errors.Select(error => error.Message));
        
    /// <summary>
    /// Получение текста всех ошибок
    /// </summary>
    /// <param name="result">Result</param>
    /// <returns>Строка ошибок</returns>
    public static string Summary<T>(this Result<T> result)
        => string.Join("/", result.Errors.Select(error => error.Message));
}