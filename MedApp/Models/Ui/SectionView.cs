namespace MedApp.Models.Ui;

public class SectionView
{
    public bool IsSelected { get; set; }
    public string Name { get; }

    public SectionView(string name)
    {
        IsSelected = false;
        Name = name;
    }
}