using FluentResults;
using MedApp.Handlers;
using MedApp.Models.Iacpaas;
using MedApp.Models.Viral;

namespace MedApp.Context;

public class MedContext
{
    private readonly AuthHandler _authHandler;
    private readonly IACPaaSLoadDataHandler _iacPaaSLoadDataHandler;
    private readonly ViralImportDataHandler _viralImportDataHandler;
    private readonly RunDiagnosticServiceHandler _runDiagnosticServiceHandler;
    private readonly PrepareSuccessorHandler _prepareSuccessorHandler;


    public MedContext(
        AuthHandler authHandler,
        IACPaaSLoadDataHandler iacPaaSLoadDataHandler,
        ViralImportDataHandler viralImportDataHandler,
        RunDiagnosticServiceHandler runDiagnosticServiceHandler,
        PrepareSuccessorHandler prepareSuccessorHandler)
    {
        _authHandler = authHandler;
        _iacPaaSLoadDataHandler = iacPaaSLoadDataHandler;
        _viralImportDataHandler = viralImportDataHandler;
        _runDiagnosticServiceHandler = runDiagnosticServiceHandler;
        _prepareSuccessorHandler = prepareSuccessorHandler;
    }

    public async Task<Result<DataSuccessor>> ImportDataAsync(PatientData patientData)
    {
        try
        {
            var viral = _prepareSuccessorHandler.CreateViralHistory(patientData);

            var importResult = await _viralImportDataHandler.ImportAsync(viral);
            if (importResult.IsFailed)
                return importResult.ToResult();

            var runResult = await _runDiagnosticServiceHandler.RunAsync(importResult.Value);
            if (runResult.IsFailed)
                return runResult;

            var data = await _iacPaaSLoadDataHandler.GetDataAsync();
            if (data.IsFailed)
                return data.ToResult();

            return data;
        }
        catch (Exception ex)
        {
            return Result.Fail($"Исключение во время обработки импорта данных и запуска диагностики, {ex.Message}");
        }
    }

    public Task<Result> AuthorizeAsync() => _authHandler.AuthorizeAsync();
}