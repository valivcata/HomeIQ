// api/Controllers/WebSocketController.cs
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using api.Service;  // namespace‐ul unde ai definit WebSocketHandler

namespace api.Controllers
{
    [ApiController]
    [Route("/ws")]
    public class WebSocketController : ControllerBase
    {
        [HttpGet]
        public async Task Get()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                // Acceptă conexiunea WebSocket
                var socket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                WebSocketHandler.Clients.Add(socket);
                Console.WriteLine("Client WebSocket conectat.");

                var buffer = new byte[1024];
                while (socket.State == WebSocketState.Open)
                {
                    var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                    if (result.MessageType == WebSocketMessageType.Close)
                    {
                        // Dacă clientul a închis WS, rupe bucla
                        break;
                    }

                    var mesaj = Encoding.UTF8.GetString(buffer, 0, result.Count);
                    Console.WriteLine($"Mesaj primit de la client: {mesaj}");

                    // Trimite echo
                    var echo = Encoding.UTF8.GetBytes($"Am primit: {mesaj}");
                    await socket.SendAsync(new ArraySegment<byte>(echo), WebSocketMessageType.Text, true, CancellationToken.None);
                }

                Console.WriteLine("Client WebSocket deconectat.");
                WebSocketHandler.Clients.TryTake(out _); // poți elimina socket din listă
            }
            else
            {
                HttpContext.Response.StatusCode = 400;
            }
        }
    }
}
