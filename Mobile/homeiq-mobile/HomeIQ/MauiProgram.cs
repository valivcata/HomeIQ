using Microsoft.Extensions.Logging;
using HomeIQ.Views;
using HomeIQ.ViewModels;

namespace HomeIQ
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                    fonts.AddFont("Numbers Indicia.ttf", "Font");
                });

            // Înregistrare pentru DI
            builder.Services.AddTransient<LoginPageViewModel>();
            builder.Services.AddTransient<LoginPageView>();

            builder.Services.AddTransient<MainPageViewModel>();
            builder.Services.AddTransient<MainPageView>();
            builder.Services.AddTransient<MainPageView>(sp =>
            {
                var loginVm = sp.GetRequiredService<LoginPageViewModel>();
                return new MainPageView(new MainPageViewModel(loginVm.Username));
            });

#if DEBUG
            builder.Logging.AddDebug();
#endif

            return builder.Build();
        }
    }
}