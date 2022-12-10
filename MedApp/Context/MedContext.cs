using FluentResults;
using MedApp.Handlers;

namespace MedApp.Context;

public class MedContext
{
    private readonly AuthHandler _authHandler;
    private readonly IACPaaSLoadDataHandler _iacPaaSLoadDataHandler;
    private readonly ViralImportDataHandler _viralImportDataHandler;
    private readonly RunDiagnosticServiceHandler _runDiagnosticServiceHandler;


    public MedContext(
        AuthHandler authHandler,
        IACPaaSLoadDataHandler iacPaaSLoadDataHandler,
        ViralImportDataHandler viralImportDataHandler,
        RunDiagnosticServiceHandler runDiagnosticServiceHandler)
    {
        _authHandler = authHandler;
        _iacPaaSLoadDataHandler = iacPaaSLoadDataHandler;
        _viralImportDataHandler = viralImportDataHandler;
        _runDiagnosticServiceHandler = runDiagnosticServiceHandler;
    }
    
    public async Task HandleAsync(CancellationToken token)
    {
        // var runResult = await _runDiagnosticServiceHandler.RunAsync(importResult.Value);
        // if (runResult.IsFailed)
        //     return;

        var data = await _iacPaaSLoadDataHandler.GetDataAsync(token);
        if (data.IsFailed)
            return;

        // diagnosticResultHandler.Vizualize(data.Value);

    }
    
    public async Task GetIacpaasDataAsync()
    {
        try
        {
            // AnsiConsole.WriteLine();

            // var importResult = await _iacPaaSLoadDataHandler.GetDataAsync();
            // if (importResult.IsFailed)
            //     return;
        }
        catch (OperationCanceledException)
        {
            while (true)
                Console.ReadKey(true);
        }
        catch (Exception ex)
        {
            while (true)
                Console.ReadKey(true);
        }
    }

    public Task<Result> AuthorizeAsync() => _authHandler.AuthorizeAsync();
}