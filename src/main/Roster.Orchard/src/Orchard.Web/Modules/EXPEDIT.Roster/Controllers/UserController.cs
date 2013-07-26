using System.Web.Mvc;
using Orchard.Localization;
using Orchard;

namespace EXPEDIT.Roster.Controllers
{
    public class UserController : Controller
    {
        public IOrchardServices Services { get; set; }

        public UserController(IOrchardServices services)
        {
            Services = services;
            T = NullLocalizer.Instance;
        }

        public Localizer T { get; set; }
    }

}
