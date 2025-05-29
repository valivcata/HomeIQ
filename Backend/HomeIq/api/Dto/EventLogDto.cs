using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dto
{
    public class EventLogDto
    {
        public string UserId;
        public string EventType;
        public DateTime Timestamp;
        public string Details;
    }
}