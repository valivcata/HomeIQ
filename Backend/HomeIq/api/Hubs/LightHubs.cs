using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
namespace api.Hubs
{
    public class LightHubs : Hub
    {
        public async Task SendLightStatus(string status)
        {
            await Clients.All.SendAsync("ReceiveLightStatus", status);
        }
    }
}