using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.ContentManagement.Handlers;
using EXPEDIT.Roster.Models;

namespace EXPEDIT.Roster.Handlers
{
    public class RosterPartHandler : ContentHandler
    {
        public RosterPartHandler()
        {

            // This tells Orchard to add your part to some existing type
            // In this example, we add our UnpersistedPart to the Page item, so it will be displayed on every Page.
            Filters.Add(new ActivatingFilter<RosterPart>("Page"));

        }

    }
}