using System.Web.Mvc;
using Orchard.Localization;
using Orchard;
using Orchard.Themes;

namespace EXPEDIT.Roster.Controllers
{
    //[Themed]
    public class UserController : Controller
    {
        public IOrchardServices Services { get; set; }

        public UserController(IOrchardServices services)
        {
            Services = services;
            T = NullLocalizer.Instance;
        }

        public Localizer T { get; set; }

        public ActionResult Index()
        {
            return View("Index");
        }

        public ActionResult Test()
        {
            return View("Test");
        }
    }

}
