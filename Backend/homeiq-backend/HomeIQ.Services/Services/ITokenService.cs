using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace HomeIQ.Services.Services
{
    internal interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}
