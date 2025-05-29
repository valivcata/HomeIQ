using HomeIQ.ViewModels;
namespace HomeIQ.Views;
public partial class MainPageView : ContentPage
{

    public MainPageView()
    {
        InitializeComponent();
        BindingContext = new MainPageViewModel();
    }

}