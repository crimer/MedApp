using MedApp.Api;
using FluentResults;

namespace MedApp.Handlers;

public class AuthHandler
{
    private const string Login = "MedIACPaaS@mail.ru";
    private const string Pass = "IACPaaS-Med";

    public async Task<Result> AuthorizeAsync()
    {
        try
        {
            return await IACPaaSApiClient.Instance.AuthorizeAsync(Login, Pass, CancellationToken.None);
        }
        catch (Exception ex)
        {
            return Result.Fail("Произошла непредвиденная ошибка во время авторизации");
        }
    }
}