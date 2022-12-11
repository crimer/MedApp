namespace MedApp.Models.Ui;

public class SectionView
{
    public bool IsSelected { get; set; }
    public string Name { get; }

    public SectionView(bool isSelected, string name)
    {
        IsSelected = isSelected;
        Name = name;
    }
}