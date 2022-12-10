using System.Collections;

namespace MedApp.Extensions;

public static class EnumerableExtensions
{
    /// <summary>
    /// Проверка списка на null и пустоту
    /// </summary>
    public static bool IsNullOrEmpty<T>(this IList<T> list) where T : class => list == null || !list.Any();
        
    /// <summary>
    /// Проверка списка на null и пустоту
    /// </summary>
    public static bool IsNullOrEmpty(this IEnumerable list) => list == null || !list.GetEnumerator().MoveNext();
}