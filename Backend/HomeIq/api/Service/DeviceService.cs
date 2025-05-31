using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Service
{
    public class DeviceService
    {
        private readonly HttpClient _httpClient;

        public DeviceService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<bool> AprindeLuminaAsync()
        {
            var response = await _httpClient.GetAsync("http://esp32.local/light/on");
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> StingeLuminaAsync()
        {
            var response = await _httpClient.GetAsync("http://esp32.local/light/off");
            return response.IsSuccessStatusCode;
        }
    }
}