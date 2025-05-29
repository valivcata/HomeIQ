using System;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows.Input;
using Microsoft.Maui.Controls;

namespace HomeIQ.ViewModels
{
    public class MainPageViewModel : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        public MainPageViewModel()
        {
            // Start clock update
            Device.StartTimer(TimeSpan.FromSeconds(1), () =>
            {
                CurrentTime = DateTime.Now.ToString("HH:mm:ss");
                return true;
            });
        }

        void OnPropertyChanged([CallerMemberName] string name = "") =>
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));

        private string _currentTime;
        public string CurrentTime
        {
            get => _currentTime;
            set
            {
                if (_currentTime != value)
                {
                    _currentTime = value;
                    OnPropertyChanged();
                }
            }
        }

        private bool _climateOn;
        public bool ClimateOn
        {
            get => _climateOn;
            set
            {
                if (_climateOn != value)
                {
                    _climateOn = value;
                    OnPropertyChanged();
                    OnPropertyChanged(nameof(ClimateIcon));
                    OnPropertyChanged(nameof(IsClimateSliderVisible));
                    OnPropertyChanged(nameof(IsClimateTextVisible));
                }
            }
        }

        public string ClimateIcon => ClimateOn ? "power_on.png" : "power_off.png";
        public bool IsClimateSliderVisible => ClimateOn;
        public bool IsClimateTextVisible => !ClimateOn;

        public ICommand ToggleClimateCommand => new Command(() => ClimateOn = !ClimateOn);

        private bool _lightsOn;
        public bool LightsOn
        {
            get => _lightsOn;
            set
            {
                if (_lightsOn != value)
                {
                    _lightsOn = value;
                    OnPropertyChanged();
                    OnPropertyChanged(nameof(LightsIcon));
                    OnPropertyChanged(nameof(LightsStatusText));
                }
            }
        }

        public string LightsIcon => LightsOn ? "power_on.png" : "power_off.png";
        public string LightsStatusText => LightsOn ? "Lights are on" : "Lights are off";
        public ICommand ToggleLightsCommand => new Command(() => LightsOn = !LightsOn);

        private int _temperature = 22;
        public int Temperature
        {
            get => _temperature;
            set
            {
                if (_temperature != value)
                {
                    _temperature = value;
                    OnPropertyChanged();
                    OnPropertyChanged(nameof(TemperatureLabel));
                }
            }
        }

        public string TemperatureLabel => $"{Temperature}°C";

        private bool _isInside = false;
        public bool IsInside
        {
            get => _isInside;
            set
            {
                if (_isInside != value)
                {
                    _isInside = value;
                    OnPropertyChanged();
                    OnPropertyChanged(nameof(AccessButtonText));
                }
            }
        }

        private bool _doorIsOpen = false;
        public bool DoorIsOpen
        {
            get => _doorIsOpen;
            set
            {
                if (_doorIsOpen != value)
                {
                    _doorIsOpen = value;
                    OnPropertyChanged();
                    OnPropertyChanged(nameof(DoorStatusMessage));
                    OnPropertyChanged(nameof(DoorStatusColor));
                }
            }
        }

        public string DoorStatusMessage => DoorIsOpen ? "The door is open" : "The door is closed";
        public Color DoorStatusColor => DoorIsOpen ? Colors.Green : Colors.Gray;

        public string AccessButtonText => IsInside ? "Do you want to exit?" : "Do you want to enter?";

        // ?? Istoric acces
        public ObservableCollection<string> AccessHistory { get; } = new();

        public ICommand DoorAccessCommand => new Command(async () =>
        {
            if (DoorIsOpen)
                return;

            DoorIsOpen = true;

            // Adauga în istoric
            string action = IsInside ? "exited" : "entered";
            string timestamp = DateTime.Now.ToString("HH:mm:ss");
            AccessHistory.Insert(0, $"Person {action} at {timestamp}");

            await Task.Delay(5000); // 5s

            DoorIsOpen = false;

            // Inverseaza starea
            IsInside = !IsInside;
        });


    }
}
