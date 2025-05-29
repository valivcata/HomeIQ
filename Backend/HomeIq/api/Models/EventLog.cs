using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class EventLog
    {
        public int Id { get; set; }
        public string EventType { get; set; } // e.g. "LightOn", "LightOff"
        public DateTime Timestamp { get; set; }
        public string Details { get; set; }
    }
}