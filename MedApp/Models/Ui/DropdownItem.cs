namespace MedApp.Models.Ui;

public class DropdownItem
{
    public string Name { get; }
    public object Value { get; }

    public DropdownItem(string name, object value)
    {
        Name = name;
        Value = value;
    }
    
    // Note: this is important so the select can compare pizzas
    public override bool Equals(object o) {
        var other = o as DropdownItem;
        return other?.Name == Name;
    }

    // Note: this is important so the select can compare pizzas
    public override int GetHashCode() => Name.GetHashCode();
}