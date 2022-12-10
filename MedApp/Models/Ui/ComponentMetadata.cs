namespace MedApp.Models.Ui;

public class ComponentMetadata
{
    public string ComponentName { get; }
    public Dictionary<string, object> Parameters { get; }

    public ComponentMetadata(string componentName, Dictionary<string, object> parameters)
    {
        ComponentName = componentName;
        Parameters = parameters;
    }
}