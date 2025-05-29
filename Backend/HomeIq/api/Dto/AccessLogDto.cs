using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dto
{
    public class AccessLogDto
    {
        public int Id;
        public string UserId;
        public DateTime Timestamp;
        public string Direction;
    }
}