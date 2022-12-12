namespace MedApp.Models.Ui;

public class TreeItemData
{
    public string Text { get; }

    public string Icon { get; }

    public bool IsExpanded { get; set; } = false;

    public bool HasChild => TreeItems is { Count: > 0 };

    public HashSet<TreeItemData> TreeItems { get; set; } = new();

    public TreeItemData(string text, string icon)
    {
        Text = text;
        Icon = icon;
    }
}