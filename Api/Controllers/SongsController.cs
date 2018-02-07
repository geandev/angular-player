using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers {
    [Route ("api/[controller]")]
    public class SongsController : Controller {

        [HttpGet ("{filename}")]
        public async Task<IActionResult> Download (string filename) {
            if (filename == null)
                return Content ("filename not present");

            var path = Path.Combine (
                Directory.GetCurrentDirectory (),
                "Songs", filename);

            var memory = new MemoryStream ();
            using (var stream = new FileStream (path, FileMode.Open)) {
                await stream.CopyToAsync (memory);
            }
            memory.Position = 0;
            return File (memory, "audio/x-wav", Path.GetFileName (path));
        }
    }
}