using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.ContentManagement.Drivers;
using Orchard.Localization;
using EXPEDIT.Roster.Models;
namespace EXPEDIT.Roster.Drivers
{
    public class RosterPartDriver : ContentPartDriver<RosterPart>
    {

        public Localizer T { get; set; }
        public RosterPartDriver()
        {
            T = NullLocalizer.Instance;
        }

        protected override DriverResult Display(RosterPart part, string displayType, dynamic shapeHelper)
        {
            //return base.Display(part, displayType, shapeHelper);
            return ContentShape("Parts_EXPEDIT_Roster", () => shapeHelper.Parts_EXPEDIT_Roster(ContentPart: part));
        }

    }
}