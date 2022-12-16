using System.Globalization;
using MedApp.Handlers;
using ElectronNET.API;
using ElectronNET.API.Entities;
using MedApp.Context;
using MedApp.Models.Viral;
using Microsoft.AspNetCore.Hosting.StaticWebAssets;
using MudBlazor;
using MudBlazor.Services;

SetLocale(CultureInfo.CreateSpecificCulture("ru-Ru"));

// electronize init
// electronize start /watch
var builder = WebApplication.CreateBuilder(args);
StaticWebAssetsLoader.UseStaticWebAssets(builder.Environment, builder.Configuration);

builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();
builder.Services.AddElectron();
builder.Services.AddMudServices(configuration =>
{
    configuration.SnackbarConfiguration.PositionClass = Defaults.Classes.Position.BottomCenter;
    configuration.SnackbarConfiguration.PreventDuplicates = false;
    configuration.SnackbarConfiguration.NewestOnTop = false;
    configuration.SnackbarConfiguration.ShowCloseIcon = true;
    configuration.SnackbarConfiguration.VisibleStateDuration = 10000;
    configuration.SnackbarConfiguration.HideTransitionDuration = 500;
    configuration.SnackbarConfiguration.ShowTransitionDuration = 500;
    configuration.SnackbarConfiguration.SnackbarVariant = Variant.Filled;
});

builder.Services.AddSingleton<PatientDataBuilder>();
builder.Services.AddSingleton<AuthHandler>();
builder.Services.AddSingleton<ViralImportDataHandler>();
builder.Services.AddSingleton<RunDiagnosticServiceHandler>();
builder.Services.AddSingleton<IACPaaSLoadDataHandler>();
builder.Services.AddSingleton<PrepareSuccessorHandler>();
builder.Services.AddSingleton<MedContext>();
    
builder.WebHost.UseElectron(args);
builder.WebHost.UseEnvironment(builder.Environment.EnvironmentName);

Task.Run(async () =>
{
    var browserWindow = await Electron.WindowManager.CreateBrowserViewAsync();
    await browserWindow.WebContents.Session.ClearCacheAsync();
});

Task.Run(async () =>
{
    var browserWindow = await Electron.WindowManager.CreateWindowAsync(new BrowserWindowOptions()
    {
        Center = true,
        Closable = true,
        Icon = Path.Combine(Environment.CurrentDirectory, "cardiogram.ico")
    });
    await browserWindow.WebContents.Session.ClearCacheAsync();
    browserWindow.RemoveMenu();
    browserWindow.OnReadyToShow += () => browserWindow.Show();  
    browserWindow.OnClosed += () => Electron.App.Quit();
});

var app = builder.Build();

app.UseStaticFiles();

app.UseRouting();

app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();



void SetLocale(CultureInfo ci)
{
    Thread.CurrentThread.CurrentCulture = ci;
    Thread.CurrentThread.CurrentUICulture = ci;
}