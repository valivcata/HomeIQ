using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.WebSockets;
using System.Collections.Concurrent;
namespace api.Service
{
    public class WebSocketHandler
    {
        public static ConcurrentBag<WebSocket> Clients { get; } = new ConcurrentBag<WebSocket>();

        public static async Task BroadcastMessageAsync(string message)
        {
            var buffer = System.Text.Encoding.UTF8.GetBytes(message);
            var segment = new ArraySegment<byte>(buffer);

            foreach (var socket in Clients)
            {
                if (socket.State == WebSocketState.Open)
                {
                    try
                    {
                        await socket.SendAsync(segment, WebSocketMessageType.Text, true, CancellationToken.None);
                    }
                    catch
                    {
                        // Ignore error or gestionează socket-uri nevalide
                    }
                }
            }
        }
    }
}