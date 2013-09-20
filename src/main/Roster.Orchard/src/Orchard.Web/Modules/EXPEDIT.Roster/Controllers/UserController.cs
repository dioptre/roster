using System.Web.Mvc;
using Orchard.Localization;
using Orchard;
using Orchard.Themes;
using EXPEDIT.Roster.ViewModels;
using System;
using System.Linq;

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
            var m = new RosterViewModel { RosterID = Guid.NewGuid() };
            using (new System.Transactions.TransactionScope(System.Transactions.TransactionScopeOption.Suppress))
            {
                using (var c = new EXPEDIT.Utils.DAL.Models.EODB(null))
                {
                    m.RosterID = (from o in c.Companies select o).FirstOrDefault().CompanyID;
                }
            }

            return View("Index", m);
        }

        public ActionResult Test()
        {
            return View("Test");
        }
    }

}
