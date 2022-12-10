namespace MedApp.Extensions;

public static class StringExtensions
{
    /// <summary>
    /// Увеличение первой буксы строки
    /// </summary>
    /// <param name="text">Строка</param>
    /// <returns>Строка</returns>
    public static string CapitalizeFirstLetter(this string text)
    {
        if (string.IsNullOrEmpty(text))
            return text;

        return text[0].ToString().ToUpper() + text.Substring(1, text.Length - 1);
    }
}