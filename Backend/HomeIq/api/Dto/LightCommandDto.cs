using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dto
{
    public class LightCommandDto
    {
        public string RoomName { get; set; }
        public bool TurnOn { get; set; }
    }
}