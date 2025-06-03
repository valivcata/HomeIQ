using HomeIQ.ViewModels;
using Microsoft.Maui.Controls;

namespace HomeIQ.Views
{
    public partial class MainPageView : ContentPage
    {
        public MainPageView(MainPageViewModel viewModel)
        {
            InitializeComponent();
            BindingContext = viewModel;
        }
    }
}