using System.Windows;
using System.Windows.Controls;

namespace Med.Ui;

public class DiagnosticResultWindow : Window
{
    public DiagnosticResultWindow(TreeViewItem rootItem) => BuildPage(rootItem);
    public DiagnosticResultWindow() => Content = new Label()
    {
        Content = "sad"
    };

    private void BuildPage(TreeViewItem rootItem)
    {
        var treeView = new TreeView();
        treeView.Items.Add(rootItem);
            
        this.Title = "Результат диагностики";
        this.Content = new ScrollViewer()
        {
            VerticalScrollBarVisibility = ScrollBarVisibility.Visible,
            HorizontalScrollBarVisibility = ScrollBarVisibility.Visible,
            Content = new StackPanel()
            {
                Orientation = Orientation.Vertical,
                Children =
                {
                    new Label()
                    {
                        Content = "Результат диагностики",
                        FontSize = 24,
                        FontWeight = FontWeights.Heavy,
                    },
                    treeView
                }
            }
        };
    }
}