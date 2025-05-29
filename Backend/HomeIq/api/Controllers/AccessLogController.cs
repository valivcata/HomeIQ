using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Dto;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using api.Interfaces;
using api.Data;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
    [ApiController]
    [Route("api/logs/access")]
    [Authorize]  // sau Roles = "Admin,User"
    public class AccessLogController : ControllerBase
    {
        private readonly ApplicationDBContext _ctx;
        public AccessLogController(ApplicationDBContext ctx) => _ctx = ctx;

        [HttpPost]  // POST /api/logs/access
        public async Task<IActionResult> Add([FromBody] AccessLogDto dto)
        {
            var log = new AccessLog
            {
                UserId = dto.UserId,
                Timestamp = dto.Timestamp,
                Direction = dto.Direction
            };
            _ctx.AccessLog.Add(log);
            await _ctx.SaveChangesAsync();
            return Ok(log);
        }

        [HttpGet]  // GET /api/logs/access?userId=...&from=...&to=...
        public async Task<IActionResult> Query([FromQuery] string userId,
                                               [FromQuery] DateTime? from,
                                               [FromQuery] DateTime? to)
        {
            var q = _ctx.AccessLog.AsQueryable();
            if (userId != null) q = q.Where(x => x.UserId == userId);
            if (from != null) q = q.Where(x => x.Timestamp >= from);
            if (to != null) q = q.Where(x => x.Timestamp <= to);
            var list = await q.OrderByDescending(x => x.Timestamp).ToListAsync();
            return Ok(list);
        }

    }
}