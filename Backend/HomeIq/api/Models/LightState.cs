using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class LightState
    {
        public int Id { get; set; }
        public string RoomName { get; set; }
        public bool IsOn { get; set; }
        public DateTime LastChanged { get; set; }
    }
}