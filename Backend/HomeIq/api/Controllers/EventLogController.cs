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
    [Route("api/logs/event")]
    [Authorize(Roles = "Admin")] // doar admin poate scrie/vede tot
    public class EventLogController : ControllerBase
    {
        private readonly ApplicationDBContext _ctx;
        public EventLogController(ApplicationDBContext ctx) => _ctx = ctx;

        [HttpPost]
        public async Task<IActionResult> Add(EventLogDto dto)
        {
            var log = new EventLog
            {
                EventType = dto.EventType,
                Timestamp = dto.Timestamp,
                Details = dto.Details
            };
            _ctx.EventLog.Add(log);
            await _ctx.SaveChangesAsync();
            return Ok(log);
        }

        [HttpGet]
        public async Task<IActionResult> Query([FromQuery] string source,
                                               [FromQuery] string type,
                                               [FromQuery] DateTime? from,
                                               [FromQuery] DateTime? to)
        {
            var q = _ctx.EventLog.AsQueryable();
            if (type != null) q = q.Where(x => x.EventType == type);
            if (from != null) q = q.Where(x => x.Timestamp >= from);
            if (to != null) q = q.Where(x => x.Timestamp <= to);
            var list = await q.OrderByDescending(x => x.Timestamp).ToListAsync();
            return Ok(list);
        }
    }
}