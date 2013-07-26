using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.ContentManagement.Handlers;
using Orchard.Data;
using EXPEDIT.Roster.Models;

namespace EXPEDIT.Roster.Handlers
{
    public class GlobalSessionPartHandler
    {
        public class PersistedPartHandler : ContentHandler
        {
            /// <summary>
            /// Handler for PersistedPart. It is the place where all wiring goes on.
            /// </summary>
            /// <param name="repository">Your part's record repository. Appropriate instance will be injected at runtime by IoC container.</param>
            public PersistedPartHandler(IRepository<GlobalSessionPartRecord> repository)
            {

                // This tells Orchard to add your part to some existing type
                // In this example, we add our PersistedPart to the Page item, so it will be displayed on every Page.
                Filters.Add(new ActivatingFilter<GlobalSessionPart>("Page"));

                // This tells Orchard to wire an appropriate repository for storing your parts' data.
                Filters.Add(StorageFilter.For(repository));
            }
        }
    }
}