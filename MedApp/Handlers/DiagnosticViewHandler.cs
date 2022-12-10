using MedApp.Models;
using MedApp.Utils;
using Med.Ui;

namespace MedApp.Handlers;

public class DiagnosticResultHandler
{
    /// <summary>
    /// Отображение результата диагностики
    /// </summary>
    public void Vizualize(DataSuccessor result)
    {
        var uiThread = new Thread((data) =>
        {
            var diagnosticResult = data as DataSuccessor;
            OpenDiagnosticWindow(diagnosticResult);
        });
        uiThread.TrySetApartmentState(ApartmentState.STA);
        uiThread.Start(result);
    }

    private void OpenDiagnosticWindow(DataSuccessor diagnosticResult)
    {
        var root = new TreeViewItem()
        {
            Header = diagnosticResult.Name,
        };

        WalkInTerminology(root, diagnosticResult);
            
        var uiApp = new UiApp();
        uiApp.Run(new DiagnosticResultWindow(root));
    }

    private void WalkInTerminology(TreeViewItem treeViewItem, DataSuccessor resultData)
    {
        try
        {
            if (resultData.Successors.IsNullOrEmpty())
                return;

            var elements = new List<TreeViewItem>();
            foreach (var el in resultData.Successors)
            {
                TreeViewItem item = null;

                if (el.Type == "ТЕРМИНАЛ-ЗНАЧЕНИЕ")
                {
                    item = new TreeViewItem()
                    {
                        Header = string.IsNullOrWhiteSpace(el.StringValue) ? "Значение неизвестно" : el.Value,
                    };
                }
                else
                {
                    item = new TreeViewItem()
                    {
                        Header = string.IsNullOrWhiteSpace(el.Name) ? "Значение неизвестно" : el.Name,
                    };
                }

                elements.Add(item);

                WalkInTerminology(item, el);
            }

            treeViewItem.ItemsSource = elements;
        }
        catch (Exception ex)
        {
            Logger.Exception(ex);
        }
    }
}