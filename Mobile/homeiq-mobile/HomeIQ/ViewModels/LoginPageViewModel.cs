using System.Diagnostics;
using System.Windows.Input;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using HomeIQ.Views;

namespace HomeIQ.ViewModels
{
    public partial class LoginPageViewModel : ObservableObject
    {
        [ObservableProperty]
        public string username;

        [ObservableProperty]
        public string password;

        [ObservableProperty]
        public string errorMessage;

        [ObservableProperty]
        public bool hasError;

        public ICommand LoginCommand { get; }

        private readonly IServiceProvider _serviceProvider;
        //public LoginPageViewModel() { }
        public LoginPageViewModel(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            LoginCommand = new RelayCommand(OnLogin);
        }
        private async void OnLogin()
        { 
            // Hard-coded credentials
            if (Username == "admin" && Password == "1234")
            {
                Debug.WriteLine("Login successful");
                HasError = false;
                await Shell.Current.GoToAsync($"//MainPageView?Username={Username}");
            }
            else
            {
                Debug.WriteLine("Login failed");
                ErrorMessage = "Invalid username or password.";
                HasError = true;
            }
        }
    }
}