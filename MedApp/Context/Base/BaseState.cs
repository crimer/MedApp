using System.Collections.ObjectModel;
using System.Collections.Specialized;

namespace MedApp.Context.Base;

public abstract class BaseState
{
    private readonly List<INotifyCollectionChanged> _collections = new();
    private static event Action? OnStateChange;
    public void StateChanged() => OnStateChange?.Invoke();

    protected ObservableCollection<T> NewCollection<T>()
    {
        var collection =  new ObservableCollection<T>();
        _collections.Add(collection);
        return collection;
    }
    
    public Action Subscribe(Action? updateState)
    {
        OnStateChange += updateState;
        _collections.ForEach(s => s.CollectionChanged += OnCollectionChanged);
        
        return () =>
        {
            OnStateChange -= updateState;
            _collections.ForEach(s => s.CollectionChanged -= OnCollectionChanged);
        };
    }

    private void OnCollectionChanged(object? sender, NotifyCollectionChangedEventArgs e) => StateChanged();
}

public static class ObservableCollectionExtensions
{
    public static void AddRange<T>(this ObservableCollection<T> collection, IEnumerable<T> enumerable)
    {
        foreach (var val in enumerable)
            collection.Add(val);
    }
}