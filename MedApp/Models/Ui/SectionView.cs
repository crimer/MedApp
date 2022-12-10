using Microsoft.AspNetCore.Components;

namespace MedApp.Models.Ui;

public class SectionView
{
    public string Name { get; }
    public ComponentBase Component { get; }

    public SectionView(string name, ComponentBase component)
    {
        Name = name;
        Component = component;
    }
}